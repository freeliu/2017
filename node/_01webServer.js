const http = require('http')
const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world1\n')
});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`)
});
