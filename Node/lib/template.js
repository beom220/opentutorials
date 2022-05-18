module.exports = {
    HTML: (title, list, body, control) => {
        if(!control) control = '';
        return `<!doctype html>
            <html lang="ko">
                <head>
                  <title>${title}</title>
                  <meta charset="utf-8">
                </head>
                <body> 
                  <h1><a href="/">WEB</a></h1>
                  <a href="/author">author</a>
                  ${list}
                  ${control}
                  ${body}
                </body>
            </html>`;
    },
    list: (topics) => {
        return `<ul>${topics?.map((topic) => `<li><a href="/?id=${topic.id}">${topic.title}</a></li>`).join('')}</ul>`;
    },
    authorSelect : (authors, author_id) => {
        let tag = '';
        let selected = '';
        authors.map((v, i)=>{
            if(v === author_id){
                selected = ' selected';
            }
            tag += `<option value="${v}" ${selected}>${authors[i].name}</option>`;
        })
        return `<select name="author">${tag}</select>`
    },
    authorTable: (authors) => {
        let tag = '<table>';
        authors.map((author, i) => {
            tag += `<tr>
                <td>${author.name}</td>
                <td>${author.profile}</td>
                <td>update</td>
                <td>delete</td>
            </tr>`
        })
        tag += '</table>';
        return tag;
    }
}
