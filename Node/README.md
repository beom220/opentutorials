# Node with mySQL


## Start Server 
`node main.js`
***
### URL 구조 </br>
![img.png](img.png)

+ ### DB connect
```javascript
const mysql = require("mysql");
const db = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : '',
    port : 3306,
});
db.connect();
module.exports = db;
```

+ ### data 추가 
```javascript
db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, Now(), ?)`,
  [title, description, auth],
  (error, result) => {
    if (error) throw error;
    response.writeHead(302, {Location: `/?id=${result.insertId}`});
    response.end();
  }
)
```
***
+ ### data 업데이트
```javascript
db.query(`UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`, [title, description, id], (error, result)=>{
  if(error) throw error;
  response.writeHead(302, {Location: `/?id=${id}`});
  response.end();
})
```
***
+ ### data 삭제 
```javascript
db.query(`DELETE FROM topic WHERE id = ?`, [id], (error, result) => {
  if(error) throw error;
  response.writeHead(302, {Location: '/'});
  response.end();
});
```
***
## Security
- ### Issue 입력정보에 대한 보안</br>

```javascript
db.query(`DELETE FROM topic WHERE id = ?`, [id], () => {...})
// 쿼리문 안에 입렵값을 넣지 않고, 파라미터로 값을 넘김으로서 queryString을 통한 sql-injection 보안
```
