const fs = require('fs')


const getFileType = (path) => {
	const fileType = path.split('.').pop()
	switch (fileType) {
		case 'ico':
			return 'image/x-icon'
		case 'css':
			return 'text/css'
		case 'png':
			return 'image/png'	
		default:
			return 'text/html'
	}
}

const getResponse =  (path, res) => {
	fs.readFile(path, (err, data) => {
		if(err){
			console.log(err)
			return
		}
		res.writeHead(200, {
			'Content-Type': getFileType(path)
		})
		res.write(data)
		res.end()
	})
	return true
}

module.exports = { getResponse }