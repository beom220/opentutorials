module.exports = {
    HTML: (title, list, body, control, authStatusUI) => {
        if(!control) control = '';
        if(!list) list = '';
        return `<!doctype html>
            <html lang="ko">
                <head>
                  <title>${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                    ${authStatusUI}
                    <h1><a href="/">WEB</a></h1>
                    <a href="/author">author</a>
                    ${list}
                    ${control}
                    ${body}
                </body>
            </html>`;
    },
    list: (topics) => {
        return `<ul>${topics?.map((topic) => `<li><a href="/topic/${topic.id}">${topic.title}</a></li>`).join('')}</ul>`;
    },
    authorTable: (authors) => {
        let tag = '<table>';
        authors.map((author, i) => {
            tag += `<tr>
                <td>${author.name}</td>
                <td>${author.profile}</td>
                <td><a href="/author/update/${author.id}">update</a></td>
                <td>
                    <form action="/author/delete_process" method="post">
                        <input type="hidden" name="id" value="${author.id}">
                        <input type="submit" value="delete">
                    </form>
                </td>
            </tr>`
        })
        tag += '</table>';
        return tag;
    }
}
