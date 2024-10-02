/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import TableA from '../table_a';
import { apiRoute } from '../../api_param';
import { formarters } from '../table_a/formatters.mjs';
import styles from './style.module.css'


const defaultCauHinh = { rom: "a", ram: "a", mausac: "a", giaNhap: "", giaBan: "", ma: "" }
export default function ThemCauHinh({ closeOverlay, ma }) {
  const [cauHinh, setCauHinh] = useState({ ...defaultCauHinh })
  const [formData, setFormData] = useState({ rom: [], ram: [], mausac: [], table: [] })

  useEffect(() => {
    Promise.all([
      fetch(apiRoute.ram, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, ram: a.body }))),
      fetch(apiRoute.rom, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, rom: a.body }))),
      fetch(apiRoute.mauSac, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, mausac: a.body }))),
    ])
  }, [])

  useEffect(function () {
    refreshCH()
  }, [ma])

  function refreshCH(e) {
    setFormData(old => ({ ...old, table: [] }));
    fetch(`${apiRoute.cauHinh}?sp=${ma}`, { method: "GET" })
      .then(a => a.json())
      .then(src => setFormData(old => ({ ...old, table: src.body ?? [] })))
  }

  async function addCH(e) {
    e?.preventDefault();
    await fetch(apiRoute.cauHinh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...cauHinh, ma: undefined, maSP: ma }, action: "insert" })
    }).then(a => a.json()).then(console.log)
    setCauHinh({ ...defaultCauHinh })
    refreshCH()
  }

  async function editCH(e) {
    e?.preventDefault();
    await fetch(apiRoute.cauHinh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...cauHinh, maSP: ma }, action: "update" })
    }).then(a => a.json())
      .then(console.log)
    setCauHinh({ ...defaultCauHinh })
    refreshCH()
  }

  async function deleteCH(e) {
    e?.preventDefault();
    await fetch(apiRoute.cauHinh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ma: cauHinh.ma, maSP: ma }, action: "delete" })
    }).then(a => a.json()).then(console.log)
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
            value={cauHinh.mausac} onChange={e => setCauHinh(old => ({ ...old, mausac: e.target.value }))}>
            {formData.mausac?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
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
            value={cauHinh.giaBan} onChange={e => setCauHinh(old => ({ ...old, giaBan: e.target.value }))} />
        </div>
      </form>

      <div className={styles["table-data"]}>
        <TableA width={"100%"} height="100%"
          headers={["Stt", "Ram", "Rom", "Mau sac", "Gia nhap", "Gia xuat"]}
          data={formData.table.map?.(formarters.cauHinh)}
          rowClick={async function (a) {
            const data = (await fetch(`${apiRoute.cauHinh}?sp=${ma}&ch=${a.id}`, {
              method: "GET", headers: { "Content-Type": "application/json" }
            }).then(a => a.json())).body[0]
            setCauHinh({ ma: data.ma, rom: data.rom, ram: data.ram, mausac: data.mausac, giaNhap: data.gianhap, giaBan: data.giaxuat })
          }} />

        <div className={styles["tools-btn"]}>
          <button className="add" onClick={addCH}>Thêm cấu hình</button>
          <button className="edit" onClick={editCH}>Sửa cấu hình</button>
          <button className="delete" onClick={deleteCH}>Xóa cấu hình</button>
          <button className="refresh" onClick={refreshCH}>Làm mới cấu hình</button>
        </div>
      </div>

      <div className={styles["submit-btn"]}>
        <button className='add' onClick={function (e) {
          if (typeof closeOverlay == 'function') closeOverlay();
        }}>Lưu thông tin</button>
        <button className='edit' onClick={function (e) {
          if (typeof closeOverlay == 'function') closeOverlay();
        }}>Quay lại trang trước</button>
      </div>
    </div>
  )
}

