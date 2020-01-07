const { getResponse } = require('./responseHandler') 

const homeHandler = (req, res) => {
	if(req.path === '/' && req.method === 'GET') {
		getResponse(`./views/home.html`, res)
		return true
	}
}

module.exports = { homeHandler }