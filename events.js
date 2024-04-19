/**
 * EVENT DRIVEN ARCHITECTURE
 * 
 * EVENT EMitter-emit event>listener function -> call back function
 * createServer is the instance of EventEmitter
 */
const EventEmitter = require('events');
const http = require('http');

class Chat extends EventEmitter{
    constructor() {
        super();
    }
}
const myEmitter = new Chat();

//Listener function
myEmitter.on('new', () => {
    console.log('Events is trigger')
})
myEmitter.on('new', () => {
    console.log('Another Events is trigger')
})
myEmitter.on('new', (stock) => {
    console.log('Here is our stock: '+stock)
})
//Event Emit
myEmitter.emit('new', 9)

const server = http.createServer();

server.on('request', (req,res) => {
    console.log("Request Received");
    console.log(req.url)
res.end('Request Received')
})
server.on('request', (req,res) => {
    console.log("Another Request Received");
    console.log(req.url)

})
server.on('close', () => {
    console.log('server is closed')
})
server.listen(4000, "127.0.0.1", () => {
    console.log('Waiting for response')
})
