import styles from './style.module.css'

function format1(item) { return { id: item.ma, data: [item.ma, item.ten] } }

const tableRoute = {
  thuongHieu: format1,
  xuatXu: format1,
  hdh: format1,
  mauSac: format1,
  rom: format1,
  ram: format1,
}

export const formarters = {
  spFormat: (item) => ({
    id: item.ma,
    data: [item.ma, item.ten, item.thuonghieu, item.hedieuhanh, item.phienbanHDH, item.xuatxu]
  }),
  thuongHieu: format1,
  xuatXu: format1,
  hdh: format1,
  mauSac: format1,
  rom: format1,
  ram: format1,
}

export default function SanPhamTable() {
  return (
    <div className={styles["table"]}>
      <table className={styles["data-display"]}>
        <tbody>
          <tr>
            <th>Ma SP</th>
            <th>Ten san pham</th>
            <th>So luong ton kho</th>
            <th>Thuong hieu</th>
            <th>He dieu hanh</th>
            <th>Phien ban HDH</th>
            <th>Xuat xu</th>
          </tr>

          {new Array(20).fill().map((i, j) => (
            <tr key={j}>
              <td className={styles["ma-sp"]}>1</td>
              <td className={styles["ten-sp"]}>test</td>
              <td className={styles["sl-sp"]}>5</td>
              <td className={styles["th-sp"]}>888</td>
              <td className={styles["hdh-sp"]}>window</td>
              <td className={styles["phhdh-sp"]}>12</td>
              <td className={styles["sx-sp"]}>hanoi</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}