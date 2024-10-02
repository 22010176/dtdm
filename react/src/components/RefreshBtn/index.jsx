/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

export default function RefreshBtn({ width, height, onClick }) {
  return (
    <button type="reset" className={styles["refresh-btn"]} style={{ width, height }} onClick={function (e) {
      if (typeof onClick === 'function') onClick(e);
    }}>
      <FontAwesomeIcon icon={faArrowRotateRight} style={{ color: "#ff00ff", }} />
      <span>Làm mới</span>
    </button>
  )
}