const ERR = require('async-stacktrace');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const path = require('path');
const { encodePath, decodePath } = require('../../lib/uri-util');
const debug = require('debug')('prairielearn:' + path.basename(__filename, '.js'));
const logPageView = require('../../middlewares/logPageView')(path.basename(__filename, '.js'));
const fs = require('fs');
const marked = require('marked')

router.get('/', function (req, res, next) {
    let filePath = `${res.locals.course.path}/questions/${res.locals.question.directory}/README.md`;
    let fileData = fs.readFileSync(filePath, "utf8");

    if (fileData !== null){
        res.locals.readMeData = marked(fileData);
    }

    res.render(__filename.replace(/\.js$/, '.ejs'), res.locals);
});

module.exports = router;
