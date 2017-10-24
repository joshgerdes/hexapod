module.exports = (() => {
  var easeIn = 'inQuad';
  var easeOut = 'outQuad';
  var easeInOut = 'inOutQuad';

  // This object describes the "leg lift" used in walking
  var lift = { 
    femur: 30, 
    tibia: -20 
  };

  // This object contains the home positions of each servo in its front, mid and rear position for walking.
  var home = {
    front: {
      coxa: [56, 70, 91],
      femur: [116, 120, 119],
      tibia: [97, 110, 116]
    },
    mid: {
      coxa: [70, 88, 109],
      femur: [116, 117, 116],
      tibia: [102, 106, 104]
    },
    rear: {
      coxa: [56, 70, 91],
      femur: [116, 120, 119],
      tibia: [97, 110, 116]
    }
  };

  // This object contains our end effector positions for turns
  var turns = {
    front: {
      coxa: [56, 70, 85 ],
      femur: [121, 120, 119],
      tibia: [117, 110, 105]
    },
    mid: {
      coxa: [73, 88, 105],
      femur: [118, 117, 118],
      tibia: [107, 106, 107]
    },
    rear: {
      coxa: [56, 70, 85 ],
      femur: [121, 120, 119],
      tibia: [117, 110, 105]
    }
  };

  // This object contains the home positions of each servo for the seven steps in walk and crawl.
  var steps = {
    front: {
      coxa: [56, 59, 65, 70, 76, 82, 91],
      femur: [116, 117,119, 120, 120, 119, 119],
      tibia: [97, 101, 106, 110, 112, 114, 116]
    },
    mid: {
      coxa: [70, 76, 82, 88, 94, 100, 109],
      femur: [116, 119, 118, 117, 118, 117, 116],
      tibia: [102, 105, 106, 106, 108, 106, 104]
    },
    rear: {
      coxa: [91, 82, 76, 70, 65, 59, 56],
      femur: [119, 119,120, 120, 119, 117, 116],
      tibia: [116, 114, 112, 110, 106, 101, 97]
    }
  };

  // This object contains the sleep positions for our joints
  var sleep = {
    coxa: 90,
    femur: 165,
    tibia: 150
  };

  /*
  var servo = new five.Servo({
    id: 'MyServo',     // User defined id
    pin: 10,           // Which pin is it attached to?
    type: 'standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    center: true,      // overrides startAt if true and moves the servo to the center of the range
  });
  */

  return {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut,
    lift: lift,
    home: home,
    turns: turns,
    steps: steps,
    sleep: sleep,
    hexapod: {
      right: {
        front: {
          coxa: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 1, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 180], 
            invert: true 
          },
          femur: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 2, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: false 
          },
          tibia: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 3, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: false
          }
        },
        mid: {
          coxa: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 4, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 130], 
            invert: true 
          },
          femur: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 5, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: false 
          },
          tibia: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 6, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: false
          }
        },
        rear: {
          coxa: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 7, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 130], 
            invert: true 
          },
          femur: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 8, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: false 
          },
          tibia: {
            address: 0x41, 
            controller: 'PCA9685', 
            pin: 9, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: false
          }
        }
      },
      left: {
        front: {
          coxa: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 1, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 180], 
            invert: false 
          },
          femur: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 2, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: true 
          },
          tibia: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 3, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: true
          }
        },
        mid: {
          coxa: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 4, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 130], 
            invert: false 
          },
          femur: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 5, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: true 
          },
          tibia: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 6, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: true
          }
        },
        rear: {
          coxa: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 7, 
            offset: 0, 
            startAt: sleep.coxa,
            range: [50, 130], 
            invert: false 
          },
          femur: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 8, 
            offset: 0, 
            startAt: sleep.femur, 
            range: [25, 165],
            invert: true 
          },
          tibia: {
            address: 0x40, 
            controller: 'PCA9685', 
            pin: 9, 
            offset: 0, 
            startAt: sleep.tibia,
            range: [0, 180],
            invert: true
          }
        }
      }
    }
  };
})();
