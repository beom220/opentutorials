const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const template = require('./lib/template');
const sanitizeHtml = require('sanitize-html');
const db = require('./lib/db');
const topic = require('./lib/topic')

const app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;


    if(pathName === '/'){
        if(!queryData.id){ // index일 때 queryString의 값이 undefinded
            topic.home(request, response);
        }
        if(queryData.id){
            topic.page(request, response);
        }
    } else if(pathName === '/create'){
        topic.create(request, response);
    } else if(pathName === '/create_process'){
        topic.create_process(request,response);
    } else if (pathName === '/update'){
        topic.update(request,response);
    } else if (pathName === '/update_process'){
        topic.update_process(request,response);
    } else if (pathName === '/delete_process'){
        topic.delete_process(request,response);
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);