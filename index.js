var five = require('johnny-five');
var raspi = require('raspi-io');
var dualShock = require('dualshock-controller');
var temporal = require('temporal');
var config = require('./config');
var Hexapod = require('./hexapod');

var board = new five.Board({
  io: new raspi()
});

var controller = dualShock({
  config: 'dualShock3'
});

var hexy;

board.on('ready', () => {
  hexy = Hexapod(config);
  initializeController();
});

board.on('message', (event) => {
  /*
    Event {
      type: 'info'|'warn'|'fail',
      timestamp: Time of event in milliseconds,
      class: name of relevant component class,
      message: message [+ ...detail]
    }
  */
  console.log('Received a %s message, from %s, reporting: %s', event.type, event.class, event.message);
});

board.on('exit', () => {
  console.log('exit');
});

var initializeController = () => {
  controller.on('connected', () => console.log('connected'));

  controller.on('l1:press', () => {
    console.log('l1 press');

    hexy.l1c.to(50);
    hexy.l2c.to(50);
    hexy.l3c.to(50);
  });

  controller.on('l2:press', () => {
    console.log('l2 press');

    hexy.l1c.to(180);
    hexy.l2c.to(130);
    hexy.l3c.to(130);
  });

  controller.on('r1:press', () => {
    console.log('r1 press');

    hexy.r1c.to(50);
    hexy.r2c.to(50);
    hexy.r3c.to(50);
  });

  controller.on('r2:press', () => {
    console.log('r2 press');

    hexy.r1c.to(180);
    hexy.r2c.to(130);
    hexy.r3c.to(130);
  });

  controller.on('dpadUp:press', () => {
    console.log('dpadUp press');

    hexy.l1f.to(25);
    hexy.l2f.to(25);
    hexy.l3f.to(25);
  });

  controller.on('dpadDown:press', () => {
    console.log('dpadDown press');

    hexy.l1f.to(165);
    hexy.l2f.to(165);
    hexy.l3f.to(165);
  });

  controller.on('dpadLeft:press', () => {
    console.log('dpadLeft press');

    hexy.r1f.to(25);
    hexy.r2f.to(25);
    hexy.r3f.to(25);
  });

  controller.on('dpadRight:press', () => {
    console.log('dpadRight press');

    hexy.r1f.to(165);
    hexy.r2f.to(165);
    hexy.r3f.to(165);
  });

  controller.on('circle:press', () => {
    console.log('circle press');

    hexy.coxa.to(90);
    hexy.femurs.to(90);
    hexy.tibia.to(90);
  });

  controller.on('triangle:press', () => {
    console.log('triangle press');

    hexy.r1t.to(0);
    hexy.r2t.to(0);
    hexy.r3t.to(0);
  });

  controller.on('triangle:release', () => {
    console.log('triangle release');

    hexy.r1t.to(180);
    hexy.r2t.to(180);
    hexy.r3t.to(180);
  });

  controller.on('x:press', () => {
    console.log('x press');

    hexy.l1t.to(0);
    hexy.l2t.to(0);
    hexy.l3t.to(0);
  });

  controller.on('x:release', () => {
    console.log('x release');

    hexy.l1t.to(180);
    hexy.l2t.to(180);
    hexy.l3t.to(180);
  });

  controller.on('square:press', () => {
    console.log('square press');

    hexy.stand();
  });
  
  controller.on('square:release', () => {
    console.log('square release');

    hexy.sleep();
  });
};
