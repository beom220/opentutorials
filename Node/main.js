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

    const templete = `<!doctype html>
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
  <p>
    Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language. Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.
  </p>
</body>
</html>`

    response.end(templete);

});
app.listen(3000);