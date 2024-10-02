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
    const table = event.params.querystring.table;
    const [results,] = await connection.query(`SELECT * FROM ${table} WHERE trangThai != 0;`, [event.params.querystring.table]);
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

export default async function thuocTinhAPI(event) {
  try {
    const connection = await mysql.createConnection(db);
    let result = { body: "Error", event }

    const temp = requests[event.context["http-method"]];
    if (temp != null) result = await temp(connection, event);

    connection.end();
    return result;
  } catch { return { body: "error" }; }
};

// thuocTinhAPI({

// })