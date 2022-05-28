const express = require('express');
const router = express.Router();
const db = require("../lib/db");
const template = require("../lib/template");
const path = require("path");
const register = require('../lib/register');

router.get('/create', (req, res, next) => {
    db.query(`SELECT * FROM author`, (error, authors)=> {
        if(error) next(error);
        const select = template.authorSelect(authors);
        const title  = 'Web - Create';
        const list = template.list(req.list);
        const body = `
        <form action="/topic/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"/></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                ${select}
                <input type="submit"/>
            </p>
        </form>`;
        const html = template.HTML(title, list, body, null, register.statusUI(req,res));
        res.send(html);
    })
})

router.post('/create_process', (req, res) => {
    const post = req.body;
    const title = post.title;
    const description = post.description;
    const auth = post.author;

    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, Now(), ?)`,
        [title, description, auth],
        (error, result) => {
            if (error) throw error;
            res.redirect(302, `/topic/${result.insertId}`);
        }
    )
})

router.post('/update_process', (req, res) => {
    const post = req.body;
    const id = post.id;
    const title = post.title;
    const description = post.description;

    db.query(`UPDATE topic SET title=?, description=? WHERE id=?`,
        [title, description, id],
        (error, result)=>{
        if(error) throw error;
        res.redirect(302, `/topic/${id}`);
    })
})

router.get('/update/:topic_id', (req,res) => {
    const topicId = path.parse(req.params.topic_id).base;
    db.query(`SELECT * FROM topic WHERE id=?`, [topicId], (error, topic) => {
        if(error) throw error;
        const title = topic[0].title;
        const list = template.list(req.list);
        const body = `
            <form action="/topic/update_process" method="post">
                <!--선택한 파일 정보-->
                <input type="hidden" name="id" value="${topic[0].id}"/>
                <p><input type="text" name="title" placeholder="title" value="${title}"/></p>
                <p>
                  <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                </p>
                <p>
                  <input type="submit"/>
                </p>
            </form>`;
        const html = template.HTML(title, list, body, null, register.statusUI(req,res));
        res.send(html);
    })
})

router.post('/delete_process', (req, res) => {
    const post = req.body;
    const id = post.id;
    db.query(`DELETE FROM topic WHERE id = ?`, [id], (error, result) => {
        if(error) throw error;
        res.redirect(302, `/`);
    })
})

router.get('/:topic_id', (req,res,next) => {
    const topicId = path.parse(req.params.topic_id).base;
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ?`,
        [topicId],
        (error, topic) => {
            if (error) next(error);
            const title = topic[0].title;
            const data = topic[0].description;
            const list = template.list(req.list);
            const author = topic[0].name;
            const body = `<h2>${title}</h2><p>${data}</p><p>by ${author}</p>`;
            const control = `
                <a href="/topic/create">create</a> <a href="/topic/update/${topicId}">update</a>
                <form action="/topic/delete_process" method="post">
                    <input type="hidden" name="id" value="${topicId}"/>
                    <input type="submit" value="delete"/>
                </form>
            `;
            const html = template.HTML(title, list, body, control, register.statusUI(req, res));
            res.send(html);
        }
    )
});

module.exports = router;