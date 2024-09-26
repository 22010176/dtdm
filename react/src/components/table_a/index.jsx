/* eslint-disable react/prop-types */
import styles from './style.module.css'

export default function TableA({ headers = [], data = [], height, width }) {
  return (
    <div className={styles["table"]} style={{ maxHeight: height, width }}>
      <table className={styles["data-display"]}>
        <thead>
          <tr>
            {headers.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {item.map((value, i) => <td key={i}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}