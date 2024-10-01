import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

const query = {
  insert: (connection, table, data) => connection.query(
    `INSERT INTO ${table} VALUES (?, ?, ?)`,
    [data.ma ?? v4(), data.ten, data.trangThai]
  ),
  update: (connection, table, data) => connection.query(
    `UPDATE ${table} SET ten = ?, trangThai = ? WHERE ma = ?`,
    [data.ten, data.trangThai, data.ma]
  ),
  delete: (connection, table, data) => connection
    .query(`UPDATE ${table} SET trangThai = 0 WHERE ma = ?`, [data.ma])
}

const requests = {
  async GET(connection, event) {
    const [results,] = await connection.query(`
SELECT pbsp.ma, ram.ten AS ram, rom.ten AS rom, mausac.ten AS mausac, gianhap, giaxuat FROM phienbansanpham AS pbsp
INNER JOIN ram ON ram.ma = pbsp.ram
INNER JOIN rom ON rom.ma = pbsp.rom
INNER JOIN mausac ON mausac.ma = pbsp.mausac
WHERE pbsp.maSanPham = ?;`,
      [event.params.querystring.ma]);
    const response = { statusCode: 200, body: results, event };
    return response;
  },

  async POST(connection, event) {
    const body = event["body-json"];
    const table = event.params.querystring.table;
    try {
      const [result,] = await query[body.action](connection, table, body.data)
      if (result.affectedRows == 0) return { body: "not found" }
      return { body: "success" }
    } catch (error) {
      return { body: "query fail" }
    }
  }
}

export default async function cauHinhAPI(event) {
  const connection = await mysql.createConnection(db);
  try {
    let result = { body: "Error", event }

    const temp = requests[event.context["http-method"]];
    if (temp != null) result = await temp(connection, event);

    connection.end();
    return result;
  } catch (e) {
    connection.end();
    return { body: "error", e };
  }
};

cauHinhAPI({
  "body-json": {},
  "params": {
    "path": {},
    "querystring": {
      "ma": "A1"
    },
    "header": {}
  },
  "stage-variables": {},
  "context": {
    "account-id": "873096019707",
    "api-id": "zd52ipcrb1",
    "api-key": "test-invoke-api-key",
    "authorizer-principal-id": "",
    "caller": "873096019707",
    "cognito-authentication-provider": "",
    "cognito-authentication-type": "",
    "cognito-identity-id": "",
    "cognito-identity-pool-id": "",
    "http-method": "GET",
    "stage": "test-invoke-stage",
    "source-ip": "test-invoke-source-ip",
    "user": "873096019707",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
    "user-arn": "arn:aws:iam::873096019707:root",
    "request-id": "2d10fe8a-41dd-47f9-8b72-f47f22c124fd",
    "resource-id": "t6ls3t",
    "resource-path": "/cau-hinh"
  }
}).then(console.log)