import { v4 } from 'uuid'

const query = {
  async select(connection, event) {
    const { table } = event.params.querystring
    return await connection.query(`SELECT * FROM ${table} WHERE trangThai = 1;`)
  },
  async insert(connection, event) {
    let { table } = event.params.querystring,
      { ten, ma } = event['body-json'];
    if (!ma) ma = v4()

    const [result, context] = await connection.query(
      `INSERT INTO ${table} (ma, ten, trangthai) VALUES (?, ?, ?)`,
      [ma ?? v4(), ten, 1])
    return [result, context, ma]
  },
  async update(connection, event) {
    let { table } = event.params.querystring,
      { ten, ma } = event['body-json'];
    const [result, context] = await connection.query(
      `UPDATE ${table} SET ten = ? WHERE ma = ?`,
      [ten, ma]
    )
    return [result, context]
  },
  async delete(connection, event) {
    const { table } = event.params.querystring,
      { ma } = event['body-json'];
    return await connection.query(
      `UPDATE ${table} SET trangThai = 2 WHERE ma = ?`,
      [ma]
    )
  }
}

const methods = {
  // find data
  async GET(connection, event) {
    const [result,] = (await query.select(connection, event))
    return result || [];
  },
  // insert data
  async PUT(connection, event) {
    const [, , id] = await query.insert(connection, event)
    return [{ ma: id, ten: event["body-json"].ten }]
  },
  // update data
  async POST(connection, event) {
    const [result, context] = await query.update(connection, event)
    if (result.changedRows == 0) throw Error("Cant update table")
    return []
  },
  // delete data
  async DELETE(connection, event) {
    await query.delete(connection, event)
    return []
  }
}

export default async function thuocTinhAPI(connection, event) {
  try {
    let body = await methods[event.context["http-method"]](connection, event)
    return { body, message: "Success" };
  } catch (e) {
    return { body: [], message: new Error(e).message };
  }
};

