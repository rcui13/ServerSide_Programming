var http = require('http');
var fs = require('fs');
var mysql = require("mysql");

http.createServer(function(req, res){
    console.log(req.url);
    //Challenge 1
    if (req.url === '/'){
        res.write('Welcome to my Server side programming code');
        res.end();
    }
    //Challenge 2
    else if (req.url === '/abc'){
        fs.readFile('Challenge2.html',function(err, data){
            // console.log(req.url);
            res.writeHead(200, {'Content-Type': "text/html"});
            res.write(data);
            return res.end();
        })
    }
    //Challenge 3
    else if (req.url === "/count"){
        var con = mysql.createConnection({
            host: "10.11.90.16",
            port: "3306",
            user: "study",
            password: "Study1111%",
            Schema: "Study",
            Table: "Country"
        })
        // console.log();
        con.connect(function(err){
            if (err) throw err;
            res.writeHead(200, {'Content-Type': "text/html"});
            con.query("Select COUNT(Country) as 'count' FROM Study.Country Where Continent_name ='Asia';", function(err, result){
                if (err) throw err;
                res.write("Total countries in Asia is " + result[0].count + "!");
                console.log(result[0].count)
            })


        })
    }
    // //Challenge 4
    // else if (req.url === "/login"){
    //     var con = mysql.createConnection({
    //         host: "10.11.90.16",
    //         port: "3306",
    //         user: "study",
    //         password: "Study1111%",
    //         Schema: "Study",
    //         Table: "RCui_Challenge4"
    //     })
    //     con.connect(function(err){
    //         if (err) throw err;
    //
    //
    //     })
    // }


    else{
        res.statusCode = 404;
        res.end('404: File Not Found');
    }
}).listen(3008);

