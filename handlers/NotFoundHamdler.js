const { getResponse } = require('./responseHandler') 

function notFoundHandler(req, res) {
	if(req.method === "GET") {
		getResponse('./views/404.html', res)
		return true
	}
}

module.exports = { notFoundHandler }