var Helpers = require('../Helpers');

module.exports = class Table {
	
	constructor(name, colorId, conn) {
		this.name = name;
		this.colorId = colorId;
		this.conn = conn;
	}

	postShow() {
		return this.post()
		.then(() => this.constructor.getAll(this.conn))
	}

	static delete(conn, id) {
		return Helpers.promisifyExecute(conn, `
			DELETE FROM tables WHERE tables.id = ?;
		`, [id])
	}

	static update(conn, id, name, color) {
		return Helpers.promisifyExecute(conn, `
			UPDATE tables SET name = ?, color_id = ? WHERE tables.id = ?;
		`, [name, color, id])
	}

	post() {
		return Helpers.promisifyExecute(this.conn, `
			INSERT INTO tables (name, color_id) VALUES (?, ?);
		`, [this.name, this.colorId])
	}

	static getAll (conn) {
		return Helpers.promisifyQuery(conn, `
			SELECT tables.name, colors.name as color 
			FROM tables
			JOIN colors on colors.id = tables.color_id
			LIMIT 100
		`)
	}

	static getOne (conn, searchParam) {
		return Helpers.promisifyExecute(conn, `
			SELECT tables.name, colors.name as color 
			FROM tables
			JOIN colors on colors.id = tables.color_id
			WHERE tables.id = ?
			LIMIT 100
		`, [searchParam])
	}

	static search (conn, searchParam) {
		return Helpers.promisifyExecute(conn, `
			SELECT tables.name, colors.name as color 
			FROM tables
			JOIN colors on colors.id = tables.color_id
			WHERE tables.name = ?
			LIMIT 100
		`, [searchParam])
	}
}
