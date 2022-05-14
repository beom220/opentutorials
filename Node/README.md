# Node.js



## Start Server 
`node main.js`
***
### URL 구조 </br>
![img.png](img.png)

+ ### URL로 입력된 값 사용하기</br>
```javascript
const url = require('url');
const queryData = url.parse(_url, true).query;
````
***
+ ### post data 받는 작업
```javascript
let body = '';
request.on('data', (data) => {
    body += data;
    /* Note
        data 양이 너무 많을경우 접속을 끊어버림 (보안장치)
        if(body.length > 1e6) request.connection.destroy();
     */
})
```
***
+ ### post data 처리 후 작업
```javascript
const qs = require('querystring');
request.on('end', () => {
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
```
***
