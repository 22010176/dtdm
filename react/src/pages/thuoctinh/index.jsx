import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faDesktop, faBrush } from '@fortawesome/free-solid-svg-icons'
import TemplateHome from '../../components/templateHome'
import styles from './style.module.css'

export default function ThuocTinhPage() {
  return (
    <TemplateHome>
      <div className={styles["main-content"]}>
        <div className={styles["category"]} style={{ background: "#b6d7a8" }}>
          <FontAwesomeIcon icon={faEmpire} />
          <h1>Thuong hieu</h1>
        </div>
        <div className={styles["category"]} style={{ background: "#ea9999" }}>
          <FontAwesomeIcon icon={faMountainCity} />
          <h1>Xuất Xứ</h1>
        </div>
        <div className={styles["category"]} style={{ background: "#f9cb9c" }}>
          <FontAwesomeIcon icon={faAndroid} />
          <h1>Hệ Điều Hành</h1>
        </div>
        <div className={styles["category"]} style={{ background: "#b4a7d6" }}>
          <FontAwesomeIcon icon={faComputer} />
          <h1>RAM</h1>
        </div>
        <div className={styles["category"]} style={{ background: "#d5a6bd" }}>
          <FontAwesomeIcon icon={faDesktop} />
          <h1>ROM</h1>
        </div>
        <div className={styles["category"]} style={{ background: "#ffe599" }}>
          <FontAwesomeIcon icon={faBrush} />
          <h1>Màu Sắc</h1>
        </div>
      </div>


    </TemplateHome>
  )
}