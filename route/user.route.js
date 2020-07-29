var express = require('express');
var router = express.Router();
var controller= require('../controller/user.controller')


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/users/:id', controller.get);

// lay data trong file create
router.post('/create', controller.postCreate);
module.exports= router;