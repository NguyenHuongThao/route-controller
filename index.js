var express = require('express');

var bodyParser = require('body-parser');
var userRoute = require('./route/user.route');
var db = require('./db');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//sử dụng req.body sau khi đã install body parse




app.get('/', function(request, response) {
	response.render('index', {
		name: 'Thu Bui'
	});
});

app.use('/users',userRoute);


app.listen(port, function() {
	console.log('Server listening on port' + port)
});
