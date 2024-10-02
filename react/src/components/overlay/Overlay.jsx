/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './style.module.css'

export default function Overlay({ width, height, children, visible, opacity = 0.5, closeEvent }) {
  function closeOverlay(e) {
    if (typeof closeEvent == "function")
      closeEvent(e)
  }
  return (
    <div className={[styles.container, visible ? "" : styles.hide].join(" ")}>
      <div className={styles.overlay} style={{ opacity }} onClick={closeOverlay}>
      </div>
      <div className={styles.content} style={{ width, height }}>
        {children}
      </div>
    </div>
  )
}