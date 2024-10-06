/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import TableA from '../table_a';
import { apiRoute, cauHinhAPI, thuocTinhAPI } from '../../api_param';
import { formarters } from '../table_a/formatters.mjs';
import styles from './style.module.css'


const defaultCauHinh = { rom: "a", ram: "a", mauSac: "a", giaNhap: "", giaXuat: "", ma: undefined }
export default function ThemCauHinh({ closeOverlay, maSP = "" }) {
  const [cauHinh, setCauHinh] = useState({ ...defaultCauHinh })
  const [formData, setFormData] = useState({ rom: [], ram: [], mauSac: [], table: [] })

  useEffect(() => {
    Promise.all([
      thuocTinhAPI.selectAll("ram").then(a => setFormData(src => ({ ...src, ram: a.body }))),
      thuocTinhAPI.selectAll("rom").then(a => setFormData(src => ({ ...src, rom: a.body }))),
      thuocTinhAPI.selectAll("mauSac").then(a => setFormData(src => ({ ...src, mauSac: a.body }))),
    ])
  }, [])
  useEffect(function () {
    refreshCH()
  }, [maSP])

  async function refreshCH(e) {
    setFormData(old => ({ ...old, table: [] }));
    await cauHinhAPI.selectAll({ maSP }).then(src => setFormData(old => ({ ...old, table: src.body ?? [] })))
  }

  async function addCH(e) {
    e?.preventDefault();
    await cauHinhAPI.insert({ ...cauHinh, maSP }).then(console.log)
    setCauHinh({ ...defaultCauHinh })
    refreshCH()
  }

  async function editCH(e) {
    e?.preventDefault();
    await cauHinhAPI.update({ ...cauHinh, maSP }).then(console.log)
    setCauHinh({ ...defaultCauHinh })
    refreshCH()
  }

  async function deleteCH(e) {
    e?.preventDefault();
    await cauHinhAPI.delete(cauHinh).then(console.log)
    setCauHinh({ ...defaultCauHinh })
    refreshCH()
  }

  return (
    <div className={styles.container}>
      <form className={styles["input-form"]}>
        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="rom" className={styles["field-title"]}>ROM</label>
          <select name="rom" id="rom" className={styles["filed-input"]}
            value={cauHinh.rom} onChange={e => setCauHinh(old => ({ ...old, rom: e.target.value }))}>
            {formData.rom?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="ram" className={styles["field-title"]}>RAM</label>
          <select name="RAM" id="ram" className={styles["filed-input"]}
            value={cauHinh.ram} onChange={e => setCauHinh(old => ({ ...old, ram: e.target.value }))}>
            {formData.ram?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* Color */}
        <div className={styles["form-section"]}>
          <label htmlFor="color" className={styles["field-title"]}>Màu sắc</label>
          <select name="color" id="color" className={styles["filed-input"]}
            value={cauHinh.mauSac} onChange={e => setCauHinh(old => ({ ...old, mauSac: e.target.value }))}>
            {formData.mauSac?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaNhap" className={styles["field-title"]}>Giá nhập</label>
          <input type="number" name="giaNhap" id="giaNhap" className={styles["filed-input"]}
            value={cauHinh.giaNhap} onChange={e => setCauHinh(old => ({ ...old, giaNhap: e.target.value }))} />
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaXuat" className={styles["field-title"]}>Giá xuất</label>
          <input type="number" name="giaXuat" id="giaXuat" className={styles["filed-input"]}
            value={cauHinh.giaXuat} onChange={e => setCauHinh(old => ({ ...old, giaXuat: e.target.value }))} />
        </div>
      </form>

      <div className={styles["table-data"]}>
        <TableA width={"100%"} height="100%"
          headers={["Stt", "Ram", "Rom", "Mau sac", "Gia nhap", "Gia xuat"]}
          data={formData.table.map?.(formarters.cauHinh)}
          rowClick={async function (a) {
            await cauHinhAPI.selectOne({ maSP, ma: a.id }).then(a => setCauHinh(a.body[0]))

          }} />

        <div className={styles["tools-btn"]}>
          <button className="add" onClick={addCH}>Thêm cấu hình</button>
          <button className="edit" onClick={editCH}>Sửa cấu hình</button>
          <button className="delete" onClick={deleteCH}>Xóa cấu hình</button>
          <button className="refresh" onClick={refreshCH}>Làm mới cấu hình</button>
        </div>
      </div>

      <div className={styles["submit-btn"]}>
        <button className='add' disabled={!formData.table.length} onClick={function (e) {
          if (typeof closeOverlay == 'function') closeOverlay("add", e);
        }}>Lưu thông tin</button>
        <button className='edit' onClick={function (e) {
          if (typeof closeOverlay == 'function') closeOverlay("back", e);
        }}>Quay lại trang trước</button>
      </div>
    </div>
  )
}

