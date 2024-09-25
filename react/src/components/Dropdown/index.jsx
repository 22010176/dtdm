/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styles from './style.module.css'

export default function Dropdown({ children, item, itemState = true }) {
  useEffect(function () {
    let elem = document.querySelector(`.${styles.dropdown}`)
    if (itemState)
      elem.classList.add(styles["active"])
    else elem.classList.remove(styles["active"])
  }, [itemState])

  return (
    <div className={[styles.container].join(" ")} data-state="false">
      <div className={styles["header"]} onClick={function (e) {
        let elem = document.querySelector(`.${styles.container}`)
        elem.setAttribute("data-state", elem.getAttribute("data-state") === "true" ? "false" : "true")
        // elem.querySelector(`.${styles.dropdown}`).classList.toggle(styles.hide)
      }}>
        {children}
      </div>

      <div className={[styles["dropdown"]].join(" ")}>
        {item}
      </div>
    </div>
  )
}