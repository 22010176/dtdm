
import sanPhamAPI from "./san-pham/index.mjs"
import cauHinhAPI from "./cauhinh/index.mjs"
import thuocTinhAPI from "./thuoctinh/index.mjs"

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
        return { body: "not found path", event }
    }
  } catch (error) {
    return { body: "error", event, error }
  }
}


// handler({
//   "body-json": {
//     "action": "delete",
//     "data": {
//       "ma": "b3",
//       "maSP": "A1"
//     }
//   },
//   "params": {
//     "path": {
//     }
//     , "querystring": {
//     }
//     , "header": {
//     }
//   },
//   "stage-variables": {
//   },
//   "context": {
//     "http-method": "POST",
//     "resource-path": "/cau-hinh"
//   }
// }).then(console.log)