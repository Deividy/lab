http = require('http')
io = require('socket.io')
fs = require('fs')
jade = require('jade')

app = http.createServer (req, res) ->
    res.writeHead(200)
    index = fs.readFileSync('index.jade', 'utf-8')
    compile = jade.compile(index)

    res.end compile({ hey: "123" })
   
app.listen(8000)
io = io.listen(app)

clients = [ ]

io.sockets.on 'connection', (socket) ->
    clients.push socket
    for client in clients
        client.emit('news', { hello: "world !" })
    
    socket.on 'my other event', (data) ->
        console.log data
