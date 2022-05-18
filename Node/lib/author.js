const db = require('./db');
const url = require('url');
const qs = require('querystring');
const template = require('./template');

exports.home = (request, response) => {
    db.query(`SELECT * FROM topic`, (error, topics) => {
        db.query(`SELECT * FROM author`, (error2, authors) => {
            if(error2) console.log( error2);
            const title = 'author';
            const list = template.list(topics);
            const style = `<style>table{border-collapse:collapse;}td{padding:8px 12px;border:1px solid #eee}</style>`;
            const body = `
                ${style}
                ${template.authorTable(authors)}
                <a href="/create">create</a>
                <form action="/author/create_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="profile" placeholder="profile"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `
            const html = template.HTML(title, list, body);
            response.writeHead(200);
            response.end(html);
        })
    })
}

exports.create_process = (request, response) => {
    let body = '';
    request.on('data', data => {
        body += data;
    })
    request.on('end', () =>{
        const post = qs.parse(body);
        db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`, [post.name, post.profile], (error, result) => {
            if(error) throw error;
            response.writeHead(302, {Location : '/author'});
            response.end();
        })
    })
}

exports.update = (request, response) => {
    db.query(`SELECT * FROM topic`, (error, topics) => {
        if(error) throw error;
        const _url = request.url;
        const queryData = url.parse(_url, true).query;
        db.query(`SELECT * FROM author`, [queryData.id],(error2, authors) => {
            if(error2) throw error2;
            db.query(`SELECT * FROM author WHERE id=?`, [queryData.id],(error3, author) => {
                if(error3) throw error3;
                const title = author[0].name;
                const list = template.list(topics);
                const style = `<style>table{border-collapse:collapse;}td{padding:8px 12px;border:1px solid #eee}</style>`;
                const body = `
                    ${style}
                    ${template.authorTable(authors)}
                    <form action="/author/update_process" method="post">
                        <p><input type="hidden" name="id" value="${queryData.id}" ></p>
                        <p>
                            <input type="text" name="name" placeholder="name" value="${author[0].name}">
                        </p>
                        <p>
                            <textarea name="profile" placeholder="profile">${author[0].profile}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                `;
                const html = template.HTML(title, list, body, null);
                response.writeHead(200);
                response.end(html);
            })
        })
    })
}

exports.update_process = (request, response) => {
    let body ='';
    request.on('data', data => body += data)
    request.on('end', () => {
            const post = qs.parse(body);
            const id = post.id;
            const name = post.name;
            const profile = post.profile;

            db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, [name, profile, id], (error, result) => {
                if(error) throw error;
                response.writeHead(302, {Location : '/author'});
                response.end();
            })
    });
}

exports.delete_process = (request, response) => {
    let body ='';
    request.on('data', data => body += data)
    request.on('end', () => {
        const post = qs.parse(body);
        const id = post.id;
        // 저자의 글목록 삭제
        db.query(`DELETE FROM topic WHERE author_id=?`, [id], (error, result) =>{
            if(error) throw error;
            // 저자 삭제
            db.query(`DELETE FROM author WHERE id=?`, [id], (error2, result2) => {
                if(error2) throw error2;
                response.writeHead(302, {Location : '/author'});
                response.end();
            })
        })
    });
}