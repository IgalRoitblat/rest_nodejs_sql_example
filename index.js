var express = require('express');
var app = express();
var mysql = require('mysql2')
var fs = require('fs')
var util = require('util')
var Table = require('./models/Table')
var Chair = require('./models/Chair')

var bodyParser = require('body-parser').json();
app.use(bodyParser);
app.use(express.static('public'))

var conn = mysql.createConnection({
	user: "root", 
	password: "root", 
	host: "localhost",
	port: '8889', 	
	database: "furniture", 
})

app.get('/', (req, res) => {
	Promise.all([Table.getAll(conn), Chair.getAll(conn)]).then(results => {
		res.send(JSON.stringify({tables:[...results[0]], chairs:[...results[1]]}))
	})
})

app.get('/tables', (req, res) => {
	var promise = Table.getAll(conn)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

app.get('/tables/:id', (req, res) => {
	var promise = Table.getOne(conn, req.params.id)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

app.get('/chairs', (req, res) => {
	var promise = Chair.getAll(conn)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

app.get('/chairs/:id', (req, res) => {
	var promise = Chair.getOne(conn, req.params.id)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

.post('/tables/search', (req, res) => {
	Table.search(conn, req.body.name)
	.then(results => {
		res.send(JSON.stringify(results))
	}) 
})

.post('/chairs/search', (req, res) => {
	Chair.search(conn, req.body.name)
	.then(results => {
		res.send(JSON.stringify(results))
	}) 
})

.post('/tables', (req, res) => {
	let table = new Table(req.body.name, req.body.colorId, conn);
	table.postShow()
	.then(results => {
		res.send(JSON.stringify(results))
	}) 
})

.post('/chairs', (req, res) => {
	let chair = new Chair(req.body.name, req.body.colorId, conn);
	chair.postShow()
	.then(results => {
		res.send(JSON.stringify(results))
	}) 
})

.delete('/chairs/:id', (req, res) => {
	var promise = Chair.delete(conn, req.params.id)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

.delete('/tables/:id', (req, res) => {
	var promise = Table.delete(conn, req.params.id)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

.put('/tables/:id', (req, res) => {
	var promise = Table.update(conn, req.params.id, req.body.name, req.body.colorId)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})

.put('/chairs/:id', (req, res) => {
	var promise = Chair.update(conn, req.params.id, req.body.name, req.body.colorId)
	promise.then(results => {
		res.send(JSON.stringify(results))
	})
	.catch(err => {throw new Error(err)})
})
.listen(3000, () => console.log('listen'))