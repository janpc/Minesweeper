import { setTimeScore, timeToString } from "../helpers/score.js";

export default class Chronometer {
  time = {
    valueInternal: 0,
    valueListener: function (val) {},
    set value(val) {
      this.valueInternal = val;
      this.valueListener(val);
    },
    get value() {
      return this.valueInternal;
    },
    registerListener: function (listener) {
      this.valueListener = listener;
    },
  };

  constructor() {
    this.time.value = 0;
    this.time.registerListener(function (val) {
      const str = timeToString(val);
      setTimeScore(str);
    });
  }

  start() {
    this.interval = setInterval(() => {
      this.time.value++;
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
