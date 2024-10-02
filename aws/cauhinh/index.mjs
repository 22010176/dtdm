import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

const query = {
  insert: (connection, data) => connection.query(`
INSERT INTO phienbansanpham (ma, maSanPham, rom, ram, mausac, gianhap, giaxuat, trangthai) 
VALUES (?, ?, ?, ?, ?, ?, ?, 1);`,
    [data.ma ?? v4(), data.maSP, data.rom, data.ram, data.mausac, data.giaNhap, data.giaBan]),
  update: (connection, data) => connection.query(`
UPDATE phienbansanpham 
SET rom = ?, ram = ?, mausac = ?, gianhap = ?, giaxuat = ?
WHERE ma = ? AND masanpham = ?;`,
    [data.rom, data.ram, data.mausac, data.giaNhap, data.giaBan, data.ma, data.maSP]),
  delete: (connection, data) => connection.query(`
UPDATE phienbansanpham SET trangThai = 0
WHERE ma = ? AN D maSanPham = ?`,
    [data.ma, data.maSP])
}

const tableQuery = `
SELECT pbsp.ma, ram.ten AS ram, rom.ten AS rom, mausac.ten AS mausac, gianhap, giaxuat FROM phienbansanpham AS pbsp
INNER JOIN ram ON ram.ma = pbsp.ram
INNER JOIN rom ON rom.ma = pbsp.rom
INNER JOIN mausac ON mausac.ma = pbsp.mausac
WHERE pbsp.maSanPham = ? AND pbsp.trangThai = 1;`
const infoQuery = `SELECT * FROM phienbansanpham WHERE maSanPham = ? AND ma = ? AND trangthai = 1;`
const requests = {
  async GET(connection, event) {
    const { sp, ch } = event.params.querystring
    const [results,] = await connection.query(ch ? infoQuery : tableQuery, [sp, ch]);
    const response = { statusCode: 200, body: results, event };
    return response;
  },

  async POST(connection, event) {
    const body = event["body-json"];
    try {
      const [result,] = await query[body.action](connection, body.data)
      if (result.affectedRows == 0) return { body: [], message: "not found" }
      return { body: [] }
    } catch (error) {
      return { body: [], message: "query fail", error }
    }
  }
}

export default async function cauHinhAPI(event) {
  const connection = await mysql.createConnection(db);
  try {
    const result = await requests[event.context["http-method"]](connection, event);
    connection.end();
    return { message: "success", ...result }
  } catch (e) {
    connection.end();
    return { message: "error", body: [], e, event };
  }
};

// cauHinhAPI({
//   "body-json": {
//     "action": "update",
//     "data": {
//       "ma": "79061147-ec91-42a3-928c-33519fabf524",
//       "maSP": "A5",
//       "rom": "a",
//       "ram": "b",
//       "mausac": "a",
//       "giaNhap": 133,
//       "giaBan": 133
//     }
//   },
//   "params": {
//     "path": {},
//     "querystring": {
//       "ch": "7637a122-97a8-49ea-b95d-a1e84adee4a4",
//       "sp": "A4"
//     },
//     "header": {}
//   },
//   "stage-variables": {},
//   "context": {
//     "http-method": "POST",
//     "resource-path": "/cau-hinh"
//   }
// }).then(console.log)