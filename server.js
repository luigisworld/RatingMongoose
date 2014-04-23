var express = require('express'),
    path = require('path'),
    http = require('http'),
    picture = require('./routes/pictures');
 
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
	app.enable('trust proxy');//Enables reverse proxy support, used to retrieve user's IP
});


app.get('/', function(req,res){
	res.sendfile('public/index.html');
});

//retrieving all pictures 
app.get('/pictures', picture.findAll);
//updating picture
app.post('/pictures/:id', picture.updatePicture);
 
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});