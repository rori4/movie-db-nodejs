
const { getResponse } = require('./responseHandler') 

const staticFileHandler = (req, res) => {
	if(req.path.startsWith('/public') && req.method === "GET") {
		getResponse(`.${req.path}`, res)
		return true
	}
}

module.exports = { staticFileHandler }