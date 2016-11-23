/*************************************************************************************************************
 * Title: NodeJS API for toggling rPi3B Pins
 * Description: RESTful API for interating with rPi3B GPIO.
 * Author: Daniel R. Little
 * Company: Little Squared, Inc.
 * Date: 11/22/2016
 * TO DO: Implement additional APIs to the PINs
/*************************************************************************************************************/

var rPi = require('./rPi.js');
var express = require('express');

var app = express();
app.use(express.static(__dirname));

app.get('/:pin/Toggle', function (req, resp) {
    var pin = req.params.pin;
    var curPin = rPi.findByPin(pin);    
    if(curPin == -1){
        resp.send('Invalid Pin Number');
    }else{              
        var gval = curPin.getValue();		
        if(gval == 0){
            curPin.setHigh();
            gval ='1';
        }else{
            curPin.setLow();
            gval = '0';
        }
        resp.send(gval);
    }
}); 

app.get('/:pin/Value', function(req, resp){
    var pin = req.params.pin;
    var curPin = rPi.findByPin(pin);
    if(curPin == -1){
        resp.send('Invalid Pin Number');
    }else{
        resp.send(curPin.getValue());
    }
});

app.get('/PINs', function(req, resp){
    resp.send(rPi.PINs)
});

var server = app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});

process.on('SIGINT', function() {
	server.close(function(){
		console.log('\nUnexporting all PINs');
		rPi.unExportAll();
		console.log('All PINs closed');
		console.log('Shutting Down Server');
		process.exit(0);
	});
});