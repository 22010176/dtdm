import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

async function _add(connection, data) {
  try {
    await connection.query(
      "INSERT INTO thuonghieu VALUES (?, ?, ?)",
      [v4(), data.ten, data.trangThai]
    )
    return { body: "success" }
  } catch (error) {
    console.log(error)
    return { body: "fail" }
  }
}

async function _edit(connection, data) {
  try {
    const [result, field] = await connection.query(
      "UPDATE thuonghieu SET ten = ?, trangThai = ? WHERE ma = ?",
      [data.ten, data.trangThai, data.ma]
    )
    if (result.affectedRows == 0) return { body: "not found" }
    return { body: "success" }

  } catch (error) {
    return { body: "fail" }
  }
}

async function _delete(connection, data) {
  return { body: "update-later", data }
}

const requests = {
  async GET(connection, event, context) {
    const [results, fields] = await connection.query("SELECT * FROM thuonghieu;");
    const response = { statusCode: 200, body: JSON.stringify(results), event };
    return response;
  },

  async POST(connection, event, context) {
    const body = event["body-json"];
    let result
    switch (body.action.toLowerCase()) {
      case "add":
        result = _add(connection, body.data)
        break
      case "update":
        result = _edit(connection, body.data)
        break
      case "delete":
        result = _delete(connection, body.data)
        break
      default:
        return { body: "error", event }
    }
    result.event = event;
    return result;
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

thuongHieuRoute({
  "body-json": {
    action: "update",
    data: { ma: "035039a3-af04-4c3c-9524-da8d9c24c0bd", ten: "test1", trangThai: 4 }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)