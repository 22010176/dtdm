import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.css'
import { useState } from 'react'

export default function SanPhamForm() {
  const [data, setData] = useState({
    ten: "", xuatXu: "", CPU: "", pin: "", man: "", camTruoc: "", camSau: "", heDieuHanh: "", pbHDH: "", tgBH: "", thuongHieu: ""
  });

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <form className={styles["container"]}>
      <div className={styles["input-sec"]}>
        <button className={styles['addImg']}>
          <FontAwesomeIcon icon={faCamera} />
          <span>Hinh minh hoa</span>
        </button>
        <img className={styles['demo-img']} src="public/img/logo.jpg" alt="" />
      </div>

      <div className={styles["fields"]}>
        {/* Ten san pham */}
        <div className={styles["input-sec"]}>
          <label htmlFor="tenSanPham" className={styles['input-label']}>Ten san pham</label>
          <input value={data.ten} onChange={(e) => setData(data => ({ ...data, ten: e.target.value }))} className={styles['form-text-input']} type="text" id='tenSanPham' name='tenSanPham' />
        </div>

        {/* Xuat xu */}
        <div className={styles["input-sec"]}>
          <label htmlFor="xuatXu" className={styles['input-label']}>Xuat xu</label>
          <select name='xuatXu' id='xuatXu' value={data.xuatXu} onChange={e => setData(data => ({ ...data, xuatXu: e.target.value }))}>
            <option value="Korean">Korean</option>
            <option value="China">China</option>
          </select>
        </div>

        {/* CPU */}
        <div className={styles["input-sec"]}>
          <label htmlFor="CPU" className={styles['input-label']}>Chip xu ly</label>
          <input value={data.CPU} onChange={e => setData(data => ({ ...data, CPU: e.target.value }))} className={styles['form-text-input']} type="text" name='CPU' id='CPU' />
        </div>

        {/* Pin */}
        <div className={styles["input-sec"]}>
          <label htmlFor="dungLuongPin" className={styles['input-label']}>Dung luong pin</label>
          <input value={data.pin} onChange={e => setData(data => ({ ...data, pin: e.target.value }))} className={styles['form-text-input']} type="number" name='dungLuongPin' id='dungLuongPin' />
        </div>

        {/* Man hinh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="kichThuocMan" className={styles['input-label']}>Kich thuoc man</label>
          <input value={data.man} onChange={e => setData(data => ({ ...data, man: e.target.value }))} className={styles['form-text-input']} type="number" name='kichThuocMan' id="kichThuocMan" />
        </div>

        {/* Camera truoc */}
        <div className={styles["input-sec"]}>
          <label htmlFor="camTruoc" className={styles['input-label']}>Camera trước</label>
          <input value={data.camTruoc} onChange={e => setData(data => ({ ...data, camTruoc: e.target.value }))} className={styles['form-text-input']} type="number" name='camTruoc' />
        </div>

        {/* Camera sau */}
        <div className={styles["input-sec"]}>
          <label htmlFor="camSau" className={styles['input-label']}>Camera sau</label>
          <input value={data.camSau} onChange={e => setData(data => ({ ...data, camSau: e.target.value }))} className={styles['form-text-input']} type="number" name='camSau' />
        </div>

        {/* He dieu hanh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="heDieuHanh" className={styles['input-label']}>heDieuHanh</label>
          <select value={data.heDieuHanh} onChange={e => setData(data => ({ ...data, heDieuHanh: e.target.value }))} name='heDieuHanh' id='heDieuHanh'>
            <option value="window">window</option>
            <option value="android">android</option>
          </select>
        </div>

        {/* Phien ban hdh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="pbHDH" className={styles['input-label']}>Phien ban he dieu hanh</label>
          <select value={data.pbHDH} onChange={e => setData(data => ({ ...data, pbHDH: e.target.value }))} name='pbHDH' id='pbHDH'>
            <option value="window">window</option>
            <option value="android">android</option>
          </select>
        </div>

        {/* Thoi gian bao hanh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="tgBH" className={styles['input-label']}>Thoi gian bao hanh</label>
          <input value={data.tgBH} onChange={e => setData(data => ({ ...data, tgBH: e.target.value }))} type="number" className={styles['form-text-input']} name='tgBH' id='tgBH' />
        </div>

        {/* Thuong hieu */}
        <div className={styles["input-sec"]}>
          <label htmlFor="thuongHieu" className={styles['input-label']}>Phien ban he dieu hanh</label>
          <select value={data.thuongHieu} onChange={e => setData(data => ({ ...data, thuongHieu: e.target.value }))} name='thuongHieu' id='thuongHieu'>
            <option value="samsung">samsung</option>
            <option value="apple">apple</option>
          </select>
        </div>
      </div>
    </form >
  )
}