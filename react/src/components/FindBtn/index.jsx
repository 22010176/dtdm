/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

export default function FindBtn({ width, height }) {
  return (
    <button type="submit" className={styles['find-btn']} style={{ width, height }}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <p>Tìm kiếm</p>
    </button>
  )

}