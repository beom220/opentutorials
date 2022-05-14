const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

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
          <a href="/create">create</a>
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

    console.log(pathName);

    if(pathName === '/'){
        if(!queryData.id){ // index일 때 queryString의 값이 undefinded
            return fs.readdir(_dir, (err, filelist) => {
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
            return fs.readdir(_dir, (err, filelist) => {
                fs.readFile(`./data/${queryData.id}`, 'utf8', (err, data) => {
                    let title = queryData.id;
                    let list = templateList(filelist);
                    const body = `<h2>${title}</h2><p>${data}</p>`;
                    const template = templateHTML(title, list, body);
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else if(pathName === '/create'){
        return fs.readdir(_dir, (err, filelist) => {
            let title  = 'Web - Create';
            let list = templateList(filelist);
            const body = `
            <form action="http://localhost:3000/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
            </form>`;
            const template = templateHTML(title, list, body);
            response.writeHead(200);
            response.end(template);
        })
    } else if(pathName === '/create_process'){
        // post data 받는 작업, body += data;
        let body = '';
        request.on('data', (data) => {
            body += data;
            /* Note
                data 양이 너무 많을경우 접속을 끊어버림 (보안장치)
                if(body.length > 1e6) request.connection.destroy();
             */
        })
        request.on('end', () => {
            // post data 처리 후 작업
            const post = qs.parse(body);
            const title = post.title;
            const description = post.description;
            // 파일 생성
            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                if(err) throw err;
                else {
                    // Note 302는 리다이렉션을 뜻한다
                    // 성공하면 생성된 페이지로 이동
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                }
            })
        })


    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);