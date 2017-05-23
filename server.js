var express = require('express');
var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 8080));

app.use('/js', express.static(__dirname + '/build'));
app.use('/js', express.static(__dirname + '/node_modules/react/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/react-dom/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/d3/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/sqldoc/build'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/fonts/', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function () {
})
