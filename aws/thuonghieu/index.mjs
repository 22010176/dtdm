import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

const data = {
  "body-json": {
    "action": "add",
    "entry": "thuonghieu",
    "data": {
      "ten": "Test1",
      "trang-thai": "test2"
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
    "api-id": "pxxnnam5gh",
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
    "request-id": "df6aaeff-53d9-453f-8114-9c66c03f471e",
    "resource-id": "e8x4v1",
    "resource-path": "/thuong-hieu"
  }
}
async function _add(connection, entry, data) {
  console.log(data)
  let result, field;
  switch (entry) {
    case "thuonghieu":
      [result, field] = await connection.query(
        "INSERT INTO ? VALUES (?, ?, ?)",
        [entry, v4(), data.ten, data.trangThai])
      break;
    default:
      break;
  }
  return { result, field }
}
async function _edit(connection) { }
async function _delete(connection) { }

const requests = {
  async GET(connection, event, context) {
    const [results, fields] = await connection.query("SELECT * FROM btl.thuonghieu;");
    const response = { statusCode: 200, body: JSON.stringify(results), event };
    return response;
  },


  async POST(connection, event, context) {
    const body = event["body-json"];
    switch (body.action.toLowerCase()) {
      case "add":
        _add(connection, body.entry, body.data)
        break;
      case "update":
        break;
      case "delete":
        break;

      default:
        return { body: "error", event }

    }
    return { body: "success", event }
  }
}

export default async function thuongHieuRoute(event, context) {
  const connection = await mysql.createConnection(db);
  let result = { body: "Error", event }

  const temp = requests[event.context["http-method"]];
  if (temp != null) result = await temp(connection, event, context);

  connection.end();
  return result;
};

// thuongHieuRoute({
//   "body-json": {
//     "action": "add",
//     "entry": "thuong-hieu",
//     "data": {
//       "ten": "Test331",
//       "trangThai": 1
//     }
//   },
//   "params": {
//     "path": {},
//     "querystring": {},
//     "header": {}
//   },
//   "stage-variables": {},
//   "context": {
//     "account-id": "688567306327",
//     "api-id": "pxxnnam5gh",
//     "api-key": "test-invoke-api-key",
//     "authorizer-principal-id": "",
//     "caller": "688567306327",
//     "cognito-authentication-provider": "",
//     "cognito-authentication-type": "",
//     "cognito-identity-id": "",
//     "cognito-identity-pool-id": "",
//     "http-method": "POST",
//     "stage": "test-invoke-stage",
//     "source-ip": "test-invoke-source-ip",
//     "user": "688567306327",
//     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
//     "user-arn": "arn:aws:iam::688567306327:root",
//     "request-id": "df6aaeff-53d9-453f-8114-9c66c03f471e",
//     "resource-id": "e8x4v1",
//     "resource-path": "/thuong-hieu"
//   }
// }, {}).then(console.log)