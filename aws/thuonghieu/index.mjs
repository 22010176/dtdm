import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: 'database-1.crgoksss2xav.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'btl',
});

async function _get(event, context) {
  const [results, fields] = await connection.query("SELECT * FROM btl.thuonghieu;");

  const response = {
    statusCode: 200,
    body: JSON.stringify(results),
  };

  return response;
}

async function _post(event, context) {
  return { body: "POST", event }
}

async function _delete(event, context) {
  return { body: "DELETE", event }

}

export default async function thuongHieuRoute(event, context) {
  switch (event['http-method']?.toLowerCase()) {
    case "get": return await _get(event, context);
    case "post": return await _post(event, context);
    case "delete": return await _delete(event, context);
  }

  return { body: "Error", event }
};

