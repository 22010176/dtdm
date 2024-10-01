/* eslint-disable react-refresh/only-export-components */
import Sidebar from '../../components/sidebar'
// import SanPhamTable from '../../components/sp_table'
import Toolbar from '../../components/sp_toolbar'

import Overlay from '../../components/overlay/Overlay'
import SanPhamForm from '../../components/sp_inputForm'
import ThemCauHinh from '../../components/sp_taoCauHinh'

import styles from './style.module.css'
import IMEM_Data from '../../components/sp_imei'
import { useEffect, useState, createContext } from 'react'
import TableA from '../../components/table_a'
import { apiRoute } from '../../api_param'

function spFormat(item) {
  return {
    id: item.ma,
    data: [item.ma, item.ten, item.thuonghieu, item.hedieuhanh, item.phienbanHDH, item.xuatxu]
  }
}
export const FormContext = createContext()

function App() {
  const [overlay, setOverlay] = useState({
    add: false, edit: false, taoCH: false, imei: false
  });
  const [data, setData] = useState({
    "ten": "", "xuatXu": "", "cpu": "", "pin": "",
    "man": "", "camTruoc": "", "camSau": "", "hdh": "",
    "pbHDH": "", "tgBH": "", "thuongHieu": "", "img": ""
  })
  const [cauhinh, setCauHinh] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(function () {
    ResetForm()
  }, [])

  function getTableData() {
    setTableData([])
    fetch(apiRoute.sp)
      .then(a => a.json())
      .then(a => setTableData(a.body))
  }

  function overlayFunction(state, key, e = {}) {
    e.target?.preventDefault?.()
    console.log({ state, key })
    setOverlay(data => ({ ...data, [key]: state == "open" }))
  }

  function ResetForm() {
    setData({
      // "ma": null,
      "ten": "", "xuatXu": "a", "cpu": "", "pin": "",
      "man": "", "camTruoc": "", "camSau": "", "hdh": "a",
      "pbHDH": "", "tgBH": "", "thuongHieu": "a", "img": ""
    })
    getTableData();
  }

  function InsertSanPham(e) {
    e.preventDefault()
    overlayFunction("open", "taoCH")
    fetch(apiRoute.sp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "insert", data })
    }).then(a => a.json()).then(console.log)
  }

  async function DeleteSanPham(e) {
    e.preventDefault()
    await fetch(apiRoute.sp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", data })
    }).then(a => a.json()).then(console.log)
    getTableData()
  }

  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Toolbar
          addFunc={overlayFunction.bind(this, "open", "add")}
          editfunc={overlayFunction.bind(this, "open", "edit")}
          deleteFunc={DeleteSanPham}
          refreshClick={ResetForm}
        />
        {/* <SanPhamTable /> */}
        <TableA height="80%" wid th="100%"
          headers={["Mã", "Tên", "Thương hiệu", "Hệ điều hành", "Phiên bản hdh", "Xuất xứ"]}
          data={tableData.map(spFormat)}
          rowClick={function (a) {
            setData(src => ({ ...src, "ma": a.id }))
            // console.log(data, a)
          }}
        />
      </div>

      {/* Them san pham */}
      <FormContext.Provider value={{ sanpham: [data, setData], cauhinh: [cauhinh, setCauHinh] }}>
        <Overlay nameOverlay='add' width="80%" height="70%" visible={overlay.add} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
          <div className={styles.title}>
            <h1>Them San Pham</h1>
          </div>
          <SanPhamForm />
          <div className={styles["submit-section"]}>
            <button className="add" type='submit' onClick={InsertSanPham}>Tao cau hinh</button>
            <button className="delete" onClick={function (e) {
              overlayFunction("close", "add")
              ResetForm();
            }}>Huy bo</button>
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
            <button className="edit" type='submit' onClick={overlayFunction.bind(this, "open", "taoCH")}>Sua cau hinh</button>
            <button className="delete" onClick={overlayFunction.bind(this, "close", "edit")}>Huy bo</button>
          </div>
        </Overlay >

        {/* Tao cau hinh */}
        <Overlay nameOverlay='taoCH' width="70%" height="70%" visible={overlay.taoCH} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
          <div className={styles.title}>
            <h1>Chỉnh sửa Cau Hinh</h1>
          </div>
          <ThemCauHinh closeOverlay={overlayFunction.bind(this, "close", "taoCH")} />
        </Overlay >

        {/* imei */}
        <Overlay nameOverlay='imei' width="60%" height="80%" visible={overlay.imei} opacity={0.9} closeEvent={overlayFunction.bind(this, "close")} >
          <div className={styles.title}>
            <h1>Danh sach ma IMEI</h1>
          </div>
          <IMEM_Data />
        </Overlay >
      </FormContext.Provider>
    </div >
  )
}

export default App
