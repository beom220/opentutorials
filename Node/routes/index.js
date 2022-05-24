const express = require('express');
const router = express.Router();
const template = require("../lib/template");

router.get('/', (req,res) => {
    const title  = 'WelCome';
    const data = 'Hello, NodeJs';
    const list = template.list(req.list);
    const body = `<h2>${title}</h2><p>${data}</p>`;
    const html = template.HTML(title, list, body, null);
    res.send(html);
});

module.exports = router;