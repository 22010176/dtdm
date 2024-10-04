import { v4 } from 'uuid'

const query = {
  async selectOne(connection, event) {
    const { ma, maSP } = event.params.querystring
    return await connection.query(`
SELECT * FROM cauHinh WHERE sanPham = ? AND ma = ? AND trangthai = 1;`,
      [maSP, ma]
    )
  },
  async selectAll(connection, event) {
    return connection.query(`
SELECT ch.ma, ram.ten AS ram, rom.ten AS rom, mausac.ten AS mausac, gianhap, giaxuat 
FROM cauHinh AS ch
INNER JOIN ram ON ram.ma = ch.ram
INNER JOIN rom ON rom.ma = ch.rom
INNER JOIN mausac ON mausac.ma = ch.mausac
WHERE ch.sanPham = ? AND ch.trangThai = 1;`,
      [event.params.querystring.maSP])
  },
  async insert(connection, event) {
    let { ma, maSP, rom, ram, mauSac, giaNhap, giaXuat } = event["body-json"]
    ma ??= v4()
    const [result, context] = await connection.query(`
INSERT INTO cauHinh (ma, sanPham, rom, ram, mauSac, giaNhap, giaXuat, trangThai) 
VALUES (?, ?, ?, ?, ?, ?, ?, 1);`,
      [ma, maSP, rom, ram, mauSac, giaNhap, giaXuat])
    return [result, context, ma]
  },
  async update(connection, event) {
    const { ma, maSP, rom, ram, mauSac, giaNhap, giaXuat } = event["body-json"]
    return connection.query(`
UPDATE cauHinh 
SET rom = ?, ram = ?, mausac = ?, gianhap = ?, giaxuat = ?
WHERE ma = ? AND sanPham = ?;`,
      [rom, ram, mauSac, giaNhap, giaXuat, ma, maSP])
  },
  async delete(connection, event) {
    return connection.query(
      `UPDATE cauHinh SET trangThai = 2 WHERE ma = ?`,
      [event["body-json"].ma])
  }
}

const methods = {
  async GET(connection, event) {
    const func = event.params.querystring.ma ? query.selectOne : query.selectAll;
    return (await func(connection, event))[0]
  },
  async PUT(connection, event) {
    const [, , id] = await query.insert(connection, event)
    return [{ ma: id, ...event["body-json"] }]
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

export default async function cauHinhAPI(connection, event) {
  try {
    let body = await methods[event.context["http-method"]](connection, event)
    return { body, message: "Success" };
  } catch (e) {
    return { body: [], message: new Error(e).message };
  }
};