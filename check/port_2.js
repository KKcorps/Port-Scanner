var express = require('express');
var path = require('path');
var hbs = require('hbs')
var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.static('static'));
	app.set('view engine', 'hbs');
	app.set('views', path.join(__dirname, 'views'));
});

var net = require('net');
var port = 1;
var timeout = 2000;
var open_ports = [];
var cnt = 0;
while(port < 1000)
{
	(function(port){
	var sckt = new net.Socket();
	sckt.setTimeout(timeout, function(){
		sckt.destroy();
	});
	sckt.connect(port,'127.0.0.1',function(){
		//console.log('connected to localhost on port: '+ port);
		open_ports.push(port);
		cnt++;
		//client.write('connected to localhost');
	});
	sckt.on('error',function(e){
		sckt.destroy();
	});
	})(port);

	port++;
}

hbs.registerHelper('times', function(n, m,  block) {
    var accum = '';
    for(var i = 0; i < n; ++i,++m)
        accum += block.fn(i);
    return accum;
});

ports = ['21','53', '80', '443', '631'];

hbs.registerHelper('muldivs',function(){
	var str = '';
	var j = ports.length;
	var c = 0;
	for(var i = 0;i<j;i++ )
	{
		if(open_ports[c]==ports[i])
		{
			str = str + "<tr class='success'><td>" + ports[i] + "</td></tr>";
			c++;
		}
		else str = str + "<tr class='danger'><td>" + ports[i] + "</td></tr>";

	}
	return str;
});

hbs.registerHelper('if', function(n){
	var j = open_ports.length;
	for(var i = 0;i<j;i++){
		if(n==open_ports[i]) 
		{
			return 'success';
		}
	}
	return '';	
});
//open_ports = ['1','2','3'];
app.get('/', function(req, res){
	//res.send('Hello world');
	res.render('index', {cont: open_ports, count : cnt});
})

app.listen(3000);
console.log('server running on port 3000');
