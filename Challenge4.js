//Challenge 4
var http = require('http');
var mysql = require("mysql");


    console.log("hi");
    http.get("/login",function (req, res) {

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
                let data = "SELECT * FROM Study.RCui_Challenge4 WHERE Username = ? AND Password = ?";
                con.query(data, [req[0]], [req[1]], function (err, results){
                    if (err) {
                        console.log(err);
                        res.json({"error": true, "message": "An unexpected error occurred !"});
                    }
                    else{
                        res.json({"error": false,  "data": results});
                    }
                })
            })
    });

