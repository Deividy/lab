http = require 'http'
fs = require 'fs'

http.createServer((request, response) ->
	newFile = fs.createWriteStream("copy.md")
	fileBytes = request.headers['content-length']
	uploadedBytes = 0
	
	request.pipe(newFile)
	request.on('data', (chunk) ->
		uploadedBytes += chunk.length;
		progress = (uploadedBytes / fileBytes) * 100
		console.log "Progress" + progress
	)
).listen(8000)
