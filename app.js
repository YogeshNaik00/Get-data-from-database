var express = require('express');
var htmlparser = require('node-html-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'))
app.set('view-engine', 'ejs')
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'sangamone'
});
app.get("/", function(req, res)
{
    res.render('index.ejs');
});
app.get("/enternumber", function(req, res)
{
    res.render('enternumber.ejs');
});
app.post('/submit', function(req, res)
{
    var sql="SELECT * FROM student WHERE USN ='"+req.body.usn+"'";
    connection.query(sql, function (err, result, empty) 
        {
            if(err){
                console.log(err);
            }

            else if(result=="")
            {
                res.render('notpresent.ejs',
                {title:"error", h1:'Incurrect USN'});
            }
            
            else {
               console.log(result);
               //console.log(result.Name)

              Object.keys(result).forEach(function(key) {
                var row = result[key];
                //console.log(row.Name)
                
                var Name=row.Name;
                console.log(Name);
                res.render('resultsheet.ejs', {title:'Result sheet', result:row})
             });
            }
        })
      // res.render('notpresent.ejs',
  // {title:"send mail", h1:'Enter currect USN'});
     //   connection.end();
});

app.get("/uploadresult", function(req, res)
{
    res.render('uploadresult.ejs');
});
app.post('/upload', function(req, res)
{
    var sql="INSERT INTO student VALUES ('"+req.body.usn+"','"+req.body.name+"', '"+req.body.kannada+"', '"+req.body.english+"', '"+req.body.hindi+"','"+req.body.science+"', '"+req.body.maths+"', '"+req.body.social+"')";

    connection.query(sql, function(err)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            console.log("Updated..!")
            res.render('updated.ejs')
        }
    })
})
app.listen(3000, function(){
    console.log('localhost:3000')
});