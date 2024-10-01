import { db } from "../databasea.mjs";
import mysql from 'mysql2/promise'
import { v4 } from 'uuid'

const query = {
  insert: (connection, data) => connection.query(`
INSERT INTO sanpham 
(ma, ten, xuatxu, cpu, dungLuongPin, kichThuocManHinh, cam_truoc, cam_sau, heDieuHanh, phienBanHDH, thoiGianBaoHanh, thuongHieu, trangThai) 
VALUES
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);`,
    [data.ma ?? v4(), data.ten, data.xuatXu, data.cpu, data.pin, data.man, data.camTruoc, data.camSau, data.hdh, data.pbHDH, data.tgBH, data.thuongHieu, 1]
  ),
  update: (connection, data) => connection.query(`
UPDATE sanpham SET 
ten = ?, xuatxu = ?, cpu = ?, dungLuongPin = ?, 
kichThuocManHinh = ?, cam_truoc = ?, cam_sau = ?, heDieuHanh = ?,
phienBanHDH = ?, thoiGianBaoHanh = ?, thuongHieu = ?
WHERE ma = ?;`,
    [data.ten, data.xuatXu, data.cpu, data.pin, data.man, data.camTruoc, data.camSau, data.hdh, data.pbHDH, data.tgBH, data.thuongHieu, data.ma]
  ),
  delete: (connection, data) => connection
    .query("UPDATE sanpham SET trangThai = 0 WHERE ma = ?;", [data.ma])
}

const requests = {
  async GET(connection, event) {
    const [results,] = await connection.query(`
SELECT sp.ma, sp.ten, sp.phienbanHDH, xx.ten AS xuatxu, hdh.ten AS hedieuhanh, th.ten AS thuonghieu 
FROM sanpham AS sp
INNER JOIN xuatxu AS xx ON xx.ma =  sp.xuatxu
INNER JOIN thuonghieu AS th ON sp.thuonghieu = th.ma
INNER JOIN hedieuhanh AS hdh ON hdh.ma = sp.hedieuhanh
WHERE sp.trangThai != 0;`);
    const response = { statusCode: 200, body: results, event };
    return response;
  },

  async POST(connection, event) {
    const body = event["body-json"];
    try {
      const [result,] = await query[body.action](connection, body.data)
      if (result.affectedRows == 0) return { body: "not found" }
      return { body: "success request" }
    } catch (error) {
      console.log(error)
      return { body: "query fail" }
    }
  }
}

export default async function sanPhamAPI(event) {
  try {
    const connection = await mysql.createConnection(db);
    let result = { body: "Error", event }

    const temp = requests[event.context["http-method"]];
    if (temp != null) result = await temp(connection, event);

    connection.end();
    return result;
  } catch {
    return { body: "error" };
  }
};



sanPhamAPI({
  "body-json": {
    "action": "update",
    "data": {
      "ma": "AA6",
      "ten": "test",
      "xuatXu": "a",
      "cpu": "asdfasfd",
      "pin": 44,
      "man": "444",
      "camTruoc": "asdfasdf",
      "camSau": "sadfasfd",
      "hdh": "a",
      "pbHDH": "sadfsfa",
      "tgBH": 22,
      "thuongHieu": "a",
    }
  },
  "params": {
    "path": {},
    "querystring": {},
    "header": {}
  },
  "stage-variables": {},
  "context": {
    "account-id": "688567306327",
    "api-id": "psm62oxb11",
    "api-key": "test-invoke-api-key",
    "authorizer-principal-id": "",
    "caller": "688567306327",
    "cognito-authentication-provider": "",
    "cognito-authentication-type": "",
    "cognito-identity-id": "",
    "cognito-identity-pool-id": "",
    "http-method": "POST",
    "stage": "test-invoke-stage",
    "source-ip": "test-invoke-source-ip",
    "user": "688567306327",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
    "user-arn": "arn:aws:iam::688567306327:root",
    "request-id": "79814577-b12e-47be-8bc0-c029f1f94585",
    "resource-id": "g7ymrh",
    "resource-path": "/san-pham"
  }
}).then(console.log)