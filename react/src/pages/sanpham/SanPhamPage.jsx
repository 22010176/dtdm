/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from '../../components/sidebar'
import { formarters } from '../../components/table_a/formatters.mjs'
import Toolbar from '../../components/sp_toolbar'

import Overlay from '../../components/overlay/Overlay'
import SanPhamForm from '../../components/sp_inputForm'
import ThemCauHinh from '../../components/sp_taoCauHinh'

import styles from './style.module.css'
import IMEM_Data from '../../components/sp_imei'
import { useEffect, useState, createContext } from 'react'
import TableA from '../../components/table_a'
import { apiRoute } from '../../api_param'

export const FormContext = createContext()
const defaulSanPhamData = {
  "ten": "", "xuatXu": "a", "cpu": "", "pin": "",
  "man": "", "camTruoc": "", "camSau": "", "hdh": "a",
  "pbHDH": "", "tgBH": "", "thuongHieu": "a", "img": ""
}
function App() {
  const [overlay, setOverlay] = useState({
    add: false, edit: false, taoCH: false, imei: false
  });
  function openOverlay(key, e = {}) {
    e?.preventDefault?.()
    setOverlay(data => ({ ...data, [key]: true }))
  }

  function closeOverlay(key, reset = false, e = {}) {
    e?.preventDefault?.();
    setOverlay(data => ({ ...data, [key]: false }))
    if (reset) resetPage()
  }

  const [data, setData] = useState(defaulSanPhamData)
  function resetPage() {
    setData(defaulSanPhamData)
    getTableData();
  }

  const [tableData, setTableData] = useState([])
  function getTableData() {
    setTableData([])
    fetch(apiRoute.sp)
      .then(a => a.json())
      .then(a => setTableData(a.body))
  }

  useEffect(function () {
    resetPage()
  }, [])

  async function InsertSanPham(e) {
    e.preventDefault()
    await fetch(apiRoute.sp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "insert", data })
    }).then(a => a.json()).then(a => {
      setData(src => ({ ...src, ma: a.id }))
    })
    openOverlay("taoCH")
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

  async function UpdateSanPham(e) {
    e.preventDefault();
    fetch(apiRoute.sp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", data })
    }).then(a => a.json()).then(console.log)
    getTableData()
    closeOverlay("edit", true)
  }

  async function openEditForm(e) {
    if (!data.ma) return;
    const temp = await fetch(`${apiRoute.sp}?ma=${data.ma}`, {
      method: "GET", headers: { "Content-Type": "application/json" },
    }).then(a => a.json()).then(a => a.body[0])

    setData(() => ({
      "ma": temp.ma, "ten": temp.ten, "xuatXu": temp.xuatxu, "cpu": temp.cpu, "pin": temp.dungluongpin,
      "man": temp.kichthuocmanhinh, "camTruoc": temp.cam_truoc, "camSau": temp.cam_sau, "hdh": temp.hedieuhanh,
      "pbHDH": temp.phienbanhdh, "tgBH": temp.thoigianbaohanh, "thuongHieu": temp.thuonghieu, "img": temp.hinhanh
    }))
    openOverlay("edit", e)
  }

  function openAddForm(e) {
    setData({ ...defaulSanPhamData }) // no id on data
    openOverlay("add")
  }

  async function closeInsertCHForm(e) {
    e?.preventDefault()
    // Neu so luong san pham != 0
    if (await fetch(`${apiRoute.cauHinh}?sp=${data.ma}`, { method: "GET" })
      .then(a => a.json()).then(a => a.body.length) != 0) {
      closeOverlay("taoCH", false)
      let id = data.ma;
      closeOverlay("add", true)
      setData(data => ({ ...data, ma: id }))
      openEditForm()
      return;
    }

    const result = confirm("Phai co it nhat 1 cau hinh. Hay dien 1 cau hinh!!!")
    if (!result) { // press cancel
      await fetch(apiRoute.sp, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", data: { ma: data.ma } })
      }).then(a => a.json()).then(console.log)

      closeOverlay("taoCH", false)
      closeOverlay("add", true)
    }
  }

  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Toolbar
          addFunc={openAddForm}
          editfunc={openEditForm}
          deleteFunc={DeleteSanPham}
          refreshClick={resetPage}
        />
        {/* <SanPhamTable /> */}
        <TableA height="80%" wid th="100%"
          headers={["Mã", "Tên", "Thương hiệu", "Hệ điều hành", "Phiên bản hdh", "Xuất xứ"]}
          data={tableData.map(formarters.spFormat)}
          rowClick={a => setData(src => ({ ...src, "ma": a.id }))}
        />
      </div>

      {/* Them san pham */}
      <FormContext.Provider value={{ sanpham: [data, setData] }}>
        <Overlay width="80%" height="70%" visible={overlay.add} opacity={0.9} closeEvent={closeOverlay.bind({}, "add", true)} >
          <div className={styles.title}>
            <h1>Thêm sản phẩm</h1>
          </div>
          <SanPhamForm />
          <div className={styles["submit-section"]}>
            <button className="add" type='submit' onClick={InsertSanPham}>Tạo cấu hình</button>
            <button className="delete" onClick={closeOverlay.bind({}, "add", true)}>Hủy bỏ</button>
          </div>
        </Overlay >

        {/* Sua san pham */}
        <Overlay width="80%" height="70%" visible={overlay.edit} opacity={0.9} closeEvent={closeOverlay.bind({}, "edit", true)} >
          <div className={styles.title}>
            <h1>Sửa sản phẩm</h1>
          </div>
          <SanPhamForm />
          <div className={styles["submit-section"]}>
            <button className="add" type='submit' onClick={UpdateSanPham}>Lưu thông tin</button>
            <button className="edit" type='submit' onClick={openOverlay.bind(this, "taoCH")}>Sửa cấu hình</button>
            <button className="delete" onClick={closeOverlay.bind({}, "edit", true)}>Hủy bỏ</button>
          </div>
        </Overlay >

        {/* Tao cau hinh */}
        <Overlay width="70%" height="70%" visible={overlay.taoCH} opacity={0.9} closeEvent={closeInsertCHForm} >
          <div className={styles.title}>
            <h1>Chỉnh sửa cấu hình</h1>
          </div>
          <ThemCauHinh closeOverlay={closeInsertCHForm} ma={data.ma} />
        </Overlay >

        {/* imei */}
        <Overlay width="60%" height="80%" visible={overlay.imei} opacity={0.9} closeEvent={closeOverlay.bind({}, "add", true)} >
          <div className={styles.title}>
            <h1>Danh sách mã IMEI</h1>
          </div>
          <IMEM_Data />
        </Overlay >
      </FormContext.Provider>
    </div >
  )
}

export default App
