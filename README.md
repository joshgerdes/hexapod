# Hexapod

## TESTING: WORK IN PROGRESS

---
## Install Raspbian
- Download raspbian lite https://www.raspberrypi.org/downloads/raspbian/
- Download etcher https://etcher.io/
- Burn to SD card with etcher
- Enable `ssh` by creating an empty file called ssh in `/mnt/sdc1/` folder of the BOOT disk. (i.e. `/mnt/sdc1/ssh`). 
- Setup wifi by creating a file `wpa_supplicant.conf` in `/mnt/sdc1/` folder of the BOOT disk. (i.e. `/mnt/sdc1/wpa_supplicant.conf`).
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="SSID_NAME_HERE"
    psk="PASSWORD_HERE"
    key_mgmt=WPA-PSK
}
```

- Test ssh where `hostname` is the name you set earlier
```
ssh pi@hostname
```

---
## Update Raspbian system
- Login 
  - user: `pi`
  - pass: `raspberry`
- Change User Passwords
```
sudo passwd pi
sudo passwd root
```

- Change config
  - Change Timezone
  - Change Hostname
  - Change keyboard
  - Change Boot Option: Boot to CLI (No GUI)
  - Load I2C Kernel Module
```
sudo raspi-config
```

- Update system packages
```
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
```

- Install Build Essentials & GIT
```
sudo apt-get install -y build-essential git
```

- Install Useful Tools (Optional)
```
sudo apt-get install -y htop iotop nmon lsof screen
```

---
## Install nodejs (works on pi zero)
- Install packages
```
wget https://nodejs.org/dist/v8.7.0/node-v8.7.0-linux-armv6l.tar.gz
tar -xvf node-v8.7.0-linux-armv6l.tar.gz
cd node-v8.7.0-linux-armv6l
sudo cp -R * /usr/local/
cd ..
rm node-v8.7.0-linux-armv6l.tar.gz
rm -r node-v8.7.0-linux-armv6l
sudo reboot
```

- Add to the end of `~/.profile`
```
PATH=$PATH:/usr/local/bin
```

- Update Node Package Manager (NPM)
```
sudo npm install npm@latest -g
```

---
## Install PS3 controller (SHANWAN/PANHAI Clone)
- Compile and install patched version of bluez
```
sudo apt-get install -y libgtk2.0-dev libdbus-1-dev libudev-dev libical-dev libreadline-dev
git clone https://github.com/luetzel/bluez
cd bluez
./configure --prefix=/usr --mandir=/usr/share/man --sysconfdir=/etc --localstatedir=/var --enable-sixaxis
make -j3
sudo make install
```

- Install sixad manager and sixpair
```
sudo apt-get install -y pyqt4-dev-tools qt4-designer libjack-dev
wget http://downloads.sourceforge.net/project/qtsixa/QtSixA%201.5.1/QtSixA-1.5.1-src.tar.gz
tar xvfz QtSixA-1.5.1-src.tar.gz
cd QtSixA-1.5.1
wget https://launchpadlibrarian.net/112709848/compilation_sid.patch
patch -p1 < compilation_sid.patch
make
chmod 755 utils/bins/sixpair
sudo cp utils/bins/sixpair /usr/local/bin
sudo reboot
```

- Connect PS3 controller with USB to PI
```
sudo sixpair
```

- Disconnect the USB cable. Press 'PS' button to pair. If the pairing is successful, only LED1 remains ON.

- Verify/Debug controller is connected
```
sudo jstest /dev/input/js0
```

---
## Install dualshock 
- Install dependencies
```
sudo apt-get install -y libusb-1.0-0 libusb-1.0-0-dev
npm install -g node-gyp node-pre-gyp
```

- Create udev rules. Create the following file in `/etc/udev/rules.d/61-dualshock.rules`
```
sudo vi /etc/udev/rules.d/61-dualshock.rules
```

```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="054c", ATTRS{idProduct}=="0268", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", MODE="0664", GROUP="plugdev"

SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="054c", ATTRS{idProduct}=="05c4", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", MODE="0664", GROUP="plugdev"
```

- Run in project directory after `dualshock-controller` is installed
```
npm install node-hid --driver=hidraw --build-from-source
```

## Install I2C Module for PCA9685

- Install dependencies
```
sudo apt-get install -y python-smbus i2c-tools
```

- Add the following to `/etc/modules`
```
sudo vi /etc/modules
```

```
i2c-dev 
i2c-bcm2708
```

- Reboot and verify installation
```
sudo reboot
sudo i2cdetect -y 1
```

---
## Reference Links

- http://pi4j.com/pins/model-zero-rev1.html
- https://github.com/cncjs/cncjs/wiki/Raspberry-Pi-Setup-Guide
- https://caffinc.github.io/2016/12/raspberry-pi-3-headless
- https://raspberryblog.de/?p=1870&page=2
- https://github.com/rdepena/node-dualshock-controller
- https://learn.adafruit.com/adafruit-16-channel-servo-driver-with-raspberry-pi




## Installing on/off button (NOT WORKING YET)
https://github.com/TonyLHansen/raspberry-pi-safe-off-switch
or 
https://howchoo.com/g/mwnlytk3zmm/how-to-add-a-power-button-to-your-raspberry-pi


Pin Info
https://github.com/nebrius/raspi-io/wiki/Pin-Information

```
sudo apt-get install -y python3-gpiozero python-gpiozero
```
