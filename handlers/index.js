const { homeHandler } = require('./homeHandler')
const { staticFileHandler } = require('./staticFileHandler')

module.exports = [homeHandler, staticFileHandler]