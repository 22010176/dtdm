/* eslint-disable react/prop-types */
import styles from './style.module.css'

export default function Overlay({ width, height, children, visible, opacity = 0.5 }) {
  return (
    <>
      <div className={styles.container} style={{ display: visible ? "block" : "none", opacity }}>
      </div>
      <div className={styles.content} style={{ display: visible ? "block" : "none", width, height }}>
        {children}
      </div>
    </>
  )
}