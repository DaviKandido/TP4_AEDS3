import styles from "./Diretorio.module.css"
import HashExtensivel from "../../_TabelaHash/hashExtensivel";
import 'animate.css';


export default function Diretorio({hash}: {hash: HashExtensivel}) {
  return (
    <div className={styles.diretorio}>
      <table className="animate__animated animate__bounceInUp">
        <thead>
              <tr>
            <th className="title" colSpan={6}>Diretorio</th>
          </tr>
          <tr>
            <th>P = {hash.diretorio.profGlobal}</th>
            <th> End. Cesto</th>
          </tr>
        </thead>
        <tbody>
            {hash.diretorio.enderecos.map((cesto, index) => (
                <tr key={index} className="animate__animated animate__fadeInUp">
                  <td>{index}</td>
                  <td>{cesto}</td>
                </tr>
            ))}
        </tbody>
      </table>
      <div>
      </div>
    </div>
  );
}
