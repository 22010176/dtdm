import SanPhamTable from '../../components/sp_table'
import Toolbar from '../../components/sp_toolbar'

import Overlay from '../../components/overlay/Overlay'
import SanPhamForm from '../../components/sp_inputForm'
import ThemCauHinh from '../../components/sp_taoCauHinh'

import styles from './style.module.css'
import IMEM_Data from '../../components/sp_imei'
import { useState } from 'react'
import TemplateHome from '../../components/templateHome'

function App() {
  const [overlay, setOverlay] = useState({});

  function overlayFunction(state, e, key) {
    e.target?.preventDefault?.()
    setOverlay(data => ({ ...data, [key]: state == "open" }))
  }

  return (
    <TemplateHome>
      <div className={styles["main-content"]}>
        <Toolbar toolFunc={overlayFunction.bind(this, "open")} />
        <SanPhamTable />
      </div>

      {/* Them san pham */}
      <Overlay nameOverlay='add' width="80%" height="70%" visible={overlay.add} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
        <div className={styles.title}>
          <h1>Them San Pham</h1>
        </div>
        <SanPhamForm />
        <div className={styles["submit-section"]}>
          <button className="add" type='submit' onClick={overlayFunction.bind(this, "open", {}, "taoCH")}>Tao cau hinh</button>
          <button className="delete" onClick={overlayFunction.bind(this, "close", {}, "add")}>Huy bo</button>
        </div>
      </Overlay >

      {/* Sua san pham */}
      <Overlay nameOverlay='edit' width="80%" height="70%" visible={overlay.edit} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
        <div className={styles.title}>
          <h1>Sua San Pham</h1>
        </div>
        <SanPhamForm />
        <div className={styles["submit-section"]}>
          <button className="add" type='submit'>Luu thong tin</button>
          <button className="edit" type='submit' onClick={overlayFunction.bind(this, "open", {}, "taoCH")}>Sua cau hinh</button>
          <button className="delete" onClick={overlayFunction.bind(this, "close", {}, "edit")}>Huy bo</button>
        </div>
      </Overlay >

      {/* Tao cau hinh */}
      <Overlay nameOverlay='taoCH' width="70%" height="70%" visible={overlay.taoCH} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
        <div className={styles.title}>
          <h1>Chỉnh sửa Cau Hinh</h1>
        </div>
        <ThemCauHinh closeOverlay={overlayFunction.bind(this, "close", {}, "taoCH")} />
      </Overlay >

      {/* imei */}
      <Overlay nameOverlay='imei' width="60%" height="80%" visible={overlay.imei} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
        <div className={styles.title}>
          <h1>Danh sach ma IMEI</h1>
        </div>
        <IMEM_Data />
      </Overlay >
    </TemplateHome>
  )
}

export default App
