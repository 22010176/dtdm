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
import { apiRoute, sanphamAPI, cauHinhAPI, thuocTinhAPI } from '../../api_param'

export const FormContext = createContext()
const defaulSanPhamData = {
  ma: undefined, ten: "", xuatXu: "a", cpu: "",
  pin: "", manHinh: "", camTruoc: "", camSau: "",
  hdh: "a", pbHDH: "", tgBH: "", thuongHieu: "a", hinhAnh: ""
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
    sanphamAPI.selectAll().then(a => {
      console.log(a)
      setTableData(a.body)
    })
  }

  useEffect(function () {
    resetPage()
  }, [])

  async function openCauHinhOverlay(e) {
    e.preventDefault()
    // Nếu sản phẩm được tạo đã được tạo ra trước đó thì ko thêm nữa
    if ((await cauHinhAPI.selectAll({ maSP: data.ma })).body.length == 0 && (await sanphamAPI.selectOne({ ma: data.ma })).body.length == 0)
      sanphamAPI.insert(data).then(a => setData(a.body[0]))
    else sanphamAPI.update(data).then(console.log)
    openOverlay("taoCH")
  }

  async function closeCauHinhOverlay(params) {
    let result = confirm("Ban chắc chắn muốn xóa?")
    if (!result) return
    sanphamAPI.delete({ ma: data.ma })
    closeOverlay("add")
  }
  async function DeleteSanPham(e) {
    e.preventDefault()
    await sanphamAPI.delete(data).then(console.log)
    getTableData()
  }

  async function UpdateSanPham(e) {
    e.preventDefault();
    await sanphamAPI.update(data).then(console.log)
    getTableData()
    closeOverlay("edit", true)
  }

  async function openEditForm(e) {
    if (!data.ma) return;
    const temp = await sanphamAPI.selectOne(data).then(a => a.body[0])
    setData(() => ({
      "ma": temp.ma, "ten": temp.ten, "xuatXu": temp.xuatXu, "cpu": temp.cpu, "pin": temp.pin,
      "manHinh": temp.kichThuocManHinh, "camTruoc": temp.camTruoc, "camSau": temp.camSau, "hdh": temp.hedieuhanh,
      "pbHDH": temp.phienBanHDH, "tgBH": temp.thoiGianBaoHanh, "thuongHieu": temp.thuonghieu, "hinhAnh": temp.hinhanh
    }))
    openOverlay("edit", e)
  }

  function openAddForm(e, reset = true) {
    if (reset) setData({ ...defaulSanPhamData }) // no id on data
    openOverlay("add")
  }

  async function closeInsertCHForm(key, e) {
    e?.preventDefault()
    // Neu so luong san pham != 0
    if (await cauHinhAPI.selectAll({ maSP: data?.ma }).then(a => a.body.length) != 0) {
      // an luu + la trang them san pham
      if (key == "add") {
        closeOverlay("add")
        closeOverlay("edit", false)
        closeOverlay("taoCH")
        resetPage()
      }

      // an quay lai + la trang them san pham
      if (key == "back") closeOverlay("taoCH", false);
      return
    }

    // Người dùng muốn hủy
    // Neu chua co cau hinh, an quay lai hoac luu va la trang them san pham
    if (key == "back" && Object.keys(overlay).find(i => overlay[i] && i == "add")) {
      closeOverlay("taoCH", false)
      setData(src => ({ ...src }))
    }

    // Neu chua co cau hinh, an luu va la trang them san pham
    if (key == "add" && Object.keys(overlay).some(i => overlay[i] && i == "add")) {
      closeOverlay("taoCH")
      closeOverlay("add")
    }
  }

  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Toolbar addFunc={openAddForm} editfunc={openEditForm} deleteFunc={DeleteSanPham} refreshClick={resetPage} />
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
            <button className="add" type='submit' onClick={openCauHinhOverlay}>Tạo cấu hình</button>
            <button className="delete" onClick={closeCauHinhOverlay}>Hủy bỏ</button>
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
            <button className="edit" type='submit' onClick={openCauHinhOverlay}>Sửa cấu hình</button>
            <button className="delete" onClick={closeOverlay.bind({}, "edit", true)}>Hủy bỏ</button>
          </div>
        </Overlay >

        {/* Tao cau hinh */}
        <Overlay width="70%" height="70%" visible={overlay.taoCH} opacity={0.9} closeEvent={closeInsertCHForm.bind("overlay")} >
          <div className={styles.title}>
            <h1>Chỉnh sửa cấu hình</h1>
          </div>
          <ThemCauHinh closeOverlay={closeInsertCHForm} maSP={data?.ma} />
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
