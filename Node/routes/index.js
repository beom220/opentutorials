const express = require('express');
const router = express.Router();
const template = require("../lib/template");
const register = require('../lib/register');

router.get('/', (req,res) => {
    // console.log('/', req.user);
    const title  = 'WelCome';
    const data = 'Hello, NodeJs';
    const list = template.list(req.list);
    const body = `<h2>${title}</h2><p>${data}</p>`;
    const html = template.HTML(title, list, body, null, register.statusUI(req,res));
    res.send(html);
});

module.exports = router;