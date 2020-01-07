const htpp = require('http');
const url = require('url')
const port = 3333
const { notFoundHandler } = require('./handlers/NotFoundHamdler')
const handlers =  require('./handlers')
 
htpp.createServer((req, res) => {
	req.path = url.parse(req.url).pathname
	let foundPage = false
	for (const handler of handlers) {
		if(handler(req, res)) {
			foundPage = true
			break
		}
	}

	if(!foundPage) {
		notFoundHandler(req, res)
	}
}).listen(port)

console.log(`Server running at http://localhost:${port}`)