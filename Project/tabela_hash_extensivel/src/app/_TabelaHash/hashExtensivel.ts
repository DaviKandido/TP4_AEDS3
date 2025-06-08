class HashExtensivel {
    quantidadeDadosPorCesto: number;
    diretorio: Diretorio;
    cestos: Cesto[];

    constructor(quantidadeDadosPorCesto: number) {
        if (quantidadeDadosPorCesto <= 0)
            throw new Error("Quantidade de dados por cesto deve ser maior que 0");

        this.quantidadeDadosPorCesto = quantidadeDadosPorCesto;
        const cestoInicial = new Cesto(quantidadeDadosPorCesto, 0);
        this.cestos = [cestoInicial];
        this.diretorio = new Diretorio(0, 0); // Começa com profundidade 0, apontando para cesto ID 0
    }

    hash(elemento: number): number {
        return elemento;
    }

    inserir(elemento: number): void {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        const cestoID = this.diretorio.enderecos[indice];
        const cesto = this.cestos[cestoID];

        if (!cesto.insert(elemento)) {
            this.dividirCesto(cestoID);
            this.inserir(elemento); // tenta novamente
        }
    }

    dividirCesto(cestoID: number): void {
        const cestoAntigo = this.cestos[cestoID];

        if (cestoAntigo.profLocal === this.diretorio.profGlobal) {
            this.diretorio.dobra();
        }

        const novoProfLocal = cestoAntigo.profLocal + 1;
        const novoCesto = new Cesto(this.quantidadeDadosPorCesto, novoProfLocal);
        const novoCestoID = this.cestos.length;
        this.cestos.push(novoCesto);

        cestoAntigo.profLocal = novoProfLocal;

        // Atualizar os ponteiros do diretório que apontam para o cesto antigo
        for (let i = 0; i < this.diretorio.enderecos.length; i++) {
            if (this.diretorio.enderecos[i] === cestoID) {
                const bit = (i >> (novoProfLocal - 1)) & 1;
                if (bit === 1) {
                    this.diretorio.enderecos[i] = novoCestoID;
                }
            }
        }

        const elementos = [...cestoAntigo.elementos];
        cestoAntigo.elementos.length = 0;

        for (const elem of elementos) {
            this.inserir(elem);
        }
    }

    buscar(elemento: number): boolean {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        const cestoID = this.diretorio.enderecos[indice];
        return this.cestos[cestoID].contains(elemento);
    }

    remover(elemento: number): boolean {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        const cestoID = this.diretorio.enderecos[indice];
        return this.cestos[cestoID].delete(elemento);
    }

    imprimir(): void {
        const usados = new Set<number>();
        for (let i = 0; i < this.diretorio.enderecos.length; i++) {
            const cestoID = this.diretorio.enderecos[i];
            if (!usados.has(cestoID)) {
                console.log(`Cesto ${cestoID}: ${this.cestos[cestoID].toString()}`);
                usados.add(cestoID);
            }
        }
    }
}

class Diretorio {
    profGlobal: number;
    enderecos: number[];

    constructor(profGlobal: number, cestoID: number) {
        this.profGlobal = profGlobal;
        const tamanho = 1 << this.profGlobal;
        this.enderecos = Array(tamanho).fill(cestoID);
    }

    dobra(): void {
        const novoTamanho = 1 << (this.profGlobal + 1);
        const novaTabela = new Array<number>(novoTamanho);
        for (let i = 0; i < novoTamanho; i++) {
            novaTabela[i] = this.enderecos[i % this.enderecos.length];
        }
        this.enderecos = novaTabela;
        this.profGlobal++;
    }

    getCestoIndice(hash: number): number {
        const mask = (1 << this.profGlobal) - 1;
        return hash & mask;
    }
}

class Cesto {
    quantidadeMaxima: number;
    profLocal: number;
    elementos: number[];

    constructor(quantidadeMaxima: number, profLocal: number) {
        this.quantidadeMaxima = quantidadeMaxima;
        this.profLocal = profLocal;
        this.elementos = [];
    }

    insert(elemento: number): boolean {
        if (this.isFull())
            return false;

        let i = this.elementos.length - 1;
        while (i >= 0 && elemento < this.elementos[i])
            i--;
        this.elementos.splice(i + 1, 0, elemento);
        return true;
    }

    contains(elemento: number): boolean {
        return this.elementos.includes(elemento);
    }

    delete(elemento: number): boolean {
        const index = this.elementos.indexOf(elemento);
        if (index !== -1) {
            this.elementos.splice(index, 1);
            return true;
        }
        return false;
    }

    isFull(): boolean {
        return this.elementos.length === this.quantidadeMaxima;
    }

    toString(): string {
        return `(profLocal=${this.profLocal}) [${this.elementos.join(', ')}]`;
    }
}

export default HashExtensivel;
