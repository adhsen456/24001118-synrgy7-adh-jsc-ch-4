const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_PATH = path.join(__dirname, '../public');
// console.log(PUBLIC_PATH);
const PORT = process.env.PORT || 8888;

const getHTML = (fileName) => {
    const filePath = path.join(PUBLIC_PATH, fileName);
    // return fs.readFileSync(filePath, 'utf-8')
    return fs.readFileSync(filePath);
}

const pageRouter = (req, res) => {
    // const { url } = req;
    switch (req.url) {
        case '/':
            // res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            // console.log(getHTML('index.html'));
            res.end(getHTML('index.html'));
            return;
        default:
            break;
    }
}

const server = http.createServer(pageRouter);
server.listen(PORT, 'localhost', () => {
    console.log(`Server connected on port ${PORT}`);
});