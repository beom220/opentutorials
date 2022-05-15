const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const template = require('./lib/template');
const sanitizeHtml = require('sanitize-html');

const app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;
    const _dir = './data';

    if(pathName === '/'){
        if(!queryData.id){ // index일 때 queryString의 값이 undefinded
            fs.readdir(_dir, (err, filelist) => {
                const title  = 'WelCome';
                const data = 'Hello, NodeJs';
                const list = template.list(filelist);
                const body = `<h2>${title}</h2><p>${data}</p>`;
                const html = template.HTML(title, list, body, null);
                response.writeHead(200);
                response.end(html);
            })
        }
        if(queryData.id){
            fs.readdir(_dir, (err, filelist) => {
                const filteredId = path.parse(queryData.id).base;
                fs.readFile(`./data/${filteredId}`, 'utf-8', (err, data) => {
                    const title = queryData.id;
                    const sanitizedTitle = sanitizeHtml(title);
                    const sanitizedData = sanitizeHtml(data, {allowedTags: ['h2']});
                    const list = template.list(filelist);
                    const body = `<h2>${sanitizedTitle}</h2><p>${sanitizedData}</p>`;
                    const control = `
                        <a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}"/>
                            <input type="submit" value="delete"/>
                        </form>
                    `;
                    const html = template.HTML(title, list, body, control);
                    response.writeHead(200);
                    response.end(html);
                })
            })
        }
    } else if(pathName === '/create'){
        fs.readdir(_dir, (err, filelist) => {
            const title  = 'Web - Create';
            const list = template.list(filelist);
            const body = `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"/></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit"/>
                </p>
            </form>`;
            const html = template.HTML(title, list, body, null);
            response.writeHead(200);
            response.end(html);
        })
    } else if(pathName === '/create_process'){
        // post data 받는 작업, body += data;
        let body = '';
        request.on('data', (data) => {
            body += data;
            // Note data 양이 너무 많을경우 접속을 끊어버림 (보안장치)
            if(body.length > 1e6) request.connection.destroy();
        })
        request.on('end', () => {
            // post data 처리 후 작업
            const post = qs.parse(body);
            const title = post.title;
            const description = post.description;

            // 파일 생성
            fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
                if(err) throw err;
                else {
                    // Note 302는 리다이렉션을 뜻한다
                    // 성공하면 생성된 페이지로 이동
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                }
            })
        })
    } else if (pathName === '/update'){
        fs.readdir(_dir, (err, filelist) => {
            const filteredId = path.parse(queryData.id).base;
            fs.readFile(`./data/${filteredId}`, 'utf-8', (err, data) => {
                const title = queryData.id;
                const list = template.list(filelist);
                const sanitizedTitle = sanitizeHtml(title);
                const sanitizedData = sanitizeHtml(data, {allowedTags: ['h2']});
                const body = `
                    <form action="/update_process" method="post">
                        <!--선택한 파일 정보-->
                        <input type="hidden" name="id" value="${sanitizedTitle}"/>
                        <p><input type="text" name="title" placeholder="title" value="${sanitizedTitle}"/></p>
                        <p>
                          <textarea name="description" placeholder="description">${sanitizedData}</textarea>
                        </p>
                        <p>
                          <input type="submit"/>
                        </p>
                    </form>`;
                const html = template.HTML(title, list, body, null);
                response.writeHead(200);
                response.end(html);
            })
        })
    } else if (pathName === '/update_process'){
        let body = '';
        request.on('data', (data) => {
            body += data;
        })
        request.on('end', () => {
            const post = qs.parse(body);
            const id = post.id;
            const title = post.title;
            const description = post.description;
            const sanitizedId = sanitizeHtml(id);
            const sanitizedTitle = sanitizeHtml(title);
            const sanitizedDescription = sanitizeHtml(description, {allowedTags: ['h2']});
            // 이전제목을 새로운 제목으로 바꾼다
            fs.rename(`data/${sanitizedId}`, `data/${sanitizedTitle}`, (err) => {
                if(err) throw err;
                else {
                    // 내용을 업데이트 한다
                    fs.writeFile(`data/${sanitizedTitle}`, sanitizedDescription, 'utf-8', (err) => {
                        if (err) throw err;
                        else {
                            response.writeHead(302, {Location: `/?id=${sanitizedTitle}`});
                            response.end();
                        }
                    })
                }
            })
        })
    } else if (pathName === '/delete_process'){
        let body = '';
        request.on('data', (data) => {
            body += data;
        })
        request.on('end', () => {
            const post = qs.parse(body);
            const id = post.id;
            const filteredId = path.parse(id).base;
            // 파일 삭제
            fs.unlink(`data/${filteredId}`, (err) => {
                if (err) throw err;
                else {
                    response.writeHead(302, {Location: '/'});
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