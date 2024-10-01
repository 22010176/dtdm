import { useRef } from 'react'
/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faArrowRotateRight, faFileExport, faTableList, faPencil, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import { useEffect } from 'react'
import RefreshBtn from '../RefreshBtn'
import FindBtn from '../FindBtn'


export default function Toolbar({ addFunc, editfunc, deleteFunc, refreshClick }) {
  function btnEvent(func, e) {
    if (typeof func == "function") func(e)
  }
  return (
    <div className={styles["tools"]}>
      <div className={styles["tool-items"]}>
        {/* Add */}
        <div className={[styles["tool"]].join(" ")} data-func="add" onClick={btnEvent.bind({}, addFunc)}>
          <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#63e6be", }} />
          <p className={styles["tool-description"]}> Them </p>
        </div>

        {/* Edit */}
        <div className={styles["tool"]} data-func="edit" onClick={btnEvent.bind({}, editfunc)}>
          <FontAwesomeIcon icon={faPencil} style={{ color: "#e69138", }} />
          <p className={styles["tool-description"]}> Sua </p>
        </div>

        {/* Delete */}
        <div className={styles["tool"]} data-func="delete" onClick={btnEvent.bind({}, deleteFunc)}>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffd43b", }} />
          <p className={styles["tool-description"]}> Xoa </p>
        </div>

        {/* IMEI */}
        {/* <div className={styles["tool"]} data-func="imei" onClick={toolFunc.bind(this, {}, "imei")}>
          <FontAwesomeIcon icon={faTableList} style={{ color: "#2b78e4", }} />
          <p className={styles["tool-description"]}> DS IMEI </p>
        </div> */}

        {/* Import */}
        {/* <div className={styles["tool"]} data-func="import" onClick={toolFunc.bind(this, {}, "import")}>
          <FontAwesomeIcon icon={faFileExport} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Nhap Excel </p>
        </div> */}

        {/* Export */}
        {/* <div className={styles["tool"]} data-func="export" onClick={toolFunc.bind(this, {}, "export")}>
          <FontAwesomeIcon icon={faFileExcel} style={{ color: "#009e0f", }} />
          <p className={styles["tool-description"]}> Xuat Excel </p>
        </div> */}
      </div>

      <form action="" method="get" className={styles["search-form"]}>
        <select title="category" name="category" className={styles["drop-down"]}>
          <option value="all">Tat ca 1</option>
          <option value="all">Tat ca 2</option>
          <option value="all">Tat ca 3</option>
        </select>
        <input className={styles["search-input"]} type="text" name="ten-sp" placeholder="Tim kiem" />
        <FindBtn width="100px" height="40px" />
        <RefreshBtn width="100px" height="40px" onClick={refreshClick} />
      </form>
    </div>
  )
}