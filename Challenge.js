const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
app.use(express.urlencoded());
app.use(express.json());
const port = 3008;

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
            host: "10.11.90.16",
            port: "3306",
            user: "study",
            password: "Study1111%",
            Schema: "Study",
            Table: "Country"
        })
    con.connect(function(err){
            if (err) throw err;
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
        host: "10.11.90.16",
        port: "3306",
        user: "study",
        password: "Study1111%",
        Schema: "Study",
        Table: "RCui_Challenge4"
    })
    con.connect(function (err) {
        if (err) throw err;
        console.log(req.body);

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

app.listen(port, () => {
    console.log("Example app listening on port ${port}!")
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