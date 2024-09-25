import Sidebar from '../components/sp_sidebar'
import SanPhamTable from '../components/sp_table'
import Toolbar from '../components/sp_toolbar'

import Overlay from '../components/overlay/Overlay'
import SanPhamForm from '../components/sp_inputForm'
import ThemCauHinh from '../components/sp_taoCauHinh'

import styles from './App.module.css'
import IMEM_Data from '../components/sp_imei'

function App() {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Toolbar />
        <SanPhamTable />
      </div>

      {/* Them san pham */}
      <Overlay width="80%" height="70%" visible={false} opacity={0.9}>
        <div className={styles.title}>
          <h1>Them San Pham</h1>
        </div>
        <SanPhamForm />
        <div className={styles["submit-section"]}>
          <button className="add" type='submit'>Tao cau hinh</button>
          <button className="delete">Huy bo</button>
        </div>
      </Overlay >

      {/* Sua san pham */}
      <Overlay width="80%" height="70%" visible={false} opacity={0.9} >
        <div className={styles.title}>
          <h1>Sua San Pham</h1>
        </div>
        <SanPhamForm />
        <div className={styles["submit-section"]}>
          <button className="add" type='submit'>Luu thong tin</button>
          <button className="edit" type='submit'>Sua cau hinh</button>
          <button className="delete">Huy bo</button>
        </div>
      </Overlay >

      <Overlay width="70%" height="70%" visible={false} opacity={0.9} >
        <div className={styles.title}>
          <h1>Tao Cau Hinh</h1>
        </div>
        <ThemCauHinh />
      </Overlay >

      <Overlay width="60%" height="80%" visible={false} opacity={0.9} >
        <div className={styles.title}>
          <h1>Danh sach ma IMEI</h1>
        </div>
        <IMEM_Data />
      </Overlay >
    </div >
  )
}

export default App
