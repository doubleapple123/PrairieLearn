const ERR = require('async-stacktrace');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const path = require('path');
const { encodePath, decodePath } = require('../../lib/uri-util');
const debug = require('debug')('prairielearn:' + path.basename(__filename, '.js'));
const logPageView = require('../../middlewares/logPageView')(path.basename(__filename, '.js'));
const fs = require('fs');
const { marked } = require('marked');
const logger = require('../../tests/dummyLogger');

router.get('/', function (req, res, next) {

});

module.exports = router;
