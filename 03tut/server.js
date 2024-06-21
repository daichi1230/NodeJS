const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter()

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let filePath;

    if (req.url === '/'  || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        path = path.join(__dirname, views, index.html)
        fs.readFile(path, 'utf8', (err, data) => {
            res.end(data)
        })
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted')
}, 2000)