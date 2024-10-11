import cauHinhAPI from "./route/cauHinh.mjs"
import sanPhamAPI from "./route/sanPham.mjs"
import thuocTinhAPI from "./route/thuocTinh.mjs"
import mysql2 from 'mysql2/promise'


const db = {
  host: process.env.db_host || "localhost",
  user: process.env.db_user || "root",
  password: process.env.db_password || "admin",
  database: process.env.db_database || "btl"
}

const pool = mysql2.createPool({
  ...db,
  waitForConnections: true,
  connectionLimit: 20
})

export async function handler(event) {
  const connection = await pool.getConnection();
  const response = { body: [], message: "", event }
  try {
    switch (event.context["resource-path"]) {
      case "/thuoc-tinh":
        Object.assign(response, await thuocTinhAPI(connection, event))
        break;
      case "/san-pham":
        Object.assign(response, await sanPhamAPI(connection, event))
        break;
      case "/cau-hinh":
        Object.assign(response, await cauHinhAPI(connection, event))
        break;
      default:
        break;
    }
    connection.release();
    return response;
  } catch (error) {
    connection.release()
    return { body: [], message: error, event }
  }
}

// handler({
//   "body-json": {
//     maSP: "A4",
//     rom: "a",
//     ram: "b",
//     mauSac: "b",
//     giaNhap: 44,
//     giaXuat: 44,
//     ma: "6649692e-a49a-4d47-9b9a-255f7332c465"
//   },
//   "params": {
//     "path": {},
//     "querystring": {
//       "ma": "g3",
//     },
//     "header": {}
//   },
//   "stage-variables": {},
//   "context": {
//     "http-method": "GET",
//     "resource-path": "/cau-hinh"
//   }
// }).then(console.log)
//   .then(
//     a => pool.end()
//   )



