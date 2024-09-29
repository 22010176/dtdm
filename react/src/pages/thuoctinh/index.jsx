/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faMemory, faBrush, faL } from '@fortawesome/free-solid-svg-icons'
import { apiRoute, tableRoute } from "../../api_param"

import styles from './style.module.css'
import Overlay from '../../components/overlay/Overlay'
import TableA from '../../components/table_a'
import Sidebar from '../../components/sidebar'
import { useEffect, useState } from 'react'


function _temmp(callback, e) {
  e?.preventDefault();
  if (typeof callback == 'function') callback(e);
}

function SubmitSec({ deleteF = e => { }, addF = e => { }, editF = e => { } }) {
  return (
    <div className={styles["submit"]}>
      <button className="add" type='submit' onClick={_temmp.bind({}, addF)}>
        Them
      </button>
      <button className="refresh" type='submit' onClick={_temmp.bind({}, editF)}>
        Sua
      </button>
      <button className="delete" type='button' onClick={_temmp.bind({}, deleteF)}>
        Xoa
      </button>
    </div >
  )
}

function ThuocTinhSec({ name, title, icon, color, headers = [] }) {
  const url = apiRoute[name];
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ ten: "", trangThai: 1 });

  useState(async function () {
    getData(name)
  }, [])

  async function getData() {
    if (!url) return;

    const a = await fetch(url, { method: "GET" })
      .then(res => res.json())
    if (a.body) setData(JSON.parse(a.body).map(tableRoute[name]))
  }

  async function addData(e) {
    if (!url) return;

    const result = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", data: formData })
    }).then(a => a.json())

    if (result.body == 'success') {
      setFormData({ ten: "", trangThai: 1 });
      getData(name);
    } else alert("Fail")
  }

  async function editData(e) {
    console.log("edit")
  }

  async function deleteData(e) {

  }

  function rowClick(item) {
    setFormData(old => ({ ...old, ten: item.data[1] }))
  }

  return (
    <>
      <div className={styles.category} style={{ background: color }} onClick={async function (e) {
        setVisibility(true)
        getData(name);
      }}>
        <FontAwesomeIcon icon={icon} />
        <h1>{title}</h1>
      </div>
      <Overlay height="70%" width="55%" visible={visibility} opacity={.8} nameOverlay={name} closeEvent={setVisibility.bind(this, false)}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <form action="" method="get" className={styles.form}>
          <div className={styles["form-sec"]}>
            <FontAwesomeIcon icon={icon} />
            <div>
              <label htmlFor={name}>{title}</label>
              <input value={formData.ten} type="text" id={name} name={name} onChange={e => setFormData(old => ({ ...old, ten: e.target.value }))} />
            </div>
          </div>
          <TableA height="50%" width="100%" headers={headers} data={data} rowClick={rowClick} />
          <SubmitSec addF={addData} editF={editData} deleteF={deleteData} />
        </form>
      </Overlay>
    </>
  )
}

export default function ThuocTinhPage() {
  return (
    <>
      <div className={styles.App}>
        <Sidebar />
        <div className={styles["main-content"]}>
          <ThuocTinhSec name="thuongHieu" title="Thuong Hieu" icon={faEmpire} headers={["Ma thuong hieu", "Ten thuong hieu"]} color="#b6d7a8" />
          <ThuocTinhSec name="xuatXu" title="Xuất Xứ" icon={faMountainCity} headers={["Ma xuat xu", "Noi xuat xu"]} color="#ea9999" />
          <ThuocTinhSec name="hdh" title="Hệ Điều Hành" icon={faAndroid} headers={["Ma he dieu hanh", "Ten he dieu hanh"]} color="#f9cb9c" />
          <ThuocTinhSec name="ram" title="RAM" icon={faComputer} headers={["Ma RAM", "Dung luong RAM"]} color="#b4a7d6" />
          <ThuocTinhSec name="rom" title="ROM" icon={faMemory} headers={["Ma ROM", "Dung luong ROM"]} color="#d5a6bd" />
          <ThuocTinhSec name="mauSac" title="Màu Sắc" icon={faMemory} headers={["Ma mau", "Ten mau"]} color="#ffe599" />
        </div>
      </div>
    </>
  )
}