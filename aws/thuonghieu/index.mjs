import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'


// async function _add(connection, data) {
//   try {
//     const [result, field] = await connection.query(
//       "INSERT INTO thuonghieu VALUES (?, ?, ?)",
//       [data.ma ?? v4(), data.ten, data.trangThai]
//     )
//     if (result.affectedRows == 0) return { body: "not found" }
//     return { body: "success" }
//   } catch (error) {
//     console.log(error)
//     return { body: "query fail" }
//   }
// }

// async function _edit(connection, data) {
//   try {
//     const [result, field] = await connection.query(
//       "UPDATE thuonghieu SET ten = ?, trangThai = ? WHERE ma = ?",
//       [data.ten, data.trangThai, data.ma]
//     )
//     if (result.affectedRows == 0) return { body: "not found" }
//     return { body: "success" }

//   } catch (error) {
//     return { body: "query fail" }
//   }
// }

// async function _delete(connection, data) {
//   try {
//     const [result, field] = await connection.query(
//       "DELETE FROM thuonghieu WHERE ma = ?",
//       [data.ma]
//     )
//     if (result.affectedRows == 0) return { body: "not found" }
//     return { body: "success" }
//   } catch (error) {
//     return { body: "query fail" }
//   }
// }
const query = {
  insert: (connection, data) => connection.query(
    "INSERT INTO thuonghieu VALUES (?, ?, ?)",
    [data.ma ?? v4(), data.ten, data.trangThai]
  ),
  update: (connection, data) => connection.query(
    "UPDATE thuonghieu SET ten = ?, trangThai = ? WHERE ma = ?",
    [data.ten, data.trangThai, data.ma]
  ),
  delete: (connection, data) => connection
    .query("DELETE FROM thuonghieu WHERE ma = ?", [data.ma])
}

async function query_func(params, connection, data) {
  try {
    const [result, field] = await query[params](connection, data)
    if (result.affectedRows == 0) return { body: "not found" }
    return { body: "success" }
  } catch (error) {
    return { body: "query fail" }
  }
}
const requests = {
  async GET(connection, event) {
    const [results, fields] = await connection.query("SELECT * FROM thuonghieu;");
    const response = { statusCode: 200, body: JSON.stringify(results), event };
    return response;
  },

  async POST(connection, event) {
    const body = event["body-json"];
    try {
      const [result, field] = await query[body.action](connection, body.data)
      if (result.affectedRows == 0) return { body: "not found" }
      return { body: "success" }
    } catch (error) {
      return { body: "query fail" }
    }

    return await query_func(body.action.toLowerCase(), connection, body.data)
    switch (body.action.toLowerCase()) {
      case "add":
      case "insert":
        result = _add(connection, body.data)
        break
      case "edit":
      case "update":
        result = _edit(connection, body.data)
        break
      case "remove":
      case "delete":
        result = _delete(connection, body.data)
        break
      default:
        result = { body: "error, no action fount" }
        break
    }
    return result;
  }
}

export default async function thuongHieuRoute(event) {
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

thuongHieuRoute({
  "body-json": {
    "action": "insert",
    "data": {
      "ma": "0ce0ac9f-41fa-4a31-8ffa-1b2fa47529ba",
      "ten": "eeddd",
      "trangThai": 33
    }
  },
  "context": {
    "http-method": "POST"
  }
}, null).then(console.log)