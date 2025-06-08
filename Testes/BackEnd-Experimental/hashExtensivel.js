var HashExtensivel = /** @class */ (function () {
    function HashExtensivel(quantidadeDadosPorCesto) {
        if (quantidadeDadosPorCesto <= 0)
            throw new Error("Quantidade de dados por cesto deve ser maior que 0");
        this.quantidadeDadosPorCesto = quantidadeDadosPorCesto;
        this.diretorio = new Diretorio(0, quantidadeDadosPorCesto);
    }
    HashExtensivel.prototype.hash = function (elemento) {
        return elemento;
    };
    HashExtensivel.prototype.inserir = function (elemento) {
        var hashValor = this.hash(elemento);
        var indice = this.diretorio.getCestoIndice(hashValor);
        var cesto = this.diretorio.enderecos[indice];
        if (!cesto.insert(elemento)) {
            this.dividirCesto(indice, hashValor);
            this.inserir(elemento); // tenta de novo
        }
    };
    HashExtensivel.prototype.dividirCesto = function (indice, hashValor) {
        var cestoAntigo = this.diretorio.enderecos[indice];
        if (cestoAntigo.profLocal === this.diretorio.profGlobal) {
            this.diretorio.dobra(this.quantidadeDadosPorCesto);
        }
        var novoProfLocal = cestoAntigo.profLocal + 1;
        var novoCesto1 = new Cesto(this.quantidadeDadosPorCesto, novoProfLocal);
        var novoCesto2 = new Cesto(this.quantidadeDadosPorCesto, novoProfLocal);
        var mask = (1 << novoProfLocal) - 1;
        var tamanho = this.diretorio.enderecos.length;
        for (var i = 0; i < tamanho; i++) {
            if (this.diretorio.enderecos[i] === cestoAntigo) {
                var novoIndice = i & mask;
                this.diretorio.enderecos[i] = (novoIndice & (1 << (novoProfLocal - 1))) ? novoCesto2 : novoCesto1;
            }
        }
        for (var _i = 0, _a = cestoAntigo.elementos; _i < _a.length; _i++) {
            var elem = _a[_i];
            var novoIndice = this.diretorio.getCestoIndice(this.hash(elem));
            this.diretorio.enderecos[novoIndice].insert(elem);
        }
    };
    HashExtensivel.prototype.buscar = function (elemento) {
        var hashValor = this.hash(elemento);
        var indice = this.diretorio.getCestoIndice(hashValor);
        return this.diretorio.enderecos[indice].contains(elemento);
    };
    HashExtensivel.prototype.remover = function (elemento) {
        var hashValor = this.hash(elemento);
        var indice = this.diretorio.getCestoIndice(hashValor);
        return this.diretorio.enderecos[indice]["delete"](elemento);
    };
    HashExtensivel.prototype.imprimir = function () {
        var _this = this;
        var usados = new Set();
        this.diretorio.enderecos.forEach(function (cesto, i) {
            if (!usados.has(cesto)) {
                console.log("Cesto ".concat(i.toString(2).padStart(_this.diretorio.profGlobal, '0'), ": ").concat(cesto.toString()));
                usados.add(cesto);
            }
        });
    };
    return HashExtensivel;
}());
var Cesto = /** @class */ (function () {
    function Cesto(quantidadeMaxima, profLocal) {
        this.quantidadeMaxima = quantidadeMaxima;
        this.profLocal = profLocal;
        this.elementos = [];
    }
    // Inserir elementos no cesto
    Cesto.prototype.insert = function (elemento) {
        if (this.isFull())
            return false;
        // Insere ordenado
        var i = this.elementos.length - 1;
        while (i >= 0 && elemento < this.elementos[i])
            i--;
        this.elementos.splice(i + 1, 0, elemento);
        return true;
    };
    // Buscar um elemento no cesto
    Cesto.prototype.read = function (elemento) {
        if (this.isEmpty())
            return null;
        var i = 0;
        while (i < this.elementos.length && elemento > this.elementos[i])
            i++;
        if (i < this.elementos.length && elemento == this.elementos[i])
            return this.elementos[i];
        return null;
    };
    // atualizar um elemento do cesto
    Cesto.prototype.update = function (elemento) {
        if (this.isEmpty())
            return false;
        var i = 0;
        while (i < this.elementos.length && elemento > this.elementos[i])
            i++;
        if (i < this.elementos.length && elemento == this.elementos[i]) {
            this.elementos[i] = elemento;
            return true;
        }
        else
            return false;
    };
    Cesto.prototype.contains = function (elemento) {
        return this.elementos.includes(elemento);
    };
    Cesto.prototype["delete"] = function (elemento) {
        var index = this.elementos.indexOf(elemento);
        if (index !== -1) {
            this.elementos.splice(index, 1);
            return true;
        }
        return false;
    };
    Cesto.prototype.isEmpty = function () {
        return this.elementos.length == 0;
    };
    Cesto.prototype.isFull = function () {
        return this.elementos.length == this.quantidadeMaxima;
    };
    Cesto.prototype.size = function () {
        return this.elementos.length;
    };
    Cesto.prototype.toString = function () {
        return " (profLocal=".concat(this.profLocal, ") [").concat(this.elementos.join(', '), "]");
    };
    return Cesto;
}());
var Diretorio = /** @class */ (function () {
    function Diretorio(profGlobal, tamCesto) {
        this.profGlobal = profGlobal;
        var tamanho = 1 << this.profGlobal;
        var cestoInicial = new Cesto(tamCesto, profGlobal);
        this.enderecos = Array(tamanho).fill(cestoInicial);
    }
    Diretorio.prototype.dobra = function (tamCesto) {
        var novoTamanho = 1 << (this.profGlobal + 1);
        var novaTabela = new Array(novoTamanho);
        for (var i = 0; i < novoTamanho; i++) {
            novaTabela[i] = this.enderecos[i % this.enderecos.length];
        }
        this.enderecos = novaTabela;
        this.profGlobal++;
    };
    Diretorio.prototype.getCestoIndice = function (hash) {
        var mask = (1 << this.profGlobal) - 1;
        return hash & mask;
    };
    return Diretorio;
}());
var hash = new HashExtensivel(2);
hash.inserir(5);
hash.inserir(7);
hash.inserir(13);
hash.inserir(1);
hash.inserir(9);
hash.inserir(4);
hash.inserir(2);
hash.inserir(8);
console.log(hash.diretorio.profGlobal);
hash.imprimir();
