//Nodejs run on the V8 Engine
//NODEJS IS RUNTIME JAVASCRIPT
//V8 engine is written in C++
//REPL=> Read EVAL,PRINT LOOP
//window => global
//document=> process
//PROS
/**
//Event -driven, Non-blobking I/O
 * Perfect for building fast and scalble product
*USE CAES
Chat Application 
Gaming Application
Data Straming App
SQL->TABLE(SCHEMA BASED)
NOSQL-> COLLECTION(SCHEMA LESS)
 */
const fs = require('fs');
const http = require('http');

//Reading the File BLOCKING WAY
//const readText = fs.readFileSync('./txt/input.txt', 'utf-8');

//Writting the file
// const concatString = `We are writting input file . ${readText}`;

// fs.writeFileSync('./txt/output.txt', concatString);
// const readOutputText = fs.readFileSync('./txt/output.txt', 'utf-8');
// console.log(readOutputText)

//Read and write the file in NON BLOCKING way
// const readText = fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     console.log(data)
// });
// console.log('File Reading')
//CALBACK HELL
// fs.readFile('./txt/read-me.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/output.txt`, 'utf-8', (err, data2) => {
//         fs.writeFile('./txt/output.txt', `${data}\n${data2}`, (err, data) => {
//             console.log('file has been written')
//              fs.readFile('./txt/output.txt', 'utf-8', (err, data3) => {
//             console.log(data3)
//         })
//         })
//     })
// })

//HTTP MODULE
const data = fs.readFileSync(`${__dirname}/txt/data/data.json`, 'utf-8');
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('You are on the home page')
    } else if (pathName === '/product') {
        res.end('You are on the product page')
        
    } else if (pathName === '/api') {
        res.writeHead(200)
        res.end(data);

        
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header':"RAHUL"
        })
        res.end('<h1>This page is not found</h1>')
    }
    //res.end('response')
});
server.listen(4000, '127.0.0.1', () => {
    console.log('Server is started')
})




