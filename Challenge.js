const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
app.use(express.urlencoded());
app.use(express.json());
const port = 3008;

const host = "localhost";
// const host = "10.11.90.16";
// const host = '127.0.0.1';

const user = "root";
// const user = "study";

const password = "zygomorphic";
// const password = "Study1111%";

// app.use(bodyParser.urlencoded({ extended: true }));
//Challenge 1
app.get('/', function(req, res){
    res.send("Welcome to my Server side programming code");
})

//Challenge 2
app.get('/abc', function(req, res){
    fs.readFile('Challenge2.html', (err, data) => {
        res.end(data);
    })
})

//Challenge 3
app.get('/count', (req, res) => {
    const con = mysql.createConnection({
            host: host,
            port: "3306",
            user: user,
            password: password,
            Schema: "Study",
            Table: "Country"
        })

    con.connect(function(err){
            if (err) throw err;
            console.log("connected")
            res.writeHead(200, {'Content-Type': "text/html"});
            con.query("Select COUNT(Country) as 'count' FROM Study.Country Where Continent_name ='Asia';", function(err, result){
                if (err) throw err;
                res.end("Total countries in Asia is " + result[0].count + "!");
            })


        })
})

//Challenge 4
app.post('/challenge4', (req, res) => {
    const con = mysql.createConnection({
        host: host,
        port: "3306",
        user: user,
        password: password,
        Schema: "Study",
        Table: "RCui_Challenge4"
    })

    con.connect(function (err) {
        if (err) throw err;
        // console.log(Body);

        let data = "SELECT Username, Password FROM Study.RCui_Challenge4 WHERE Username = ? AND Password = ?";
        con.query(data, [req.body.username, req.body.password], function (err, results){
            if (err) {
                console.log(err);
                res.json({"error": true, "message": "An unexpected error occurred !"});
            }
            else{
                console.log("oof")
                res.json({"error": false,  "data": results});
            }
        })
    })

})

// Challenge 5
app.post('/challenge5_name',(req, res) => {
    const con = mysql.createConnection({
        host: host,
        port: "3306",
        user: user,
        password: password,
        Schema: "Study",
        Table: "RCui_Challenge5"
    })
    // table = "RCui_Challenge5";
    con.connect(function (err) {
        if (err) throw err;
        let data = "SELECT Name FROM Study.RCui_Challenge5 WHERE Color=?;";
        console.log(res.body)
        con.query(data, req.body.color, function (err, results) {
            if (err) {
                console.log(err);
                res.json({"error": true, "message": "An unexpected error occurred !"});
            } else {
                res.json({"error": false, "data": results});

            }
        })
    })
})

app.post('/challenge5_img',(req, res) => {
    const con = mysql.createConnection({
        host: host,
        port: "3306",
        user: user,
        password: password,
        Schema: "Study",
        Table: "RCui_Challenge5"
    })

    con.connect(function (err) {
        if (err) throw err;
        let data = "SELECT ImageURL FROM Study.RCui_Challenge5 WHERE Name=?;";

        con.query(data, req.body.Name, function (err, results) {
            if (err) {
                console.log(err);
                res.json({"error": true, "message": "An unexpected error occurred !"});
            } else {
                res.json({"error": false, "data": results});
                console.log(results)
            }
        })
    })
})

//challenge 6
app.post('/challenge6',(req,res) =>{
    const con = mysql.createConnection({
        host: host,
        port: "3306",
        user: user,
        password: password,
        Schema: "Study",
        Table: "RCui_Challenge6"
    })
    let data = "SELECT * FROM Study.RCui_Challenge6";
    let arr = [];
    let Body = req.body;
    con.connect(function (err) {
        if (err) throw err;
        console.log(Body)
        if (Body.country !== '' || Body.yearStart !== 'NaN' || Body.genre !== '') {
            data += " WHERE";
        }
        if (Body.country !== '') {
        //         data = "SELECT * FROM Study.RCui_Challenge6 WHERE Country=? AND Form_Year >= ? AND Form_Year <= ? AND Genres LIKE ?;";
            data += " Country= ? ";
            arr.push(Body.country);
            if (Body.yearStart !== 'NaN' || Body.genre !== '') {
                data += " AND";
            }
        }
        if (Body.yearStart !== 'NaN') {
            data += " Form_Year>= ? AND Form_Year<= ? "
            arr.push(Body.yearStart, Body.yearEnd);
            if (Body.genre !== '') {
                data += " AND";
            }
        }
        if (Body.genre !== '') {
            data += " Genres LIKE ?;";
            arr.push(Body.genre);
        }
        console.log(data)
        con.query(data, arr, function(err, results) {
            if (err) {
                console.log(err);
                res.json({"error": true, "message": "An unexpected error occurred !"});
            } else {
                res.json({"error": false, "data": results});
                // console.log(results)
            }
        })
    })
})

app.listen(port, () => {
    console.log("Example app listening on port " + port + "!")
});
// const http = require('http');
// const fs = require('fs');
// const mysql = require("mysql");
//
// http.createServer(function(req, res){
//     console.log(req.url);
//     //Challenge 1
//     if (req.url === '/'){
//         res.write('Welcome to my Server side programming code');
//         res.end();
//     }
//     //Challenge 2
//     else if (req.url === '/abc'){
//         fs.readFile('Challenge2.html',function(err, data){
//             // console.log(req.url);
//             res.writeHead(200, {'Content-Type': "text/html"});
//             res.write(data);
//             return res.end();
//         })
//     }
//     //Challenge 3
//     else if (req.url === "/count"){
//         const con = mysql.createConnection({
//             host: "10.11.90.16",
//             port: "3306",
//             user: "study",
//             password: "Study1111%",
//             Schema: "Study",
//             Table: "Country"
//         })
//         // console.log();
//         con.connect(function(err){
//             if (err) throw err;
//             res.writeHead(200, {'Content-Type': "text/html"});
//             con.query("Select COUNT(Country) as 'count' FROM Study.Country Where Continent_name ='Asia';", function(err, result){
//                 if (err) throw err;
//                 res.write("Total countries in Asia is " + result[0].count + "!");
//             })
//
//
//         })
//     }
//     // //Challenge 4
//
//
//
//
//     else{
//         res.statusCode = 404;
//         res.end('404: File Not Found');
//     }
// }).listen(3008);
//
// http.get("/challenge4",function (req, res) {
//     console.log(req);
//     const con = mysql.createConnection({
//         host: "10.11.90.16",
//         port: "3306",
//         user: "study",
//         password: "Study1111%",
//         Schema: "Study",
//         Table: "RCui_Challenge4"
//     })
//     con.connect(function (err) {
//         if (err) throw err;
//         console.log(req);
//         let data = "SELECT * FROM Study.RCui_Challenge4 WHERE Username = ? AND Password = ?";
//         con.query(data, [req[0]], [req[1]], function (err, results){
//             if (err) {
//                 console.log(err);
//                 res.json({"error": true, "message": "An unexpected error occurred !"});
//             }
//             else{
//                 res.json({"error": false,  "data": results});
//             }
//         })
//     })
// });