import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

const query = {
  insert: (connection, data) => connection.query(`
INSERT INTO phienbansanpham (ma, maSanPham, rom, ram, mausac, gianhap, giaxuat, trangthai) 
VALUES 
(?, ?, ?, ?, ?, ?, ?, 1);`,
    [data.ma ?? v4(), data.maSP, data.rom, data.ram, data.mausac, data.giaNhap, data.giaBan]),
  update: (connection, data) => connection.query(`

`,
    []),
  delete: (connection, data) => connection.query(`
UPDATE phienbansanpham SET trangThai = 0
WHERE ma = ? AND maSanPham = ?`,
    [data.ma, data.maSP])
}

const requests = {
  async GET(connection, event) {
    // const connection = await mysql.createConnection(db);
    const [results,] = await connection.query(`
SELECT pbsp.ma, ram.ten AS ram, rom.ten AS rom, mausac.ten AS mausac, gianhap, giaxuat FROM phienbansanpham AS pbsp
INNER JOIN ram ON ram.ma = pbsp.ram
INNER JOIN rom ON rom.ma = pbsp.rom
INNER JOIN mausac ON mausac.ma = pbsp.mausac
WHERE pbsp.maSanPham = ? AND pbsp.trangThai = 1;`,
      [event.params.querystring.ma]);
    // connection.end();
    const response = { statusCode: 200, body: results, event };
    return response;
  },

  async POST(connection, event) {
    // const connection = await mysql.createConnection(db);
    const body = event["body-json"];

    try {
      const [result,] = await query[body.action](connection, body.data)
      // connection.end();
      if (result.affectedRows == 0) return { body: [], message: "not found" }
      return { body: [] }
    } catch (error) {
      return { body: [], message: "query fail" }
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
//     "action": "delete",
//     "data": {
//       "ma": "d3d",
//       "maSP": "A1"
//     }
//   },
//   "params": {
//     "path": {},
//     "querystring": {
//       "ma": "A1"
//     },
//     "header": {}
//   },
//   "stage-variables": {},
//   "context": {
//     "account-id": "873096019707",
//     "api-id": "zd52ipcrb1",
//     "api-key": "test-invoke-api-key",
//     "authorizer-principal-id": "",
//     "caller": "873096019707",
//     "cognito-authentication-provider": "",
//     "cognito-authentication-type": "",
//     "cognito-identity-id": "",
//     "cognito-identity-pool-id": "",
//     "http-method": "POST",
//     "stage": "test-invoke-stage",
//     "source-ip": "test-invoke-source-ip",
//     "user": "873096019707",
//     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
//     "user-arn": "arn:aws:iam::873096019707:root",
//     "request-id": "2d10fe8a-41dd-47f9-8b72-f47f22c124fd",
//     "resource-id": "t6ls3t",
//     "resource-path": "/cau-hinh"
//   }
// }).then(console.log)