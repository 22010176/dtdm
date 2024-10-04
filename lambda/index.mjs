import sanPhamAPI from "./san-pham/index.mjs"
import cauHinhAPI from "./cauhinh/index.mjs"
import thuocTinhAPI from "./thuoctinh/index.mjs"

export const db = {
  host: process.env.db_host || "localhost",
  user: process.env.db_user || "root",
  password: process.env.db_password || "admin",
  database: process.env.db_database || "btl"
}

export async function handler(event) {
  try {
    switch (event.context["resource-path"]) {
      case "/cau-hinh":
        return await cauHinhAPI(event)
      case "/thuoc-tinh":
        return await thuocTinhAPI(event)
      case "/san-pham":
        return await sanPhamAPI(event);
      default:
        return { body: [], messageg: "not found path", event }
    }
  } catch (error) {
    return { body: "error", event, error }
  }
}

// console.log(process.env)
// handler({
//   "body-json": {
//     "action": "get",
//     "data": {
//       "ma": "b3",
//       "maSP": "A1"
//     }
//   },
//   "params": {
//     "path": {
//     }
//     , "querystring": {
//       ma: "A1"
//     }
//     , "header": {
//     }
//   },
//   "stage-variables": {
//   },
//   "context": {
//     "http-method": "GET",
//     "resource-path": "/san-pham"
//   }
// }).then(console.log)