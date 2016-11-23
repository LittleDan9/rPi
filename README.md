# rPi
Raspberry PI Libraries

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

To run this script clone the repository to a local folder and run:
```
node api.js
```

You can access your Pin Control API on your rPi from a browser at http:\\[rPi IP Address]:3000

Obtain your rPi IP Address utilizing the ifconfig command.
