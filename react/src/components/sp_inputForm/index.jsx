/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.css'
import { useState } from 'react'
import { apiRoute } from '../../api_param'

export default function SanPhamForm({ onChange, data }) {
  // const [data, setData] = useState({
  //   ten: "", xuatXu: "", cpu: "", pin: "",
  //   man: "", camTruoc: "", camSau: "", hdh: "",
  //   pbHDH: "", tgBH: "", thuongHieu: ""
  // });
  const [xuatXu, setXuatXu] = useState([]);
  const [hdh, setHDH] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);

  useEffect(() => {
    fetch(apiRoute.xuatXu).then(a => a.json()).then(a => setXuatXu(JSON.parse(a.body)))
    fetch(apiRoute.hdh).then(a => a.json()).then(a => setHDH(JSON.parse(a.body)))
    fetch(apiRoute.thuongHieu).then(a => a.json()).then(a => setThuongHieu(JSON.parse(a.body)))
  }, [])

  function updateForm(key, e) {
    if (typeof onChange == 'function')
      onChange(key, e.target.value);
  }
  function inputImg(e) {
    e.preventDefault();
  }
  return (
    <form className={styles["container"]}>
      {/* <div className={styles["input-sec"]}>
        <div className={styles['addImg']} >
          <FontAwesomeIcon icon={faCamera} />
          <input onChange={function (e) {
            console.log(e.target.files[0])
            updateForm("img", this.files[0].mozFullPath)

          }} accept='image/*' type="file" name="product-input" id="product-input" />
        </div>
        <img onClick={inputImg} className={styles['demo-img']} src="public/img/logo.jpg" alt="" />
      </div> */}

      <div className={styles["fields"]}>
        {/* Ten san pham */}
        <div className={styles["input-sec"]}>
          <label htmlFor="tenSanPham" className={styles['input-label']}>Ten san pham</label>
          <input onChange={updateForm.bind({}, "ten")} className={styles['form-text-input']} type="text" id='tenSanPham' name='tenSanPham' />
        </div>

        {/* Xuat xu */}
        <div className={styles["input-sec"]}>
          <label htmlFor="xuatXu" className={styles['input-label']}>Xuat xu</label>
          <select name='xuatXu' id='xuatXu' onChange={updateForm.bind({}, "xuatXu")}>
            {xuatXu?.map((i, j) => <option key={j} value={i.id}>{i.ten}</option>)}
          </select>
        </div>

        {/* CPU */}
        <div className={styles["input-sec"]}>
          <label htmlFor="CPU" className={styles['input-label']}>Chip xu ly</label>
          <input onChange={updateForm.bind({}, "cpu")} className={styles['form-text-input']} type="text" name='CPU' id='CPU' />
        </div>

        {/* Pin */}
        <div className={styles["input-sec"]}>
          <label htmlFor="dungLuongPin" className={styles['input-label']}>Dung luong pin</label>
          <input onChange={updateForm.bind({}, "pin")} className={styles['form-text-input']} type="number" name='dungLuongPin' id='dungLuongPin' />
        </div>

        {/* Man hinh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="kichThuocMan" className={styles['input-label']}>Kich thuoc man</label>
          <input onChange={updateForm.bind({}, "man")} className={styles['form-text-input']} type="number" name='kichThuocMan' id="kichThuocMan" />
        </div>

        {/* Camera truoc */}
        <div className={styles["input-sec"]}>
          <label htmlFor="camTruoc" className={styles['input-label']}>Camera trước</label>
          <input onChange={updateForm.bind({}, "camTruoc")} className={styles['form-text-input']} type="number" name='camTruoc' />
        </div>

        {/* Camera sau */}
        <div className={styles["input-sec"]}>
          <label htmlFor="camSau" className={styles['input-label']}>Camera sau</label>
          <input onChange={updateForm.bind({}, "camSau")} className={styles['form-text-input']} type="number" name='camSau' />
        </div>

        {/* He dieu hanh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="heDieuHanh" className={styles['input-label']}>heDieuHanh</label>
          <select onChange={updateForm.bind({}, "hdh")} name='heDieuHanh' id='heDieuHanh'>
            {hdh?.map((i, j) => <option key={j} value={i.id}>{i.ten}</option>)}
          </select>
        </div>

        {/* Phien ban hdh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="pbHDH" className={styles['input-label']}>Phien ban he dieu hanh</label>
          <input onChange={updateForm.bind({}, "pbHDH")} type="text" className={styles['form-text-input']} name='pbHDH' id='pbHDH' />
        </div>

        {/* Thoi gian bao hanh */}
        <div className={styles["input-sec"]}>
          <label htmlFor="tgBH" className={styles['input-label']}>Thoi gian bao hanh</label>
          <input onChange={updateForm.bind({}, "tgBH")} type="number" className={styles['form-text-input']} name='tgBH' id='tgBH' />
        </div>

        {/* Thuong hieu */}
        <div className={styles["input-sec"]}>
          <label htmlFor="thuongHieu" className={styles['input-label']}>thuong hieu</label>
          <select onChange={updateForm.bind({}, "thuongHieu")} name='thuongHieu' id='thuongHieu'>
            {thuongHieu?.map((i, j) => <option key={j} value={i.id}>{i.ten}</option>)}
          </select>
        </div>
      </div>
    </form >
  )
}