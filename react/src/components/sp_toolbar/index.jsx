import { useRef } from 'react'
/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faArrowRotateRight, faFileExport, faTableList, faPencil, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import { useEffect } from 'react'

export default function Toolbar({ toolFunc = _ => { } }) {

  return (
    <div className={styles["tools"]}>
      <div className={styles["tool-items"]}>
        {/* Add */}
        <div className={[styles["tool"]].join(" ")} data-func="add" onClick={toolFunc.bind(this, {}, "add")}>
          <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#63e6be", }} />
          <p className={styles["tool-description"]}> Them </p>
        </div>

        {/* Delete */}
        <div className={styles["tool"]} data-func="delete" onClick={toolFunc.bind(this, {}, "delete")}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffd43b", }} />
          <p className={styles["tool-description"]}> Xoa </p>
        </div>

        {/* Edit */}
        <div className={styles["tool"]} data-func="edit" onClick={toolFunc.bind(this, {}, "edit")}>
          <FontAwesomeIcon icon={faPencil} style={{ color: "#e69138", }} />
          <p className={styles["tool-description"]}> Sua </p>
        </div>

        {/* IMEI */}
        <div className={styles["tool"]} data-func="imei" onClick={toolFunc.bind(this, {}, "imei")}>
          <FontAwesomeIcon icon={faTableList} style={{ color: "#2b78e4", }} />
          <p className={styles["tool-description"]}> DS IMEI </p>
        </div>

        {/* Import */}
        <div className={styles["tool"]} data-func="import" onClick={toolFunc.bind(this, {}, "import")}>
          <FontAwesomeIcon icon={faFileExport} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Nhap Excel </p>
        </div>


        {/* Export */}
        <div className={styles["tool"]} data-func="export" onClick={toolFunc.bind(this, {}, "export")}>
          <FontAwesomeIcon icon={faFileExcel} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Xuat Excel </p>
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
          <FontAwesomeIcon icon={faArrowRotateRight} style={{ color: "#ff00ff", }} />
          <span>Lam moi</span>
        </button>
      </form>
    </div>
  )
}