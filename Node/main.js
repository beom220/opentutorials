const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function(request,response){
    let _url = request.url;

    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;
    let title = queryData.id;

    if(pathName === '/'){
        fs.readFile(`./data/${title}.txt`, 'utf-8', (err, data) => {
            const templete = `
            <!doctype html>
            <html>
                <head>
                  <title>${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  <ol>
                    <li><a href="?id=HTML">HTML</a></li>
                    <li><a href="?id=CSS">CSS</a></li>
                    <li><a href="?id=JavaScript">JavaScript</a></li>
                  </ol>
                  <h2>${title}</h2>
                  <p>${data}</p>
                </body>
            </html>`;
            response.writeHead(200);
            response.end(templete);
        })
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }

});
app.listen(3000);