var five = require('johnny-five');

module.exports = (config) => {
  this.state = 'sleep';
  this.config = config;

  this.r1c = new five.Servo(config.hexapod.right.front.coxa);
  this.r1f = new five.Servo(config.hexapod.right.front.femur);
  this.r1t = new five.Servo(config.hexapod.right.front.tibia);
  this.r1 = new five.Servo.Array([ this.r1c, this.r1f, this.r1t ]);

  this.l1c = new five.Servo(config.hexapod.left.front.coxa);
  this.l1f = new five.Servo(config.hexapod.left.front.femur);
  this.l1t = new five.Servo(config.hexapod.left.front.tibia);
  this.l1 = new five.Servo.Array([ this.l1c, this.l1f, this.l1t ]);

  this.r2c = new five.Servo(config.hexapod.right.mid.coxa);
  this.r2f = new five.Servo(config.hexapod.right.mid.femur);
  this.r2t = new five.Servo(config.hexapod.right.mid.tibia);
  this.r2 = new five.Servo.Array([ this.r2c, this.r2f, this.r2t ]);

  this.l2c = new five.Servo(config.hexapod.left.mid.coxa);
  this.l2f = new five.Servo(config.hexapod.left.mid.femur);
  this.l2t = new five.Servo(config.hexapod.left.mid.tibia);
  this.l2 = new five.Servo.Array([ this.l2c, this.l2f, this.l2t ]);

  this.r3c = new five.Servo(config.hexapod.right.rear.coxa);
  this.r3f = new five.Servo(config.hexapod.right.rear.femur);
  this.r3t = new five.Servo(config.hexapod.right.rear.tibia);
  this.r3 = new five.Servo.Array([ this.r3c, this.r3f, this.r3t ]);

  this.l3c = new five.Servo(config.hexapod.left.rear.coxa);
  this.l3f = new five.Servo(config.hexapod.left.rear.femur);
  this.l3t = new five.Servo(config.hexapod.left.rear.tibia);
  this.l3 = new five.Servo.Array([ this.l3c, this.l3f, this.l3t ]);

  //Servos grouped by joints (used in stand)
  this.femurs = new five.Servo.Array([this.r1f, this.l1f, this.r2f, this.l2f, this.r3f, this.l3f]);
  this.tibia = new five.Servo.Array([this.r1t, this.l1t, this.r2t, this.l2t, this.r3t, this.l3t]);
  this.coxa = new five.Servo.Array([this.r1c, this.l1c, this.r2c, this.l2c, this.r3c, this.l3c]);
  this.innerCoxa = new five.Servo.Array([this.r2c, this.l2c]);
  this.outerCoxa = new five.Servo.Array([this.r1c, this.l1c, this.r3c, this.l3c]);

  // Servos grouped by joints & leg pairs (used in row)
  this.frontCoxa = new five.Servo.Array([this.r1c, this.l1c]);
  this.frontFemur = new five.Servo.Array([this.r1f, this.l1f]);
  this.frontTibia = new five.Servo.Array([this.r1t, this.l1t]);
  this.midCoxa = new five.Servo.Array([this.r2c, this.l2c]);
  this.midFemur = new five.Servo.Array([this.r2f, this.l2f]);
  this.midTibia = new five.Servo.Array([this.r2t, this.l2t]);
  this.rearCoxa = new five.Servo.Array([this.r3c, this.l3c]);
  this.rearFemur = new five.Servo.Array([this.r3f, this.l3f]);
  this.rearTibia = new five.Servo.Array([this.r3t, this.l3t]);

  this.leftOuterCoxa = new five.Servo.Array([this.l1c, this.l3c]);
  this.rightOuterCoxa = new five.Servo.Array([this.r1c, this.r3c]);
  this.leftOuterFemur = new five.Servo.Array([this.l1f, this.l3f]);
  this.rightOuterFemur = new five.Servo.Array([this.r1f, this.r3f]);
  this.leftOuterTibia = new five.Servo.Array([this.l1t, this.l3t]);
  this.rightOuterTibia = new five.Servo.Array([this.r1t, this.r3t]);

  this.jointPairs = new five.Servo.Array([
    this.frontCoxa, this.frontFemur, this.frontTibia,
    this.midCoxa, this.midFemur, this.midTibia,
    this.rearCoxa, this.rearFemur, this.rearTibia
  ]);

  this.joints = new five.Servo.Array([this.coxa, this.femurs, this.tibia]);
  this.altJoints = new five.Servo.Array([this.innerCoxa, this.outerCoxa, this.femurs, this.tibia]);
  this.triJoints = new five.Servo.Array([
    this.leftOuterCoxa, this.r2c, 
    this.leftOuterFemur, this.r2f, 
    this.leftOuterTibia, this.r2t, 
    this.rightOuterCoxa, this.l2c, 
    this.rightOuterFemur, this.l2f, 
    this.rightOuterTibia, this.l2t
  ]);

  this.legs = new five.Servo.Array([
    this.r1c, this.r1f, this.r1t, 
    this.l1c, this.l1f, this.l1t, 
    this.r2c, this.r2f, this.r2t, 
    this.l2c, this.l2f, this.l2t, 
    this.r3c, this.r3f, this.r3t, 
    this.l3c, this.l3f, this.l3t
  ]);

  this.legsAnimation = new five.Animation(this.legs);
  
  this.home = () => {
    var most = 0;
    var grouped;
    var mostIndex;
    var ani;
    var work = [
      { name: 'r1', offset: 0, home: config.home.front.femur[1], thome: config.home.front.tibia[1], chome: config.home.front.coxa[1]},
      { name: 'r2', offset: 0, home: config.home.mid.femur[1], thome: config.home.mid.tibia[1], chome: config.home.mid.coxa[1] },
      { name: 'r3', offset: 0, home: config.home.rear.femur[1], thome: config.home.rear.tibia[1], chome: config.home.rear.coxa[1] },
      { name: 'l1', offset: 0, home: config.home.front.femur[1], thome: config.home.front.tibia[1], chome: config.home.front.coxa[1] },
      { name: 'l2', offset: 0, home: config.home.mid.femur[1], thome: config.home.mid.tibia[1], chome: config.home.mid.coxa[1] },
      { name: 'l3', offset: 0, home: config.home.rear.femur[1], thome: config.home.rear.tibia[1], chome: config.home.rear.coxa[1] }
    ];
  
    // Loop through legs and find how far each is from "home"
    work.forEach(function(leg, i) {
      work[i].offset = Math.abs(this[leg.name+"f"].last.reqDegrees - leg.home);
    });
  
    var moving = _.max(work, function(leg){ return leg.offset; });
  
    if (moving.name === 'r2' || moving.name === 'l1' || moving.name === 'l3') {
      grouped = [ [1, 3, 5], [0, 2, 4] ];
    } else {
      grouped = [ [0, 2, 4], [1, 3, 5] ];
    }
  
    grouped.forEach((group, i) => {
      group.forEach((leg, j) => {
        temporal.queue([
          {
            delay: 500*i,
            task: () => {
              this[work[leg].name+"f"].to(work[leg].home + lift.femur);
              this[work[leg].name+"t"].to(work[leg].thome + lift.tibia);
            }
          },
          {
            delay: 100,
            task: () => {
              this[work[leg].name+"c"].to(work[leg].chome);
            }
          },
          {
            delay: 100,
            task: () => {
              this[work[leg].name+"f"].to(work[leg].home);
              this[work[leg].name+"t"].to(work[leg].thome);
            }
          }
        ]);
      });
    });

    this.state = 'stand';
  };

  this.animations = {
    sleep: {
      duration: 500,
      cuePoints: [0, 0.5, 0.75, 1.0],
      fps: 100,
      easing: config.easeOut,
      target: this.altJoints,
      oncomplete: function() {
        this.state = 'sleep';
      },
      keyFrames: [
        [null, null, false, { degrees: config.sleep.coxa, easing: config.easeOut }],
        [null, null, false, { degrees: config.sleep.coxa, easing: config.easeOut }],
        [null, { degrees: config.home.front.femur[1] + 20, easing: config.easeOut }, { degrees: config.sleep.femur, easing: config.easeInOut }],
        [null, false, { degrees: config.sleep.tibia, easing: config.easeInOut }]
      ]
    },
    stand: {
      target: this.altJoints,
      duration: 500,
      loop: false,
      fps: 100,
      cuePoints: [0, 0.1, 0.3, 0.7, 1.0],
      oncomplete: function() {
        this.state = 'stand';
      },
      keyFrames: [
        [null, false, { degrees: config.home.mid.coxa[1] }],
        [null, false, { degrees: config.home.front.coxa[1] }],
        [null, false, false, { degrees: config.home.front.femur[1] + 20, easing: config.easeOut}, { degrees: config.home.front.femur[1], easing: config.easeIn}],
        [null, { degrees: config.home.front.tibia[1]}, false, { degrees: config.home.front.tibia[1] }]
      ]
    },
    walk: {
      duration: 2000,
      cuePoints: [0, 0.071, 0.143, 0.214, 0.286, 0.357, 0.429, 0.5, 0.571, 0.643, 0.714, 0.786, 0.857, 0.929, 1],
      loop: true,
      loopback: 0.5,
      fps: 100,
      onstop: function() { 
        this.home(); 
      },
      oncomplete: function() { },
      keyFrames: [
        [null, null, {degrees: config.steps.front.coxa[5]}, null, null, null, null, {degrees: config.steps.front.coxa[5]}, null, {degrees: config.steps.front.coxa[0]}, null, null, null, null, {degrees: config.steps.front.coxa[5]}], // r1c
        [null, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.front.femur[5], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.front.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.front.femur[0], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.front.femur[5]}],
        [null, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.front.tibia[5], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.front.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.front.tibia[0], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.front.tibia[5]}],
    
        [null, null, null, false, null, {degrees: config.steps.front.coxa[2]}, null, {degrees: config.steps.front.coxa[2]}, null, null, {degrees: config.steps.front.coxa[5]}, null, {degrees: config.steps.front.coxa[0]}, null, {degrees: config.steps.front.coxa[2]}],
        [null, null, null, false, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.front.femur[2], easing: config.easeIn}, null, {degrees: config.steps.front.femur[2]}, null, null, {degrees: config.steps.front.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.front.femur[0], easing: config.easeIn}, null, {degrees: config.steps.front.femur[2]}],
        [null, null, null, false, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.front.tibia[2], easing: config.easeIn}, null, {degrees: config.steps.front.tibia[2]}, null, null, {degrees: config.steps.front.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.front.tibia[0], easing: config.easeIn}, null, {degrees: config.steps.front.tibia[2]}],
    
        [null, null, null, null, false, null, {degrees: config.steps.mid.coxa[1]}, {degrees: config.steps.mid.coxa[1]}, null, null, null, {degrees: config.steps.mid.coxa[5]}, null, {degrees: config.steps.mid.coxa[0]}, {degrees: config.steps.mid.coxa[1]}],
        [null, null, null, null, false, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.mid.femur[1], easing: config.easeIn}, {degrees: config.steps.mid.femur[1]}, null, null, null, {degrees: config.steps.mid.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.mid.femur[0], easing: config.easeIn}, {degrees: config.steps.mid.femur[1]}],
        [null, null, null, null, false, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.mid.tibia[1], easing: config.easeIn}, {degrees: config.steps.mid.tibia[1]}, null, null, null, {degrees: config.steps.mid.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.mid.tibia[0], easing: config.easeIn}, {degrees: config.steps.mid.tibia[1]}],
    
        [null, false, null, {degrees: config.steps.mid.coxa[4]}, null, null, null, {degrees: config.steps.mid.coxa[4]}, {degrees: config.steps.mid.coxa[5]}, null, {degrees: config.steps.mid.coxa[0]}, null, null, null, {degrees: config.steps.mid.coxa[4]}],
        [null, false, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.mid.femur[4], easing: config.easeIn}, null, null, null, {degrees: config.steps.mid.femur[4]}, {degrees: config.steps.mid.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.mid.femur[0], easing: config.easeIn}, null, null, null, {degrees: config.steps.mid.femur[4]}],
        [null, false, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.mid.tibia[4], easing: config.easeIn}, null, null, null, {degrees: config.steps.mid.tibia[4]}, {degrees: config.steps.mid.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.mid.tibia[0], easing: config.easeIn}, null, null, null, {degrees: config.steps.mid.tibia[4]}],
    
        [null, null, false, null, {degrees: config.steps.rear.coxa[3]}, null, null, {degrees: config.steps.rear.coxa[3]}, null, {degrees: config.steps.rear.coxa[5]}, null, {degrees: config.steps.rear.coxa[0]}, {degrees: config.steps.rear.coxa[1]}, null, {degrees: config.steps.rear.coxa[3]}],
        [null, null, false, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.rear.femur[3], easing: config.easeIn}, null, null, {degrees: config.steps.rear.femur[3]}, null, {degrees: config.steps.rear.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.rear.femur[0], easing: config.easeIn}, {degrees: config.steps.rear.femur[1]}, null, {degrees: config.steps.rear.femur[3]}],
        [null, null, false, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.rear.tibia[3], easing: config.easeIn}, null, null, {degrees: config.steps.rear.tibia[3]}, null, {degrees: config.steps.rear.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.rear.tibia[0], easing: config.easeIn}, {degrees: config.steps.rear.tibia[1]}, null, {degrees: config.steps.rear.tibia[3]}],
    
        [null, null, null, null, null, false, null, {degrees: config.steps.rear.coxa[0]}, null, null, null, null, {degrees: config.steps.rear.coxa[5]}, null, {degrees: config.steps.rear.coxa[0]}],
        [null, null, null, null, null, false, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.rear.femur[0], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.rear.femur[5]}, { step: config.lift.femur, easing: config.easeOut }, {degrees: config.steps.rear.femur[0], easing: config.easeIn}],
        [null, null, null, null, null, false, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.rear.tibia[0], easing: config.easeIn}, null, null, null, null, {degrees: config.steps.rear.tibia[5]}, { step: config.lift.tibia, easing: config.easeOut }, {degrees: config.steps.rear.tibia[0], easing: config.easeIn}]
      ]
    },
    waveRight: {
      duration: 1500,
      cuePoints: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      target: this.r1,
      oncomplete: function() {
        this.state = 'stand';
      },
      keyFrames: [
        [null, false, { degrees: 20, easing: config.easeInOut }, false, false, false, false, false, null, {copyDegrees: 0, easing: config.easeInOut} ], // r1c
        [null, { step: 55, easing: config.easeInOut }, false, false, false, false, false, false, { step: -55, easing: config.easeInOut }, {copyDegrees: 0, easing: config.easeInOut} ], // r1f
        [null, { degrees: 85, easing: config.easeInOut }, { degrees: 45, easing: config.easeInOut }, { step: -15, easing: config.easeInOut}, { step: 30, easing: config.easeInOut}, { copyDegrees: 3, easing: config.easeInOut}, { copyFrame: 4 }, { copyDegrees: 2, easing: config.easeInOut}, { copyFrame: 1 }, {copyDegrees: 0, easing: config.easeInOut} ]
      ]
    },
    waveLeft: {
      duration: 1500,
      cuePoints: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      target: this.l1,
      oncomplete: function() {
        this.state = 'stand';
      },
      keyFrames: [
        [null, false, { degrees: 20, easing: config.easeInOut }, false, false, false, false, false, { degrees: 52, easing: config.easeInOut }, {copyDegrees: 0, easing: config.easeInOut} ], // l1c
        [null, { step: 55, easing: config.easeInOut }, false, false, false, false, false, false, { step: -55, easing: config.easeInOut }, {copyDegrees: 0, easing: config.easeInOut} ], // l1f
        [null, { degrees: 85, easing: config.easeInOut }, { degrees: 45, easing: config.easeInOut }, { step: -15, easing: config.easeInOut}, { step: 30, easing: config.easeInOut}, { copyDegrees: 3, easing: config.easeInOut}, { copyFrame: 4 }, { copyDegrees: 2, easing: config.easeInOut}, { copyFrame: 1 }, {copyDegrees: 0, easing: config.easeInOut} ]
      ]
    }
  };

  return {
    legsAnimation: this.legsAnimation,
    
    coxa: this.coxa, 
    femurs: this.femurs, 
    tibia: this.tibia,

    r1c: this.r1c,
    r1f: this.r1f,
    r1t: this.r1t,
    r2c: this.r2c,
    r2f: this.r2f,
    r2t: this.r2t,
    r3c: this.r3c,
    r3f: this.r3f,
    r3t: this.r3t,
    l1c: this.l1c,
    l1f: this.l1f,
    l1t: this.l1t,
    l2c: this.l2c,
    l2f: this.l2f,
    l2t: this.l2t,
    l3c: this.l3c,
    l3f: this.l3f,
    l3t: this.l3t,

    sleep: () => {
      this.legsAnimation.enqueue(this.animations.sleep);
    },
    stand: () => {
      this.legsAnimation.enqueue(this.animations.stand);
    },
    stop: () => {
      this.legsAnimation.stop();
    },
    walk: () => {
      this.legsAnimation.enqueue(this.animations.walk);
    },
    waveLeft: () => {
      this.legsAnimation.enqueue(this.animations.waveLeft);
    },
    waveRight: () => {
      this.legsAnimation.enqueue(this.animations.waveRight);
    }
  }
};
