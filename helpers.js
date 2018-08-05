module.exports = class Helpers {

	static promisifyQuery (conn, query) {
		return new Promise((resolve, rej) => {
			conn.query(query, (err, results) => resolve(results))
		})
	}

	static promisifyExecute(conn, query, params) {
		return new Promise((res, rej) => {
			conn.execute(query, params, (err, results) => res(results))
		})
	}
}