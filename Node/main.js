const http = require('http');
const fs = require('fs');
const url = require('url');

const templateHTML = (title, list, body) => {
    return `<!doctype html>
    <html lang="ko">
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
        </head>
        <body> 
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${body}
        </body>
    </html>`;
}
const templateList = (filelist) => {
    return `<ul>${filelist?.map((file)=>`<li><a href="/?id=${file}">${file}</a></li>`).join('')}</ul>`;
}

const app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;
    const _dir = './data';

    if(pathName === '/'){
        if(!queryData.id){ // index일 때 queryString의 값이 undefinded
            fs.readdir(_dir, (err, filelist) => {
                let title  = 'WelCome';
                let data = 'Hello, NodeJs';
                let list = templateList(filelist);
                const body = `<h2>${title}</h2><p>${data}</p>`;
                const template = templateHTML(title, list, body);
                response.writeHead(200);
                response.end(template);
            })
        }
        if(queryData.id){ //
            fs.readdir(_dir, (err, filelist) => {
                fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, data) => {
                    let title = queryData.id;
                    let list = templateList(filelist);
                    const body = `<h2>${title}</h2><p>${data}</p>`;
                    const template = templateHTML(title, list, body);
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);