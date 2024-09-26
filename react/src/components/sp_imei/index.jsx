import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.css'
import FindBtn from '../FindBtn'

export default function IMEM_Data() {
  return (
    <div className={styles.container}>
      <form className={styles["form"]} action="">
        {/* Phien bản */}
        <div className={styles["input-sec"]}>
          <label htmlFor="version" className={styles["field-title"]}>Phien ban</label>
          <select name="version" id="version" className={styles["filed-input"]} >
            <option value="1">128BG</option>
            <option value="2">128BG</option>
            <option value="3">128BG</option>
            <option value="4">128BG</option>
            <option value="5">128BG</option>
          </select>
        </div>

        {/* Tinh trạng */}
        <div className={styles["input-sec"]}>
          <label htmlFor="tinhTrang" className={styles["field-title"]}>Tinh trang</label>
          <select name="tinhTrang" id="tinhTrang" className={styles["filed-input"]} >
            <option value="1">128BG</option>
            <option value="2">128BG</option>
            <option value="3">128BG</option>
            <option value="4">128BG</option>
            <option value="5">128BG</option>
          </select>
        </div>

        {/* Tim kiem */}
        <div className={styles["input-sec"]}>
          <label htmlFor="timKiem" className={styles["field-title"]}>Tim kiem</label>
          <input name="timKiem" type='text' id="timKiem" className={styles["filed-input"]} />
        </div>

        <div className={styles["input-sec"]}>
          <FindBtn width="100px" height="35px" />
        </div>
      </form>

      <div className={styles["wrapper"]}>
        <table className={styles['table-data']}>
          <tbody>
            <tr>
              <th>IMEI</th>
              <th>Ma phieu nhap</th>
              <th>Ma phieu xuat</th>
              <th>Tinh trang</th>
            </tr>
            {new Array(100).fill().map((i, j) => (
              <tr key={j}>
                <td className={styles["imei"]}>test</td>
                <td className={styles["phieuNhap"]}>20</td>
                <td className={styles["phieuXuat"]}>20</td>
                <td className={styles["tinhTrang"]}>aaa</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}