
class HashExtensivel{

    quantidadeDadosPorCesto: number;
    diretorio: Diretorio;

    constructor(quantidadeDadosPorCesto: number){

        if(quantidadeDadosPorCesto <= 0)
            throw new Error("Quantidade de dados por cesto deve ser maior que 0");
        
        this.quantidadeDadosPorCesto = quantidadeDadosPorCesto;
        this.diretorio = new Diretorio(0, quantidadeDadosPorCesto);
    }

    hash(elemento: number): number {
        return elemento % (Math.pow(2, this.diretorio.profGlobal));
    }


    inserir(elemento: number): void {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        const cesto = this.diretorio.enderecos[indice];

        if (!cesto.insert(elemento)) {
            this.dividirCesto(indice);
            this.inserir(elemento); // tenta de novo
        }
    }

    dividirCesto(indice: number): void {
        const cestoAntigo = this.diretorio.enderecos[indice];

        if (cestoAntigo.profLocal === this.diretorio.profGlobal) {
            this.diretorio.dobra();
        }

        const novoProfLocal = cestoAntigo.profLocal + 1;
        const novoCesto1 = new Cesto(this.quantidadeDadosPorCesto, novoProfLocal);
        const novoCesto2 = new Cesto(this.quantidadeDadosPorCesto, novoProfLocal);

        const mask = (1 << novoProfLocal) - 1;
        const tamanho = this.diretorio.enderecos.length;

        for (let i = 0; i < tamanho; i++) {
            if (this.diretorio.enderecos[i] === cestoAntigo) {
                const novoIndice = i & mask;
                this.diretorio.enderecos[i] = (novoIndice & (1 << (novoProfLocal - 1))) ? novoCesto2 : novoCesto1;
            }
        }

        for (const elem of cestoAntigo.elementos) {
            const novoIndice = this.diretorio.getCestoIndice(this.hash(elem));
            this.diretorio.enderecos[novoIndice].insert(elem);
        }
    }

    buscar(elemento: number): boolean {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        return this.diretorio.enderecos[indice].contains(elemento);
    }

    remover(elemento: number): boolean {
        const hashValor = this.hash(elemento);
        const indice = this.diretorio.getCestoIndice(hashValor);
        return this.diretorio.enderecos[indice].delete(elemento);
    }

    imprimir(): void {
        const usados = new Set<Cesto>();
        this.diretorio.enderecos.forEach((cesto, i) => {
            if (!usados.has(cesto)) {
                console.log(`Cesto ${i.toString(2).padStart(this.diretorio.profGlobal, '0')}: ${cesto.toString()}`);
                usados.add(cesto);
            }
        });
    }
}

class Diretorio{

    profGlobal: number;
    enderecos: Cesto[];

    constructor(profGlobal: number, tamCesto: number) {
        this.profGlobal = profGlobal;
        const tamanho = 1 << this.profGlobal;
        const cestoInicial = new Cesto(tamCesto, profGlobal);

        this.enderecos = Array(tamanho).fill(cestoInicial);
    }

    dobra() {
        const novoTamanho = 1 << (this.profGlobal + 1);
        const novaTabela = new Array<Cesto>(novoTamanho);

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

class Cesto{
    quantidadeMaxima: number;
    profLocal: number;
    elementos: number[];

    constructor(quantidadeMaxima: number, profLocal:number){
        this.quantidadeMaxima = quantidadeMaxima;
        this.profLocal = profLocal;
        this.elementos = [];    
    }

    // Inserir elementos no cesto
    insert(elemento:number):boolean{
        if(this.isFull())
            return false;

        // Insere ordenado
        let i:number = this.elementos.length -1; 
        while(i >=0 && elemento < this.elementos[i])
            i--;
        this.elementos.splice(i +1, 0, elemento);
        return true;
    }

    // Buscar um elemento no cesto
    read(elemento:number){
        if(this.isEmpty())
            return null;
        let i:number = 0;
        while(i < this.elementos.length && elemento > this.elementos[i])
            i ++;
        if(i < this.elementos.length && elemento == this.elementos[i])
            return this.elementos[i];
        return null;
    }

    // atualizar um elemento do cesto
    update(elemento:number):boolean{
        if(this.isEmpty())
            return false;
        let i:number = 0;
        while(i < this.elementos.length && elemento > this.elementos[i])
            i ++;
        if(i < this.elementos.length && elemento == this.elementos[i]){
            this.elementos[i] = elemento;
            return true;
        }else
        return false;
    }

    contains(elemento: number): boolean {
        return this.elementos.includes(elemento);
    }

    delete(elemento:number):boolean{
        const index = this.elementos.indexOf(elemento);
        if (index !== -1) {
            this.elementos.splice(index, 1);
            return true;
        }
        return false;
    }

    isEmpty():boolean{
        return this.elementos.length == 0;
    }
    isFull():boolean{
        return this.elementos.length == this.quantidadeMaxima;
    }

    size():number{
        return this.elementos.length;
    }


    toString(): string {
        return ` (profLocal=${this.profLocal}) [${this.elementos.join(', ')}]`;
    }
}


export default HashExtensivel;