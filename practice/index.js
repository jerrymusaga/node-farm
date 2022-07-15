const fs = require('fs')
const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
    const pathName = req.url ;
    if (pathName === '/' || pathName === '/overview'){
        res.end("this is OVERVIEW")
    }
    else if (pathName === '/products'){
        res.end("this is PRODUCTS")
    }
    else if (pathName === '/api'){
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err,data) => {
            const product_data = JSON.parse(data);
            res.writeHead(200, {
                'Content-type': 'application/json'
            })
            res.end(data);
        })
        
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('<h1>Page not found</h1>')
    }
    
})

const PORT = 8000 | "undefined"

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at Port ${PORT}`)
})