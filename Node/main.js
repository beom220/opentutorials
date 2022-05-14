const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function(request,response){
    const _url = request.url;

    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;
    const _dir = './data';

    if(pathName === '/'){
        if(!queryData.id){
            fs.readdir(_dir, (err, filelist) => {
                let title  = 'WelCome';
                let data = 'Hello, NodeJs';
                let list = '<ul>';
                let i = 0;
                while(i < filelist.length){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i += 1;
                }
                list += '</ul>';

                const templete = `
                <!doctype html>
                <html>
                    <head>
                      <title>${title}</title>
                      <meta charset="utf-8">
                    </head>
                    <body> 
                      <h1><a href="/">WEB</a></h1>
                      ${list}
                      <h2>${title}</h2>
                      <p>${data}</p>
                    </body>
                </html>`;
                response.writeHead(200);
                response.end(templete);
            })
        }
        if(queryData.id){
            fs.readdir(_dir, (err, filelist) => {
                let list = '<ul>';
                let i = 0;
                while (i < filelist.length) {
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i += 1;
                }
                list += '</ul>';

                fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, data) => {
                    let title = queryData.id;

                    const templete = `
                        <!doctype html>
                        <html>
                            <head>
                              <title>${title}</title>
                              <meta charset="utf-8">
                            </head>
                            <body> 
                              <h1><a href="/">WEB</a></h1>
                              ${list}
                              <h2>${title}</h2>
                              <p>${data}</p>
                            </body>
                        </html>`;
                    response.writeHead(200);
                    response.end(templete);
                })
            })
        }
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);