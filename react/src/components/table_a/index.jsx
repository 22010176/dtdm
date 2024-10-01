/* eslint-disable react/prop-types */
import styles from './style.module.css'

/*
data: [
  {id:"dd", data: ['d', 'd']},
  {id:"dd", data: ['d', 'd']},
  {id:"dd", data: ['d', 'd']},
  {id:"dd", data: ['d', 'd']},
  {id:"dd", data: ['d', 'd']},
]
 */
export default function TableA({ headers = [], data = [], height, width, rowClick }) {
  function clickRow(e) {
    const stl = styles.active
    document.querySelectorAll(`.${stl}`).forEach(i => i.classList.remove(stl));

    if (!e.target) return;
    const elem = e.target.parentElement
    elem.classList.add(stl);
    if (typeof rowClick == 'function') rowClick({ id: elem.dataset.id, data: [...elem.querySelectorAll("*")].map(i => i.innerText) })
  }

  return (
    <div className={styles["table"]} style={{ height, width }}>
      <table className={styles["data-display"]}>
        <thead>
          <tr>
            {headers.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>

        <tbody onClick={e => clickRow(e)}>
          {data.map(item => (
            <tr key={item.id} data-id={item.id}>
              {item?.data?.map((value, i) => <td key={i}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}