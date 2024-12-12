const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
const { exec } = require('child_process')

const dev = process.env.NODE_ENV !== 'production'
//const hostname = 'localhost';
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	createServer(async (req, res) => {
		try {
			const parsedUrl = parse(req.url, true)
			const { pathname, query } = parsedUrl

			if (pathname === '/') {
				await app.render(req, res, '/index', query)
			} else if (pathname === '/about') {
				await app.render(req, res, '/about', query)
			} else if (pathname === '/contacts') {
				await app.render(req, res, '/contacts', query)
			} else if (pathname === '/services') {
				await app.render(req, res, '/services', query)
			} else if (pathname === '/products') {
				await app.render(req, res, '/products', query)
			} else if (pathname === '/partners') {
				await app.render(req, res, '/partners', query)
			} else {
				await handle(req, res, parsedUrl)
			}
		} catch (err) {
			console.error('Произошла ошибка при обработке', req.url, err)
			res.statusCode = 500
			res.end('Внутренняя ошибка сервера')
		}
	}).listen(port, err => {
		if (err) throw err
		console.log(`> Готово на http://${hostname}:${port}`)
	})
})
