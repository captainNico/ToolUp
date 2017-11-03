const mysql = require('mysql');

// Data for connection DB
var connectionDB = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'toolUp'
});

// Connection to database
connectionDB.connect(function (err) {
    if (err) {  
        console.log('ERROR CONNECT DATABASE');
        return false;
    }
});

exports.checkUserWithTokenID = function (username, password, tokenID, callback) {
    
    connectionDB.query('SELECT username, password, tokenID FROM Users WHERE username=? AND password=? AND tokenID=?', [username, password, tokenID], function (err, data) {
        
        if (err) throw err;
        
        if (data.length > 0) {

            callback(data);

        } else {

            callback({error: 'No account exists with these identifiers'});
        }
    });
}

/* @Brief : Test if the user to an account
 * @Params : username & password = parameters passing in URL
 * @Return : callback(boolean)
*/
exports.checkUser = function (username, password, callback) {
    
    connectionDB.query('SELECT username, mail, password, tokenID FROM Users WHERE username=? AND password=?', [username, password], function (err, data) {
        
        if (err) throw err;
        
        if (data.length > 0) {

            callback(data);

        } else {

            callback({error: 'No account exists with these identifiers'});
        }
    });
}

/* @Brief : Create an account by checking that it is not already creating
 * @Params : username & password & mail & tokenID = parameters passing in URL and created
 * @Return : callback(boolean)
*/
exports.createAccount = function (username, password, mail, tokenID, callback) {

    // Check that no account exists with these identifiers
    connectionDB.query('SELECT username, mail FROM users WHERE username=? AND mail=?', [username, mail], function (err, data) {

        if (err) throw err;

        if (data.length > 0) {
            callback({error: 'User exist already with this username and mail'});
        } else {

            // Create the account with indentifiers
            connectionDB.query('INSERT INTO users(username, password, mail, registration_date, tokenID) VALUES (?, ?, ?, CURDATE(), ?)', [username, password, mail, tokenID], function (err, data) {
                
                if (err) throw err;

                callback({created: true});
            });
        }
    });
}

exports.getAllBoards = function (tokenID_user, callback) {

    connectionDB.query('SELECT * FROM Boards WHERE tokenID_user=?', [tokenID_user], function (err, data) {
        callback(data);
    });
}

exports.getBoard = function (tokenID_board, tokenID_user, callback) {
    
        connectionDB.query('SELECT * FROM Boards WHERE tokenID=? AND tokenID_user=?', [tokenID_board, tokenID_user], function (err, data) {
            callback(data);
        });
}

exports.getColumns = function (tokenID_board, tokenID_user, callback) {

    connectionDB.query('SELECT * FROM Columns WHERE tokenID_board=? AND tokenID_user=?', [tokenID_board, tokenID_user], function (err, data) {
        
        // if (err) throw err;

        callback(data);
    });
}

exports.getAllTasks = function (tokenID_board, tokenID_user, callback) {
    
    connectionDB.query('SELECT * FROM Tasks WHERE tokenID_board=? AND tokenID_user=?', [tokenID_board, tokenID_user], function (err, data) {
        
        // if (err) throw err;
        callback(data);
    });
}

exports.putColumnTask = function (tokenID_column, tokenID_task, callback) {
    
    connectionDB.query('UPDATE Tasks SET tokenID_column=? WHERE tokenID=?', [tokenID_column, tokenID_task], function (err, data) {
        
        // if (err) throw err;
        callback({return: true});
    });
}

exports.newColumn = function (name, tokenID, tokenID_board, tokenID_user, callback) {
    
    connectionDB.query('INSERT INTO Columns(name, creation_date, tokenID, tokenID_board, tokenID_user) VALUES (?, CURDATE(), ?, ?, ?)', [name, tokenID, tokenID_board, tokenID_user], function (err, data) {
        
        // if (err) throw err;
        callback({created: true});
    });
}

exports.newTask = function (titleTask, textTask, imgTask, tokenID, tokenID_column, tokenID_board, tokenID_user, callback) {
    
    connectionDB.query('INSERT INTO Tasks(title, text, img, tokenID, tokenID_column, tokenID_board, tokenID_user) VALUES (?, ?, ?, ?, ?, ?, ?)', [titleTask, textTask, imgTask, tokenID, tokenID_column, tokenID_board, tokenID_user], function (err, data) {
        
        // if (err) throw err;
        callback({created: true});
    });
}