import Sidebar from '../../components/sp_sidebar'
import Toolbar from '../../components/sp_toolbar'
import styles from './style.module.css'

export default function ErrorPage() {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        {/* <Toolbar toolFunc={overlayFunction.bind(this, "open")} /> */}
        {/* <SanPhamTable /> */}
      </div>
    </div>
  )
}