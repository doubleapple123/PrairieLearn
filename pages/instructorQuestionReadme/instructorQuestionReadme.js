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
    let filePath = `${res.locals.course.path}/questions/${res.locals.question.directory}/README.md`;
    let readData = "";

    fs.stat(filePath, function(err, stat){
        if (err == null){
            try{
                let fileData = fs.readFileSync(filePath, "utf8");
                readData = marked(fileData);
            }
            catch(error){
                logger.error(`Error while reading readme file, with error ${error}, for filepath ${filePath}`);
                readData = "error while reading file";
            }    
        }
        else if (err.code === "ENOENT"){
            logger.error(`Error while reading readme file, file most likely does not exist`);
            readData = "file does not exist";
        }
        else{
            logger.error(`Unknown error while parsing readme file with code ${err.code}`);
            readData = "error while reading file";
        }

        res.locals.readMeData = readData;
        
        res.render(__filename.replace(/\.js$/, '.ejs'), res.locals);
    });

});

module.exports = router;
