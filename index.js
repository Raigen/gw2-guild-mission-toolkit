const http = require('http');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const serve = serveStatic('dist', {
    'index': ['index.html']
})

http.createServer((req, res) => {
    serve(req, res, (error) => {
        if (error) {
            console.log(error);
        }
    });
}).listen(80);
