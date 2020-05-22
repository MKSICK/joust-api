const mysql = require('mysql')

function promiseSQL(connection, query, inserts) {
	return new Promise((resolve, reject) => {
		connection.query(query, inserts, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	})
}

function createConnection()
{
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        charset: 'utf8'
      });
    return connection;
}

module.exports = {
    createConnection,
    promiseSQL
}