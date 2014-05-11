var net = require('net');
var port = 1;
var timeout = 2000;
var open_ports = [];
while(port < 10000)
{
	(function(port){
	var sckt = new net.Socket();
	sckt.setTimeout(timeout, function(){
		sckt.destroy();
	});
	sckt.connect(port,function(){
		console.log('connected to localhost on port: '+ port);
		open_ports.push(port);
		//client.write('connected to localhost');
	});
	sckt.on('error',function(e){
		sckt.destroy();
	});
	})(port);

	port++;
}