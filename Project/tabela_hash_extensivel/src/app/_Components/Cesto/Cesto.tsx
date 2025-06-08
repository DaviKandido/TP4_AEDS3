import styles from "./Cesto.module.css"
import HashExtensivel from "../../_TabelaHash/hashExtensivel";
import 'animate.css';



export default function Cesto({hash}: {hash: HashExtensivel}) {
  return (
    <div className={styles.cestos}>
      <table className="animate__animated animate__bounceInUp">
        <thead>
          <tr>
            <th className="title" colSpan={6}>Cestos</th>
          </tr>
          <tr>
            <th>P&apos;</th>
            <th>N</th>
              {Array.from({ length: hash.quantidadeDadosPorCesto }).map((_, i) => (
                <th key={i}>k{i}</th>
              ))}
          </tr>
        </thead>
            <tbody>
                {
                  hash.diretorio.enderecos.map((cestos, index) => (
                    <tr key={index}>
                      <td>{cestos.profLocal}</td>
                      <td>{cestos.elementos.length}</td>
                      {cestos.elementos.map((elemento, index) => (
                        <td key={index} className="animate__animated animate__fadeInUp" style={
                          {
                            backgroundColor: "#cfcfcf"
                          }
                        }>{elemento}</td>
                      ))}
                    </tr>
                  ))
                }
                
            </tbody>
      </table>
    </div>
  )
}
