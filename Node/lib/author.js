const db = require('./db');
const template = require('./template');

exports.home = (request, response) => {
    db.query(`SELECT * FROM topic`, (error, topics) => {
        db.query(`SELECT * FROM author`, (error2, authors) => {
            if(error2) console.log( error2);
            const title = 'author';
            const list = template.list(topics);
            const body = `
                ${template.authorTable(authors)}
                <a href="/create">create</a>
                <form action="/author/create_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description"></textarea>
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