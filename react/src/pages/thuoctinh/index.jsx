/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faMemory, faBrush } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.css'
import Overlay from '../../components/overlay/Overlay'
import TableA from '../../components/table_a'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'


function SubmitSec({ deleteF = e => { }, addF = e => { }, editF = e => { } }) {
  return (
    <div className={styles["submit"]}>
      <button className="add" type='submit' onClick={function (e) {
        e.preventDefault();
        if (typeof addF == 'function') addF();
      }}>Them</button>
      <button className="refresh" type='submit' onClick={function (e) {
        e.preventDefault();
        if (typeof editF == 'function') editF();
      }}>Sua</button>
      <button className="delete" type='button' onClick={function (e) {
        e.preventDefault();
        if (typeof deleteF == 'function') deleteF();
      }}>Xoa</button>
    </div>
  )
}

function FormSec({ title, name, icon }) {
  return (
    <div className={styles["form-sec"]}>
      <FontAwesomeIcon icon={icon} />
      <div>
        <label htmlFor={name}>{title}</label>
        <input type="text" id={name} name={name} />
      </div>
    </div>
  )
}
export default function ThuocTinhPage() {
  const [overlay, setOverlay] = useState({});
  const [source, setSource] = useState({});

  async function updateTable(url, key) {
    await fetch(url, {
      method: "GET"
    }).then(res => res.json())
      .then(data => {
        setSource(src => ({ ...src, [key]: JSON.parse(data.body) }))
        console.log("asdfasfd", JSON.parse(data.body))
      })
  }

  useEffect(() => {
    updateTable("/api/thuoctinh/thuonghieu", "thuongHieu")
  }, [])

  // console.log(source)

  function handleOverlay(state, name) {
    setOverlay(prev => ({ ...prev, [name]: state == "open" }))
  }
  return (
    <>
      <div className={styles.App}>
        <Sidebar />
        <div className={styles["main-content"]}>
          <div className={styles["category"]} style={{ background: "#b6d7a8" }} onClick={async function (e) {
            e.preventDefault();
            handleOverlay("open", "thuongHieu")
            await updateTable("/api/thuoctinh/thuonghieu", "thuongHieu", i => [i.mathuonghieu, i.tenthuonghieu])
          }}>
            <FontAwesomeIcon icon={faEmpire} />
            <h1>Thuong hieu</h1>
          </div>
          <div className={styles["category"]} style={{ background: "#ea9999" }} onClick={handleOverlay.bind(this, "open", "xuatXu")}>
            <FontAwesomeIcon icon={faMountainCity} />
            <h1>Xuất Xứ</h1>
          </div>
          <div className={styles["category"]} style={{ background: "#f9cb9c" }} onClick={handleOverlay.bind(this, "open", "hdh")}>
            <FontAwesomeIcon icon={faAndroid} />
            <h1>Hệ Điều Hành</h1>
          </div>
          <div className={styles["category"]} style={{ background: "#b4a7d6" }} onClick={handleOverlay.bind(this, "open", "ram")}>
            <FontAwesomeIcon icon={faComputer} />
            <h1>RAM</h1>
          </div>
          <div className={styles["category"]} style={{ background: "#d5a6bd" }} onClick={handleOverlay.bind(this, "open", "rom")}>
            <FontAwesomeIcon icon={faMemory} />
            <h1>ROM</h1>
          </div>
          <div className={styles["category"]} style={{ background: "#ffe599" }} onClick={handleOverlay.bind(this, "open", "mau")}>
            <FontAwesomeIcon icon={faBrush} />
            <h1>Màu Sắc</h1>
          </div>
        </div>
      </div>

      {/* Thuong hieu */}
      <Overlay height="70%" width="55%" visible={overlay.thuongHieu} opacity={.8} nameOverlay='thuongHieu' closeEvent={handleOverlay.bind(this, "", "thuongHieu")}>
        <div className={styles.title}>
          <h1>THƯƠNG HIỆU SẢN PHẨM</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faEmpire} name={"thuongHieu"} title={"Thuong hieu"} />
          <TableA height="50%" width="100%" headers={["Ma thuong hieu", "Ten thuong hieu"]} data={source.thuongHieu?.map(i => [i.mathuonghieu, i.tenthuonghieu])} />
          <SubmitSec />
        </form>
      </Overlay>

      {/* Xuat xu */}
      <Overlay height="70%" width="55%" visible={overlay.xuatXu} opacity={.8} nameOverlay='xuatXu' closeEvent={handleOverlay.bind(this, "", "xuatXu")}>
        <div className={styles.title}>
          <h1>Xuất xứ sản phẩm</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faMountainCity} name={"xuatXu"} title={"Xuat xu"} />
          <TableA height="50%" width="100%" headers={["Ma xuat xu", "Noi xuat xu"]} data={source.xuatXu} />
          <SubmitSec />
        </form>
      </Overlay>

      {/* He dieu hanh */}
      <Overlay height="70%" width="55%" visible={overlay.hdh} opacity={.8} nameOverlay='hdh' closeEvent={handleOverlay.bind(this, "", "hdh")}>
        <div className={styles.title}>
          <h1>Hệ Điều Hành</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faAndroid} name={"hdh"} title={"He dieu hanh"} />
          <TableA height="50%" width="100%" headers={["Ma he dieu hanh", "Ten he dieu hanh"]} data={source.xuatXu} />
          <SubmitSec />
        </form>
      </Overlay>

      {/* RAM */}
      <Overlay height="70%" width="55%" visible={overlay.ram} opacity={.8} nameOverlay='ram' closeEvent={handleOverlay.bind(this, "", "ram")}>
        <div className={styles.title}>
          <h1>RAM</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faComputer} name={"ram"} title={"RAM"} />
          <TableA height="50%" width="100%" headers={["Ma RAM", "Dung luong RAM"]} data={source.ram} />
          <SubmitSec />
        </form>
      </Overlay>

      {/* ROM */}
      <Overlay height="70%" width="55%" visible={overlay.rom} opacity={.8} nameOverlay='rom' closeEvent={handleOverlay.bind(this, "", "rom")}>
        <div className={styles.title}>
          <h1>rom</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faMemory} name={"rom"} title={"ROM"} />
          <TableA height="50%" width="100%" headers={["Ma ROM", "Dung luong ROM"]} data={source.xuatXu} />
          <SubmitSec />
        </form>
      </Overlay>

      {/* Mau sac */}
      <Overlay height="70%" width="55%" visible={overlay.mau} opacity={.8} nameOverlay='mau' closeEvent={handleOverlay.bind(this, "", "mau")}>
        <div className={styles.title}>
          <h1>Mau sac</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <FormSec icon={faBrush} name={"mau"} title={"Mau sac"} />
          <TableA height="50%" width="100%" headers={["Ma mau", "Ten mau"]} data={source.xuatXu} />
          <SubmitSec />
        </form>
      </Overlay>
    </>
  )
}