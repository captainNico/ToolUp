const express = require('express');
const crypto = require('crypto');
const db = require('./database.js');
const bodyParser = require('body-parser');

// Define API
const api = express();
const routerApi = express.Router();

/*
 * Routes
*/

api.use(function (req, res, next){

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

routerApi.get('/check-login-user/:username/:password/:tokenID?', function (req, res) {

    if (req.params.tokenID == null) {
        
        // Check if user an to account
        db.checkUserWithTokenID(req.params.username, req.params.password, req.params.tokenID, function (response) {
            res.json(response);
        });

    } else {
        
        // Check if user an to account
        db.checkUser(req.params.username, req.params.password, function (response) {
            res.json(response);
        });
    }

});

routerApi.post('/create-account', bodyParser.json(), function (req, res, next) {

    // Retrives information passed in json post
    var username = req.body.username,
        mail = req.body.mail,
        password = req.body.password,
        tokenID = crypto.createHash('md5').update(username + new Date().getTime() + password).digest("hex");
    
    // Check account and create this
    db.createAccount(username, password, mail, tokenID, function (response) {

        // Send the reponse in json
        res.json(response);
    });
});

routerApi.get('/get-all-boards/:tokenID_user', function (req, res, next) {

    db.getAllBoards(req.params.tokenID_user, function (data) {
        res.json(data);
    });

});

routerApi.get('/get-board/:tokenID_board/:tokenID_user', function (req, res, next) {
    
        db.getBoard(req.params.tokenID_board, req.params.tokenID_user, function (data) {
            res.json(data);
        });
    
    });

routerApi.get('/get-columns/:tokenID_board/:tokenID_user', function (req, res, next) {

    db.getColumns(req.params.tokenID_board, req.params.tokenID_user, function (reponse) {
        res.json(reponse);
    });
});

routerApi.get('/get-all-tasks/:tokenID_board/:tokenID_user', function (req, res, next) {
    
    db.getAllTasks(req.params.tokenID_board, req.params.tokenID_user, function (reponse) {
        res.json(reponse);
    });
});

routerApi.put('/change-columnTask', bodyParser.json(), function (req, res, next) {

    var tokenID_column = req.body.tokenID_column,
        tokenID_task = req.body.tokenID_task;

    db.putColumnTask(tokenID_column, tokenID_task, function (response) {
        // res.json(reponse);
        res.json(response);
    });
});

// For error 404
routerApi.get('*', function (req, res) {
    res.json({error: '404'});
});

api.use('/api', routerApi);

api.listen(8123, function () {
    console.log('Server starting !');
});