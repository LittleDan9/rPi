/*************************************************************************************************************
 * Title: RaspberryPI 3 Model B
 * Description: PIN Configuration Object for use with NodeJS on a RaspberyPi 3 with NodeJS.
 * Script utilizes the gpio bash utiliy that is install on Raspbian by default.
 * Author: Daniel R. Little
 * Company: Little Squared, Inc.
 * Date: 11/22/2016
 * TO DO: Create a C application to replace the GPIO Utility Useage and add support for other RaspberryPIs.
/*************************************************************************************************************/

//Digital High and Low
const HIGH = 1;
const LOW = 0;

//Constants for using the gpio tool.
//Utilized variables here to aid in replacing when C object is developed.
const COMMAND = 'gpio'
const SET_COMMAND  = 'write';
const EXPORT_METHOD = 'export';
const UNEXPORT_METHOD = 'unexport';
const MODE_METHOD = 'mode'
const GET_METHOD = 'read';

//Child Process allows us to call the gpio utilty from within NodeJS. (Baked into NodeJS)
var execSync = require('child_process').execSync;

//Dot Notation code for direction of the pin.
const Modes = { Output: 'out', Input: 'in'};

//PIN Object Definition & Prototypes
function PIN(name, pin, bcm, wpi, isGPIO){
	this.Name = name;
	this.PIN = pin;
	this.BCM = bcm;
	this.wPi = wpi;
	this.isGPIO = isGPIO === true ? true : false;
	if(bcm >= 0){
		this.getValue();
	}
}


PIN.prototype.setHigh = function(){
	//Have to be in Output to write to
	this.setMode(Modes.Output);
	var myCmd = COMMAND + ' -g ' + SET_COMMAND + ' ' + this.BCM + ' ' + HIGH;
	execSync(myCmd);
	return true;
}

PIN.prototype.setLow = function(){
	//Have to be in Output to write to
	this.setMode(Modes.Output);
	var myCmd = COMMAND + ' -g ' + SET_COMMAND + ' ' + this.BCM + ' ' + LOW;
	execSync(myCmd);
	return true;
}


PIN.prototype.export = function(mode){
	if(mode == Modes.Output || mode == Modes.Input){
		var myCmd = COMMAND + ' ' + EXPORT_METHOD + ' ' + this.BCM + ' ' + mode;
		execSync(myCmd)
		return true;
	}else{
		return false;
	}
}

PIN.prototype.unexport = function(){
	var myCmd = COMMAND + ' ' + UNEXPORT_METHOD + ' ' + this.BCM;
	execSync(myCmd)
	return true;
}

PIN.prototype.setMode = function(mode){
	if(mode == Modes.Output || mode == Modes.Input){
		var myCmd = COMMAND + ' -g ' +  MODE_METHOD + ' ' + this.BCM + ' ' + mode;
		execSync(myCmd);
	}else{
		return false;
	}
}

PIN.prototype.setValue = function(value){
	this.Value = value;
}

PIN.prototype.getValue = function(){

	if(this.BCM != ''){
		var myCmd = COMMAND + ' -g ' + GET_METHOD + ' ' + this.BCM;
		//console.log(myCmd);
		var result = -1;
		var value = execSync(myCmd);
		this.setValue(value.toString().trim());
	}else{
		this.Value = NaN;
	}
	return this.Value;
}

/*********************************************************
 * Global PINs  & Helper Methods
/*********************************************************/
var unExportAll = function(){
	var myCmd = COMMAND + ' unexportall';
	execSync(myCmd);
	return true;
}

var findByPin = function (myPin){
	//console.log('in find');
	//console.log(myPin);
	for(var Pin in this.PINs){
		//console.log(PINs[Pin]);
		if(PINs[Pin].PIN == myPin)
			return PINs[Pin];
	}

	return -1;
}

/*********************************************************
 * Default initialization of PINs on the rPi3B
 * Signature is Name, rPi Pin, Broadcom Pin, WiringPi Pin
/*********************************************************/
const PINs = {
	PIN1: new PIN('3.3v', 1),
	PIN2: new PIN('5v', 2),
	PIN3: new PIN('SDA.1', 3, 2, 8),
	PIN4: new PIN('5v', 4),
	PIN5: new PIN('SCL.1', 5, 3, 9),
	PIN6: new PIN('Ground', 6),
	PIN7: new PIN('GPIO 4', 7, 4, 7, true),
	PIN8: new PIN('TxD', 8, 14, 15),
	PIN9: new PIN('Ground', 9),
	PIN10: new PIN('RxD', 10, 15, 16),
	PIN11: new PIN('GPIO 17', 11, 17, 0, true),
	PIN12: new PIN('GPIO 18', 12, 18, 1, true),
	PIN13: new PIN('GPIO 27', 13, 27, 2, true),
	PIN14: new PIN('Ground', 14),
	PIN15: new PIN('GPIO 22', 15, 22, 3, true),
	PIN16: new PIN('GPIO 23', 16, 23, 4, true),
	PIN17: new PIN('3.3v', 17),
	PIN18: new PIN('GPIO 24', 18, 24, 5, true),
	PIN19: new PIN('MOSI', 19, 10, 12),
	PIN20: new PIN('Ground', 20),
	PIN21: new PIN('MISO', 21, 9, 13),
	PIN22: new PIN('GPIO 25', 22, 25, 6, true),
	PIN23: new PIN('SCLK', 23, 11, 14),
	PIN24: new PIN('CE0', 24, 8, 10),
	PIN25: new PIN('Ground', 25),
	PIN26: new PIN('CE1', 26, 7, 11),
	PIN27: new PIN('SDA.0', 27, 0, 30),
	PIN28: new PIN('SCL.0', 28, 1, 31),
	PIN29: new PIN('GPIO 5', 29, 5, 21, true),
	PIN30: new PIN('Ground', 30),
	PIN31: new PIN('GPIO 6', 31, 6, 22, true),
	PIN32: new PIN('GPIO 12', 32, 12, 26, true),
	PIN33: new PIN('GPIO 13', 33, 13, 23, true),
	PIN34: new PIN('Ground', 34),
	PIN35: new PIN('GPIO 19', 35, 19, 24, true),
	PIN36: new PIN('GPIO 16', 36, 16, 27, true),
	PIN37: new PIN('GPIO 26', 37, 26, 25, true),
	PIN38: new PIN('GPIO 20', 38, 20, 28, true),
	PIN39: new PIN('Ground', 39),
	PIN40: new PIN('GPIO 21', 40, 21, 29, true),
};

//Export Statement for NodeJS
module.exports = {
	PINs,
	Modes,
	findByPin,
	unExportAll,
};