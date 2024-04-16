/**
 * HOW WEB SERVER WORKS:
 * 1. Dns Lookup:<https:<ip_address>:port_number(default port number for http:80,https:443)
 * 2. TCP/IP (Responsoble for transfering our data)
 * 3. HTTP Request(http method+request-target+http version)
 * 4. HTTP RESPONSE(http version+status code+status message)
 * Status CODE
 * 200: Success
 * 404-> Not found 
 * 400/422-> Bad request
 * 443-> Forbidden
 * 409-> Duplicate
 * 500-> Internal error
 * 522/523-> Server down
 * 
 * DOMAIn PROVIDER: Namecheap, godady, hostinger, name.com,
 * 
 * 
 * NODE JS ARCHITECTURE:
 * V8 : Runtime js code to machine code
 * Libuv:Hnadle the computational task and fs , crypto modle, url, http module
 * 1. EVENT LOOP => Where we are using call back function , it will go inside the event loop
 *    EVENT LOOP:
 *    1. setTimeout
 *    2. I/O Polling
 *     3.setImmidiate
 *    4. Heavy computtational
 * 
 * Special Type
 *    5. NextTick
 *    6. Task Queue(Promise resolve)
 *  Nodejs also offer 4 more default child thread (THREADPOOL)
 *   You can extend it upto 128 child thread
 * Event loop1-> settimeout, fs,setImmidiat
 * event loop2:
 */

const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;
setTimeout(() => console.log('Timer 1 finished'), 0);//
fs.readFile(`${__dirname}/txt/read-me.txt`, () => { //I/O Polling operation
    console.log('I/O Polling is finished');
    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immidiate finished 2 '));
process.nextTick(() => console.log('Process NextTick 2 is calling'))

    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now()-start , 'Password encrypted');
      crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    crypto.pbkdf2Sync("password", "salt", 100000, 1024, 'sha512');
    console.log(Date.now()-start , 'Password encrypted');
})
setImmediate(() => console.log('Immidiate finished '));
process.nextTick(() => console.log('Process NextTick is calling'));



console.log('Top level');
/**
 * Top level
 * Process NextTick is calling
 * Timer 1 finished
 * Immidiate finished 
 * I/O Polling is finished
 * Process NextTick 2 is calling
 * Immidiate finished 2
 * Timer 2 finished
 * Timer 3 finished
 */