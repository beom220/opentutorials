const http = require('http');
const url = require('url');
const db = require('./lib/db');
const topic = require('./lib/topic');
const author = require('./lib/author');

const app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query; // Note Node.js에서 URL을 통해서 입력된 값을 사용하는 방법
    const pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
        // index일 때 queryString의 값이 undefinded
        if(!queryData.id) topic.home(request, response);
        if(queryData.id) topic.page(request, response);
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
    } else if (pathName === '/author'){
        author.home(request,response);
    } else if (pathName === '/author/create_process'){
        author.create_process(request,response);
    } else {
        response.writeHead(404); // Note 404 === page not found
        response.end('Not found');
    }
});
app.listen(3000);