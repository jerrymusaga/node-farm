const fs = require('fs')
const http = require('http');
const url = require('url');

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const temProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    return output;
}

const server = http.createServer((req,res) => {
    // const {pathName,query} = url.parse(req.url, true) ;
    const pathName = req.url
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {
            'Content-type':'text/html'
        })
        const cardsHtml = dataObj.map(el => replaceTemplate(card, el)).join('');
        const output = overview.replace('{%CARD%}', cardsHtml);
        res.end(output)
    }
    else if (pathName === '/product'){
        res.writeHead(200, {
            'Content-type':'text/html'
        })
        const product = dataObj[index.id];
        const output = replaceTemplate(temProduct, product)
        res.end(output)
    }
    else if (pathName === '/api'){
       
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
        
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