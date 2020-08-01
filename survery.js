var express = require("express");
var app = express();
var port = 4000;
 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/survey-form");


var nameSchema = new mongoose.Schema({
 name: String,
 email: String,

});

var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/survey.html");
});

app.post("/addname", (req, res) => {
	var myData = new User(req.body);
    myData.save()
 		.then(item => {
 		res.send("Your form has been submitted");
     })
	.catch(err => {
	    res.status(400).send("unable to save to database");
	});
 
});

// app.post('/addname', function (req, res) {
//   var myData = new User(req.body);
//     console.log(myData)
// })



app.listen(port, () => {
 console.log("Server listening on port " + port);
});




