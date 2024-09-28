import mysql from 'mysql2/promise'
import { db } from '../databasea.mjs'


const requests = {
  async GET(connection, event, context) {
    const [results, fields] = await connection.query("SELECT * FROM btl.thuonghieu;");
    const response = { statusCode: 200, body: JSON.stringify(results), event };
    return response;
  },
  async POST(connection, event, context) {
    return { body: "POST", event }
  }
}

export default async function thuongHieuRoute(event, context) {
  const connection = await mysql.createConnection(db);
  let result = { body: "Error", event }
  const temp = requests[event['method']];

  if (temp != null) result = await temp(connection, event, context);

  connection.end();
  return result;
};