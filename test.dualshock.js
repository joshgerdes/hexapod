// Test for eventing API layer over HID for the Sony DualShock 3 controller
// source: https://github.com/rdepena/node-dualshock-controller

var five = require('johnny-five');
var dualShock = require('dualshock-controller');
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});
var controller = dualShock({
  config: 'dualShock3',
  // smooths the output from the acelerometers (moving averages) defaults to true 
  accelerometerSmoothing : true,
  // smooths the output from the analog sticks (moving averages) defaults to false 
  analogStickSmoothing : false
});

function scale(x, fromLow, fromHigh, toLow, toHigh) {
  return (x - fromLow) * (toHigh - toLow) /
    (fromHigh - fromLow) + toLow;
}

board.on('ready', function() {
  //add event handlers: 
  controller.on('left:move', data => console.log('left Moved: ' + data.x + ' | ' + data.y));

  controller.on('right:move', data => console.log('right Moved: ' + data.x + ' | ' + data.y));

  controller.on('connected', () => console.log('connected'));

  controller.on('square:press', ()=> console.log('square press'));

  controller.on('square:release', () => console.log('square release'));

  //controller status 
  //as of version 0.6.2 you can get the battery %, if the controller is connected and if the controller is charging 
  controller.on('battery:change', data => console.log('battery:change', data));

  controller.on('connection:change', data => console.log('connection:change', data));

  controller.on('charging:change', data => console.log('charging:change', data));

  controller.connect();
});
