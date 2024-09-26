/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

export default function RefreshBtn({ width, height }) {
  return (
    <button type="reset" className={styles["refresh-btn"]} style={{ width, height }}>
      <FontAwesomeIcon icon={faArrowRotateRight} style={{ color: "#ff00ff", }} />
      <span>Lam moi</span>
    </button>
  )
}