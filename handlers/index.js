const { homeHandler } = require('./homeHandler')
const { staticFileHandler } = require('./staticFileHandler')
const { movieHandler } = require('./movieHandler')

module.exports = [homeHandler, staticFileHandler, movieHandler]