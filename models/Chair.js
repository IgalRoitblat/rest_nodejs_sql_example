var Helpers = require('../Helpers');

module.exports = class Chair {

	constructor(name, colorId, conn) {
		this.name = name;
		this.colorId = colorId;
		this.conn = conn;
	}

	postShow() {
		return this.post()
		.then(() => this.constructor.getAll(this.conn))
	}

	post() {
		return Helpers.promisifyExecute(this.conn, `
			INSERT INTO chairs (name, color_id) VALUES (?, ?);
		`, [this.name, this.colorId])
	}

	static delete(conn, id) {
		return Helpers.promisifyExecute(conn, `
			DELETE FROM chairs WHERE chairs.id = ?;
		`, [id])
	}

	static update(conn, id, name, color) {
		return Helpers.promisifyExecute(conn, `
			UPDATE chairs SET name = ?, color_id = ? WHERE chairs.id = ?;
		`, [name, color, id])
	}

	static getAll (conn) {
		return Helpers.promisifyQuery(conn, `
			SELECT chairs.name, colors.name as color 
			FROM chairs
			JOIN colors on colors.id = chairs.color_id
			LIMIT 100
		`)
	}

	static search (conn, searchParam) {
		return Helpers.promisifyExecute(conn, `
			SELECT chairs.name, colors.name as color 
			FROM chairs
			JOIN colors on colors.id = chairs.color_id
			WHERE chairs.name = ?
			LIMIT 100
		`, [searchParam])
	}

	static getOne (conn, searchParam) {
		return Helpers.promisifyExecute(conn, `
			SELECT chairs.name, colors.name as color 
			FROM chairs
			JOIN colors on colors.id = chairs.color_id
			WHERE chairs.id = ?
			LIMIT 100
		`, [searchParam])
	}
}