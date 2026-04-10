const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = 8080;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.b3dm': 'application/octet-stream',
    '.pnts': 'application/octet-stream',
    '.bin': 'application/octet-stream',
    '.osgb': 'application/octet-stream'
};

function send(res, statusCode, body, contentType) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType || 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(body);
}

const server = http.createServer((req, res) => {
    let requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (requestPath === '/') {
        requestPath = '/平台代码/scene.html';
    }

    const safeRelativePath = requestPath.replace(/^\/+/, '');
    let filePath = path.resolve(root, safeRelativePath);

    if (!filePath.startsWith(root)) {
        send(res, 403, 'Forbidden');
        return;
    }

    fs.stat(filePath, (statError, stats) => {
        if (statError) {
            send(res, 404, 'Not Found');
            return;
        }

        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        fs.readFile(filePath, (readError, data) => {
            if (readError) {
                send(res, 404, 'Not Found');
                return;
            }

            const extension = path.extname(filePath).toLowerCase();
            send(res, 200, data, mimeTypes[extension] || 'application/octet-stream');
        });
    });
});

server.listen(port, () => {
    console.log(`STATIC_SERVER_READY http://127.0.0.1:${port}`);
});