/**
 * Use Case:
 * For handling the large amount data, chat application streaming app,gamin application
 * Types of Stream
 * 
 * 1. Readable Stream:Streams from which we can read the data(http request,fs read stream), (Events:data,end)(function:pipe,read)
 * 2. Writable Stream: Streams from which we can write the data(http response,fs write stream), (Events:drain,finish)(function:write,end)
 * 3. Transform Stream: Stream that are readable and writeable( Web Socket connection)
 * 4. Duplex Stream: That transform data as both readble and writtable;
 */

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1
    // fs.readFile('./txt/input.txt', (err, data) => {
    //     if (err) return console.log(err);
    //     res.end(data)
    // })
    //Solution 2

    const readable = fs.createReadStream('./txt/input.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk)
    // })
    //  readable.on('end', chunk => {
    //      res.end();
    //  })
    //  readable.on('error', chunk => {
    //      console.log('something went wrong')
    //      res.statusCode = 500;
    //      res.end('file not found ')
    // })
    // Solution 3
    readable.pipe(res);

})

server.listen(4000, "127.0.0.1", () => {
    console.log('Server has started')
})
