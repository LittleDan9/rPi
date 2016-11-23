# rPi 3 Model B
### PIN/GPIO RESTful Control API (NodeJS)

This library are my simple implementations of utilizing the PINs on the RaspberryPI 3 Model B. Currently these libraries utilize NodeJS and the GPIO Utility. The GPIO Utility is installed with the standard installation of Raspbian Jessie. 

You will need to update NodeJS to version 7.x+ with the following:

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt install nodejs
```

To confirm the version installed run:
```
node -v
```
Clone this repository to a local folder
```
git clone https://github.com/LittleDan9/rPi
```
Enter the new directory with the cloned source and install the NodeJS Express web application framework
```
cd rPi
npm install express --save
```

Finally run that application.
```
node api.js
```

You can access your Pin Control API on your rPi from a browser at http://[rPi IP Address]:3000. There is also a simple html bages that usese jQuery to test the exposted API interface that can be found at the root location of your RaspberryPi.

Obtain your rPi IP Address utilizing the ifconfig command on the RaspberryPi.

##API Method Calls:
/[rPi Pin #]/Toggle (http://127.0.0.1/11/Toggle - Toggles GPIO 17 from HIGH to LOW or LOW to HIGH)<br/>
/[rPi Pin #]/Value (http://127.0.0.1/11/Value - Returns the current value for GPIO 17: 1 or 0)<br/>
