const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function(request,response){
    let _url = request.url;
    // Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const queryData = url.parse(_url, true).query;
    let title = queryData.id;

    console.log(queryData);
    if(_url == '/'){
        title = 'WelCome'
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);

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
        return response.end(templete);
    })
});
app.listen(3000);