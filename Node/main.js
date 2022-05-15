const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const template = require('./lib/template');
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');

// mySQL 연결
const db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'node',
    password : 'qwer1234',
    database : 'node',
    port : 3306,
});
db.connect();

const app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;
    const _dir = './data';

    if(pathName === '/'){
        if(!queryData.id){ // index일 때 queryString의 값이 undefinded
            // language=SQL format=false
            db.query(`SELECT * FROM topic`, (error, topics) =>{
                const title  = 'WelCome';
                const data = 'Hello, NodeJs';
                const list = template.list(topics);
                const body = `<h2>${title}</h2><p>${data}</p>`;
                const html = template.HTML(title, list, body, null);
                response.writeHead(200);
                response.end(html);
            })
        }
        if(queryData.id){
            db.query(`SELECT * FROM topic`, (error, topics) =>{
                if(error) throw error;
                db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], (error2, topic) =>{
                    if(error2) throw error2;
                    const title  = topic[0].title;
                    const data = topic[0].description;
                    const list = template.list(topics);
                    const body = `<h2>${title}</h2><p>${data}</p>`;
                    const control = `
                        <a href="/create">create</a> <a href="/update?id=${queryData.id}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${queryData.id}"/>
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
        db.query(`SELECT * FROM topic`, (error, topics) =>{
            if(error) throw error;
            const title  = 'Web - Create';
            const list = template.list(topics);
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

            db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, Now(), ?)`,
                [title, description, 1],
                (error, result) => {
                    if (error) throw error;
                    response.writeHead(302, {Location: `/?id=${result.insertId}`});
                    response.end();
                }
            )
        })
    } else if (pathName === '/update'){
        db.query(`SELECT * FROM topic`, (error, topics) =>{
            if(error) throw error;
            db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], (error2, topic) => {
                if(error2) throw error2;
                const title = topic[0].title;
                const list = template.list(topics);
                const body = `
                    <form action="/update_process" method="post">
                        <!--선택한 파일 정보-->
                        <input type="hidden" name="id" value="${topic[0].id}"/>
                        <p><input type="text" name="title" placeholder="title" value="${title}"/></p>
                        <p>
                          <textarea name="description" placeholder="description">${topic[0].description}</textarea>
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

            db.query(`UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`, [title, description, id], (error, result)=>{
                if(error) throw error;
                response.writeHead(302, {Location: `/?id=${id}`});
                response.end();
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

            db.query(`DELETE FROM topic WHERE id = ?`, [id], (error, result) => {
                if(error) throw error;
                response.writeHead(302, {Location: '/'});
                response.end();
            });
        })
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);