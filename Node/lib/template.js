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
                  ${list}
                  ${control}
                  ${body}
                </body>
            </html>`;
    },
    list: (filelist) => {
        return `<ul>${filelist?.map((file) => `<li><a href="/?id=${file}">${file}</a></li>`).join('')}</ul>`;
    }
}
