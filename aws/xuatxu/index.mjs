import mysql from 'mysql2/promise'
import { v4 } from 'uuid'
import { db } from '../databasea.mjs'

const query = {
  insert: (connection, data) => connection.query(
    "INSERT INTO xuatxu VALUES (?, ?, ?)",
    [data.ma ?? v4(), data.ten, data.trangThai]
  ),
  update: (connection, data) => connection.query(
    "UPDATE xuatxu SET ten = ?, trangThai = ? WHERE ma = ?",
    [data.ten, data.trangThai, data.ma]
  ),
  delete: (connection, data) => connection
    .query("DELETE FROM xuatxu WHERE ma = ?", [data.ma])
}

const requests = {
  async GET(connection, event) {
    const [results, fields] = await connection.query("SELECT * FROM xuatxu;");
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
  }
}

export default async function xuatXuRoute(event) {
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

