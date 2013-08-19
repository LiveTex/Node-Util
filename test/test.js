var util = require('../bin');

var robot = {
  limbs: {
    rl: "rear left leg",
    rr: "rear right leg",
    fl: "front left leg",
    fr: "front right leg",
    antenna: "Wi-Fi robot antenna"
  },
  engine: {
    type: "electric",
    power: "200W"
  },
  weapon: {
    chainsaw: {
      damage: "100500 DPS"
    },
    knifes: {
      damage: "50250 DPS"
    }
  }
};

var cat = {
  limbs: {
    rl: "rear left leg",
    rr: "rear right leg",
    fl: "front left leg",
    fr: "front right leg",
    tail: "fur cat tail"
  },
  engine: {
    type: "meaty",
    power: "1 catpower"
  },
  weapon: {
    claws: {
      damage: "1 bite per second"
    },
    fangs: {
      damage: "10 scratches per second"
    }
  }
};

console.info(util.merge(robot, cat, 3));
console.info(util.merge(robot, cat));
