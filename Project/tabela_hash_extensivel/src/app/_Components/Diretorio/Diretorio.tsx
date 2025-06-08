import styles from "./Diretorio.module.css"
import HashExtensivel from "../../_TabelaHash/hashExtensivel";
import 'animate.css';


export default function Diretorio({hash}: {hash: HashExtensivel}) {
  return (
    <div className={styles.diretorio}>
      <table className="animate__animated animate__bounceInUp">
        <thead>
          <tr>
            <th>P = {hash.diretorio.profGlobal}</th>
            <th>Diretório</th>
          </tr>
        </thead>
        <tbody>
            {hash.diretorio.enderecos.map((cesto, index) => (
                <tr key={index} className="animate__animated animate__fadeInUp">
                  <td>{index}</td>
                  <td>{index.toString(2).padStart(hash.diretorio.profGlobal, '0')}</td>
                </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}
