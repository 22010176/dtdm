
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFileExport, faTableList, faPencil, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

export default function Toolbar() {
  return (
    <div className={styles["tools"]}>
      <div className={styles["tool-items"]}>
        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#63e6be", }} />
          <p className={styles["tool-description"]}> Them </p>
        </div>

        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffd43b", }} />
          <p className={styles["tool-description"]}> Xoa </p>
        </div>

        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faPencil} style={{ color: "#e69138", }} />
          <p className={styles["tool-description"]}> Sua </p>
        </div>

        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faTableList} style={{ color: "#2b78e4", }} />
          <p className={styles["tool-description"]}> DS IMEI </p>
        </div>

        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faFileExport} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Nhap Excel </p>
        </div>

        <div className={styles["tool"]}>
          <FontAwesomeIcon icon={faFileExcel} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Nhap Excel </p>
        </div>
      </div>
      <form action="" method="get" className={styles["search-form"]}>
        <select title="category" name="category" className={styles["drop-down"]}>
          <option value="all">Tat ca 1</option>
          <option value="all">Tat ca 2</option>
          <option value="all">Tat ca 3</option>
        </select>
        <input className={styles["search-input"]} type="text" name="ten-sp" placeholder="Tim kiem" />
        <button type="submit" title="submit-btn" className={styles["submit-btn"]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ff00ff"
              d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" />
          </svg>
          <span>Lam moi</span>
        </button>
      </form>
    </div>
  )
}