/*

==> npm init -y

==> npm install express cors body-parser mysql2 --save

==> package.json

"dependencies": {
    "body-parser": "^1.19.2",
    "cors": "^2.8.5",
    "express": "^4.17.3",
    "mysql2": "^2.3.3"
  }

==> .gitignore

/node_modules
/package-lock.json

==> run file

node index.js or node index

==> npm i -g nodemon

==> run file

nodemon index.js or nodemon index


*/

const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.json());

// Connect database
const conn = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: '',
    database: 'student',
    // port: 3306
});

// Check connection
conn.connect(err => {
    if (err) {
        console.log('Error: ', err);
    }
    console.log('Database connection successfully');
});

// Read all student
app.get('/student', (req, resp) => {
    // console.log('All student here');
    let qrr = `SELECT * FROM stdinfo`;
    conn.query(qrr, (err, results) => {
        if (err) {
            console.log('Error: ', err);
        }
        if (results.length > 0) {
            resp.send({
                msg: 'All student here',
                data: results
            });
        }
    });
});

// get single student by Id
app.get('/student/:id', (req, resp) => {
    // console.log('Id: ',req.params.id);
    let qrId = req.params.id;

    let qrr = `SELECT * FROM stdinfo WHERE id = ${qrId}`;

    conn.query(qrr, (err, results) => {
        if (err) {
            console.log('Error: ', err);
        }
        if (results.length > 0) {
            resp.send({
                msg: 'single student by Id',
                data: results
            });
        } else {
            resp.send({
                msg: 'student not-found'
            });
        }
    });

});

// create student with post() method

app.post('/student', (req, resp) => {
    // console.log('Student create sucess...');
    // console.log(req.body, 'Student create sucess...');
    let _name = req.body.name;
    let _email = req.body.email;
    let _mobile = req.body.mobile;
    let _address = req.body.address;
    let _age = req.body.age;

    let qrr = `INSERT INTO stdinfo(name,email,mobile,address,age) 
    value('${_name}','${_email}','${_mobile}','${_address}','${_age}') `;

    conn.query(qrr, (err, results) => {
        if (err) { console.log('Error: ', err); }
        console.log(req.body);
        resp.send({
            msg: 'student created successfull',
            data: results
        });
    });

});

// update student with put() method

app.put('/student/:id', (req, resp) => {
    // console.log('Student update sucess...');
    // console.log(req.body, 'Student update sucess...');
    let qrId = req.params.id;

    let _name = req.body.name;
    let _email = req.body.email;
    let _mobile = req.body.mobile;
    let _address = req.body.address;
    let _age = req.body.age;

    let qrr = `UPDATE stdinfo SET 
    name = '${_name}', email = '${_email}', mobile = '${_mobile}', address = '${_address}', age = '${_age}' 
    WHERE id = '${qrId}'`;

    conn.query(qrr, (err, results) => {
        if (err) { console.log('Error: ', err); }
        console.log(req.body);
        resp.send({
            msg: 'student updated successfull',
            data: results
        });
    });
});

// delete student with delete() method
app.delete('/student/:id',(req,resp)=>{
    let stdId = req.params.id;

    conn.query(`DELETE FROM stdinfo WHERE id = '${stdId}'`, (err,results)=>{
        if(err){console.log(err);}

        resp.send({
            msg: 'Student deleted successfull'
        });
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});