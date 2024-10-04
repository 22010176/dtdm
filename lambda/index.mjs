import sanPhamAPI from "./san-pham/index.mjs"
import cauHinhAPI from "./cauhinh/index.mjs"
import thuocTinhAPI from "./thuoctinh/index.mjs"
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



// console.log(process.env)
handler({
  "body-json": {
    ma: "155a6f4b3596-45b0-bcaa-f773a7dba699",
    ten: "adfddasdf"
  },
  "params": {
    "path": {},
    "querystring": {
      "table": "mausac"
    },
    "header": {}
  },
  "stage-variables": {},
  "context": {
    "http-method": "GET",
    "resource-path": "/thuoc-tinh"
  }
}).then(console.log)
  .then(
    a => pool.end()
  )
