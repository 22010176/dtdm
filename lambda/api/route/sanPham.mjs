import { v4 } from 'uuid'

const query = {
  async selectOne(connection, event) {
    const { ma } = event.params.querystring;
    return await connection.query(
      `SELECT * FROM sanpham WHERE ma = ? AND trangThai != 0;`,
      [ma]
    )
  },
  async selectAll(connection, event) {
    return await connection.query(`
SELECT sp.ma, sp.ten, sp.phienbanHDH, xx.ten AS xuatxu, hdh.ten AS hedieuhanh, th.ten AS thuonghieu
FROM sanpham AS sp
INNER JOIN xuatxu AS xx ON xx.ma =  sp.xuatxu
INNER JOIN thuonghieu AS th ON sp.thuonghieu = th.ma
INNER JOIN hedieuhanh AS hdh ON hdh.ma = sp.hedieuhanh
WHERE sp.trangThai = 1;`)
  },
  async insert(connection, data) {
    let {
      ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh
    } = data["body-json"]
    ma ??= v4()
    const res = await connection.query(`
INSERT INTO sanpham 
(ma, ten, xuatxu, cpu, pin, kichThuocManHinh, camTruoc, camSau, hedieuhanh, phienBanHDH, thoiGianBaoHanh, thuonghieu, hinhAnh, trangThai)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);`,
      [ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh, 1])
    return [...res, ma]
  },
  async update(connection, event) {
    const {
      ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh, ma
    } = event["body-json"]
    if (!xuatXu || !hdh || !thuongHieu) throw Error("Cant update")
    return connection.query(`
UPDATE sanpham SET 
ten = ?, xuatxu = ?, cpu = ?, pin = ?, hinhAnh = ?,
kichThuocManHinh = ?, camTruoc = ?, camSau = ?, hedieuhanh = ?,
phienBanHDH = ?, thoiGianBaoHanh = ?, thuonghieu = ?
WHERE ma = ?`,
      [ten, xuatXu, cpu, pin, hinhAnh, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, ma])
  },
  async delete(connection, event) {
    return connection.query(
      "UPDATE sanpham SET trangThai = 2 WHERE ma = ?;",
      [event["body-json"].ma])
  }
}

const methods = {
  // san-pham
  // san-pham?ma=...
  async GET(connection, event) {
    const func = event.params.querystring.ma ? query.selectOne : query.selectAll;
    return (await func(connection, event))[0]
  },
  async PUT(connection, event) {
    const [, , ma] = await query.insert(connection, event)
    return [{ ma, ...event["body-json"] }]
  },
  async POST(connection, event) {
    const [result,] = await query.update(connection, event)
    if (result.changedRows == 0) throw Error("Cant update row")
    return []
  },
  async DELETE(connection, event) {
    const [result,] = await query.delete(connection, event);
    if (result.changedRows == 0) throw Error("Cant delete row")
    return []
  }
}

export default async function sanPhamAPI(connection, event) {
  try {
    let body = await methods[event.context["http-method"]](connection, event)
    return { body, message: "Success" };
  } catch (e) {
    return { body: [], message: new Error(e).message };
  }
};
