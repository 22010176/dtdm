/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import TableA from '../table_a';
import { apiRoute } from '../../api_param';
import { formarters } from '../table_a/formatters.mjs';
import { FormContext } from '../../pages/sanpham/SanPhamPage';
import styles from './style.module.css'

export default function ThemCauHinh({ closeOverlay, ma }) {
  const { sanpham: [data, setData] } = useContext(FormContext)
  const [cauHinh, setCauHinh] = useState({
    rom: "a", ram: "a", mausac: "a", giaNhap: null, giaBan: null
  })
  const [formData, setFormData] = useState({
    rom: [], ram: [], mausac: [], table: []
  })

  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
    fetch(`${apiRoute.cauHinh}?ma=${data.ma}`, { method: "GET" }).then(a => a.json()).then(src => {
      console.log(src)
      setFormData(old => ({ ...old, table: src.body ?? [] }))
    })
    Promise.all([
      fetch(apiRoute.ram, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, ram: a.body }))),
      fetch(apiRoute.rom, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, rom: a.body }))),
      fetch(apiRoute.mauSac, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, mausac: a.body }))),
    ])
  }, [])

  return (
    <div className={styles.container}>
      <form className={styles["input-form"]}>
        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="rom" className={styles["field-title"]}>ROM</label>
          <select name="rom" id="rom" value={cauHinh.rom} className={styles["filed-input"]}>
            {formData.rom?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="ram" className={styles["field-title"]}>RAM</label>
          <select name="RAM" id="ram" value={cauHinh.ram} className={styles["filed-input"]}>
            {formData.ram?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* Color */}
        <div className={styles["form-section"]}>
          <label htmlFor="color" className={styles["field-title"]}>Mau sac</label>
          <select name="color" id="color" value={cauHinh.mausac} className={styles["filed-input"]}>
            {formData.mausac?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaNhap" className={styles["field-title"]}>Gia nhap</label>
          <input type="number" name="giaNhap" id="giaNhap" value={cauHinh.giaNhap} className={styles["filed-input"]} />
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaXuat" className={styles["field-title"]}>Gia xuat</label>
          <input type="number" name="giaXuat" id="giaXuat" value={cauHinh.giaBan} className={styles["filed-input"]} />
        </div>
      </form>

      <div className={styles["table-data"]}>
        <TableA width={"100%"} height="100%" headers={[
          "Stt", "Ram", "Rom", "Mau sac", "Gia nhap", "Gia xuat"
        ]} data={formData.table.map(formarters.cauHinh)} />

        <div className={styles["tools-btn"]}>
          <button className="add">Them cau hinh</button>
          <button className="edit">Sua cau hinh</button>
          <button className="delete">Xoa cau hinh</button>
          <button className="refresh">Lam moi cau hinh</button>
        </div>
      </div>

      <div className={styles["submit-btn"]}>
        <button className='add'>Them san pham moi</button>
        <button className='edit' onClick={function (e) {
          if (typeof closeOverlay == 'function') closeOverlay();
        }}>Quay lai trang truoc</button>
      </div>
    </div>
  )
}

