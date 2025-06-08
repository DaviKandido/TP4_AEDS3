'use client';

import Diretorio from "./_Components/Diretorio/Diretorio";
import Cesto from "./_Components/Cesto/Cesto";
import HashExtensivel from "./_TabelaHash/hashExtensivel";
import { useEffect, useState } from "react";
import 'animate.css';


export default function Home() {

  const [tabelaHash, setTabelaHash] = useState(new HashExtensivel(3));
  const [chaveInserir, setChaveInserir] = useState("");
  const [chaveRemover, setChaveRemover] = useState("");
  const [qtdPorCesto, setQtdPorCesto] = useState("");
  const [array, setArray] = useState(new Array<number>);


    useEffect(() => {
        setTabelaHash(new HashExtensivel(3));  // Exemplo de inicialização segura
    }, []);

  function inserirChave(event: React.FormEvent) {
    event.preventDefault();
    const chave = parseInt(chaveInserir);

    if(array.includes(chave)){
      alert("Chave já inserida");
      return
    }
    
    if (!isNaN(chave)) {
      array.push(chave);
      tabelaHash.inserir(chave);
      setChaveInserir(""); // limpa o input
    }else{
      alert("Insira um numero válida");
    }
  }

  function removerChave(event: React.FormEvent) {
    event.preventDefault();
    const chave = parseInt(chaveRemover);
    if (!isNaN(chave)) {
      tabelaHash.remover(chave);
      setChaveRemover(""); // limpa o input
    }else{
      alert("Insira um numero válida");
    }
  }

    function DefinineQtdPorCestos(event: React.FormEvent) {
    event.preventDefault();
    const chave = parseInt(qtdPorCesto);
    if (!isNaN(chave)) {
      setTabelaHash(new HashExtensivel(chave));
      setQtdPorCesto(""); // limpa o input
    }else{
      alert("Insira um numero válida");
    }
  }

  return (
    <div>
      <main>
      <h1 className="animate__animated animate__zoomIn">Tabela Hash Extensível</h1>


        <form className="controls animate__animated animate__bounceInUp" onSubmit={inserirChave}>
          <div>
            <input
              type="text"
              className="chaveInput"
              placeholder="Digite a chave para inserir"
              value={chaveInserir}
              onChange={(e) => setChaveInserir(e.target.value)}
            />
            <button type="submit" className="inserir">Inserir</button>
          </div>
        </form>

        <form className="controls animate__animated animate__bounceInUp" onSubmit={removerChave}>
          <div>
            <input
              type="text"
              className="chaveInput"
              placeholder="Digite a chave para remover"
              value={chaveRemover}
              onChange={(e) => setChaveRemover(e.target.value)}
            />
            <button type="submit" className="remover">Remover</button>
          </div>
        </form>

        <form className="controls animate__animated animate__bounceInUp" onSubmit={DefinineQtdPorCestos}>
          <div>
            <input
              type="text"
              className="chaveInput"
              placeholder="Quantidade de elementos por cesto"
              value={qtdPorCesto}
              onChange={(e) => setQtdPorCesto(e.target.value)}
            />
            <button type="submit" className="definir">Definir</button>
          </div>
        </form>


        <div className="table">
          <Diretorio 
            hash={tabelaHash}
          />

          <Cesto hash={tabelaHash}/>
        </div>


          <div className="info animate__animated animate__backInUp">
              {"hash(k) = k % 2"}
              <sup>{ " "+ tabelaHash.diretorio.profGlobal}</sup>
          </div>

          <div className="legenda animate__animated animate__backInUp">
            <p>Legenda:</p>
            <ul> 
              <li>P = Profundidade Global</li>
              <li> P&apos; = Profundidade Local</li>
              <li> N = Quantidade de Elementos</li>
              <li> k = Chaves Inseridas</li>
            </ul>
          </div>

      </main>
      <footer>
      
      </footer>
    </div>
  );
}
