//Challenge 4
var http = require('http');
var mysql = require("mysql");


    console.log("hi");
    http.createServer(function (req, res) {

        if (req.url === "/login") {
            var con = mysql.createConnection({
                host: "10.11.90.16",
                port: "3306",
                user: "study",
                password: "Study1111%",
                Schema: "Study",
                Table: "RCui_Challenge4"
            })
            con.connect(function (err) {
                if (err) throw err;
                console.log(req);

            })
        } else {
            res.statusCode = 404;
            res.end('404: File Not Found');
        }
    }).listen(3008);

