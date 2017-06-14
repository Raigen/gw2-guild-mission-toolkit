const http = require('http');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const serveStatic = require('serve-static');

const port = process.env.PORT || 8080;
const serve = serveStatic('dist', {
    'index': ['index.html']
})

function startServer() {
    process.stdout.write('Server is starting..\n')
    http.createServer((req, res) => {
        serve(req, res, (error) => {
            if (error) process.stderr.write(error)
        });
    }).listen(port, err => {
        if (!err) process.stdout.write(`server started at port ${port}\n`)
        else throw err;
    });
}

process.stdout.write('fetching floor map and waypoints\n')
fetch('https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1&lang=de')
    .then(res => res.body.pipe(fs.createWriteStream(path.resolve('./dist/map_floor.json'))))
    .then(() => process.stdout.write('fetch done\n') && null)
    .then(() => startServer())
    .catch(err => process.stderr.write(`error while starting server: ${err}\n`))
