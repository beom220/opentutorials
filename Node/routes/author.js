const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const template = require('../lib/template');
const path = require("path");

router.get('/create',(req, res,next) => {

    db.query(`SELECT * FROM author`, (err, authors) => {
        if(err) next(err)
        const title = 'author';
        const list = template.list(req.list);
        const style = `<style>table{border-collapse:collapse;}td{padding:8px 12px;border:1px solid #eee}</style>`;
        const body = `
            ${style}
            ${template.authorTable(authors)}
            <a href="/author/create">create</a>
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
        const html = template.HTML(title, list, body, null);
        res.send(html);
    })
});

router.post('/create_process', (req,res)=>{
    const post = req.body;
    db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,
        [post.name, post.profile],
        (error, result) => {
            if(error) throw error;
            res.redirect(302, '/author');
        }
    )
})

router.post('/update_process', (req,res,next)=>{
    const post = req.body;
    const id = post.id;
    const name = post.name;
    const profile = post.profile;

    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, [name,profile,id], (err, result)=>{
        if(err) next(err);
        res.redirect(302, '/author');
    })
})

router.get('/update/:author_id', (req,res, next)=>{
    const authorId = path.parse(req.params.author_id).base;
    db.query(`SELECT * FROM author`, [authorId], (err, authors)=> {
        if(err) next(err);
        db.query(`SELECT * FROM author WHERE id = ?`, [authorId], (err2, author) => {
            if (err2) next(err2);
            const title = author[0].name;
            const list = template.list(req.list);
            const style = `<style>table{border-collapse:collapse;}td{padding:8px 12px;border:1px solid #eee}</style>`;
            const body = `
                    ${style}
                    ${template.authorTable(authors)}
                    <form action="/author/update_process" method="post">
                        <p><input type="hidden" name="id" value="${author[0].id}" ></p>
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
            res.send(html);
        })
    })
})

router.post('/delete_process', (req,res,next) => {
    const post = req.body;
    const id = post.id;
    // 저자의 글목록 삭제
    db.query(`DELETE FROM topic WHERE author_id=?`, [id], (err, result) =>{
        if(err) throw next(err);
        // 저자 삭제
        db.query(`DELETE FROM author WHERE id=?`, [id], (err2, result2) => {
            if(err2) next(err2);
            res.redirect(302, '/author');
        })
    })
})

router.get('/',(req, res,next) => {
    db.query(`SELECT * FROM author`, (error2, authors) => {
        if(error2) next(error2);
        const title = 'author';
        const list = template.list(req.list);
        const style = `<style>table{border-collapse:collapse;}td{padding:8px 12px;border:1px solid #eee}</style>`;
        const body = `
            ${style}
            ${template.authorTable(authors)}
            <a href="/author/create">create</a>
        `
        const html = template.HTML(title, list, body, null);
        res.send(html);
    })
});

module.exports = router;