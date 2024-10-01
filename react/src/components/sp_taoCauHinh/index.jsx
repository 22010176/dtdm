/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import TableA from '../table_a';
import { apiRoute } from '../../api_param';
import { formarters } from '../table_a/formatters.mjs';
import styles from './style.module.css'

export default function ThemCauHinh({ closeOverlay }) {
  const [data, setData] = useState({})
  const [formData, setFormData] = useState({
    rom: [], ram: [], mausac: []
  })
  useEffect(() => {
    Promise.all([
      fetch(apiRoute.ram, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, ram: a.body }))),
      fetch(apiRoute.rom, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, rom: a.body }))),
      fetch(apiRoute.mauSac, { method: "GET" }).then(a => a.json()).then(a => setFormData(src => ({ ...src, mausac: a.body })))
    ])
  }, [])
  return (
    <div className={styles.container}>
      <form className={styles["input-form"]}>
        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="rom" className={styles["field-title"]}>ROM</label>
          <select name="rom" id="rom" className={styles["filed-input"]}>
            {formData.rom?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="ram" className={styles["field-title"]}>RAM</label>
          <select name="RAM" id="ram" className={styles["filed-input"]}>
            {formData.ram?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* Color */}
        <div className={styles["form-section"]}>
          <label htmlFor="color" className={styles["field-title"]}>Mau sac</label>
          <select name="color" id="color" className={styles["filed-input"]}>
            {formData.mausac?.map((i, j) => <option defaultValue={!j} key={j} value={i.ma}>{i.ten}</option>)}
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaNhap" className={styles["field-title"]}>Gia nhap</label>
          <input type="text" name="giaNhap" id="giaNhap" className={styles["filed-input"]} />
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaXuat" className={styles["field-title"]}>Gia xuat</label>
          <input type="text" name="giaXuat" id="giaXuat" className={styles["filed-input"]} />
        </div>
      </form>

      <div className={styles["table-data"]}>
        <TableA width={"100%"} height="100%" headers={[
          "Stt", "Ram", "Rom", "Mau sac", "Gia nhap", "Gia xuat"
        ]} data={[]} />
        {/* <div className={styles['wrapper']}>
          <table className={styles['data-table']}>
            <tbody>
              <tr>
                <th>Stt</th>
                <th>RAM</th>
                <th>ROM</th>
                <th>Mau sac</th>
                <th>Gia nhap</th>
                <th>Gia xuat</th>
              </tr>

              {new Array(20).fill().map((i, j) => (
                <tr key={j}>
                  <td className={styles['stt-col']}>1</td>
                  <td className={styles['rom-col']}>32GB</td>
                  <td className={styles['ram-col']}>32GB</td>
                  <td className={styles['color-col']}>Vang</td>
                  <td className={styles['import-col']}>8000000</td>
                  <td className={styles['export-col']}>{Math.floor(Math.random() * 10000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

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

