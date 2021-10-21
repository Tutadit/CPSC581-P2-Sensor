import { Direction } from "./utiltities.js";
import { getOrientationSensor } from "./sensors.js";


const sensitivity_to_active = 17;
const sensitivity_from_active = 6;


class SimonSays {
  constructor(initial_sensitivity = 17) {
    this.inititateBlocks();

    this.active = null;
    //this.flag = true;
    this.pattern = [
      Direction.Down,
      Direction.Up,
      Direction.Left,
      Direction.Down,
    ];
    this.current_attempt = [];
    this.pattern_as_password = false;

    this.orientationHandler = this.handleOrientation.bind(this);
    this.orientationSensor = getOrientationSensor(
      this.orientationHandler,
      initial_sensitivity
    );
  }

  start() {
    this.playPattern();
  }

  handleOrientation(direction) {
    //
    let currentActive = this.getActive();
    if (currentActive) {
      if (currentActive === Direction.opposite(direction)) {
        this.deactivate();
        this.orientationSensor.setSensitivity(sensitivity_to_active);
      } else {
        //this.wrongPattern()
      }
      return;
    }

    this.activate(direction);
    this.orientationSensor.setSensitivity(sensitivity_from_active);
  }

  inititateBlocks() {
    this.blocks = {
      all: $(".simon-option"),
      message: $("#message"),
      screen_lock: $(".lock-screen"),
      screen_main: $(".main-screen"),
      pw_toggle: $("#toggle-pw"),
      [Direction.Left]: $(".simon-option.left"),
      [Direction.Right]: $(".simon-option.right"),
      [Direction.Down]: $(".simon-option.down"),
      [Direction.Up]: $(".simon-option.up"),
    };
  }

  reset() {
    this.active = null;
    this.current_attempt = [];
    this.deactivateBlocks();
  }

  activateBlock(direction) {
    let block = this.blocks[direction];
    if (!block) return;
    block.addClass("active");
  }

  activate(direction) {
    // remove red color css class to all blocks
    //this.blocks.message.addClass("hidden");
    this.active = direction;
    this.activateBlock(direction);
    this.current_attempt = [...this.current_attempt, direction];
    this.checkAttempt();
  }

  deactivateBlocks() {
    this.blocks.all.removeClass("active");
  }

  deactivate() {
    this.active = null;
    this.deactivateBlocks();
  }

  getActive() {
    return this.active;
  }

  checkAttempt() {
    // TODO: Use this.pattern and this.current_attempt to
    // determine if the current attempt is valid.
    // this.current_attempt will contain the pattern as the user
    // tilts their phone. So it need not match this.pattern completely,
    // rather all items in this.current_attempt should match the ones
    // in the pattern.
    // I recommend you take a look at Array.prototype.reduce()
    //    ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce )
    // if the pattern does not match, the user should be notified.
    //   Use this.wrongPattern()
    // if the pattern matches completely, the phone should unlock.
    //   Use this.unlockPhone()

    var curIndex = this.current_attempt.length - 1;
    if (this.current_attempt[curIndex] !== this.pattern[curIndex]) {
      // add red color css class to all blocks
      setTimeout(this.wrongPattern.bind(this), 500);
    }
    if (
      this.current_attempt.length === this.pattern.length &&
      this.current_attempt[curIndex] === this.pattern[curIndex]
    ) {
      setTimeout(this.unlockPhone.bind(this), 500);
    }
  }

  activateCurrentBlockFromPattern() {
    this.deactivateBlocks();
    if (this.current_active_block_from_pattern === this.pattern.length) {
      clearInterval(this.pattern_interval_id);
      this.orientationSensor.start();
      return;
    }
    this.activateBlock(this.pattern[this.current_active_block_from_pattern]);
    this.current_active_block_from_pattern++;
  }

  playPattern() {
    // TODO: Use this.pattern and this.blocks to play the
    // given pattern for the user.
    // I recommend you use setTimeout() ( https://developer.mozilla.org/en-US/docs/Web/API/setTimeout )
    // Use provided this.activateBlocks() and this.deactivateBlocks() functions.
    // Only play pattern if this.pattern_as_password is false
    //this.flag = false;

    if (!this.pattern_as_password) {
      this.orientationSensor.stop();      
      this.current_active_block_from_pattern = 0;
      this.pattern_interval_id = setInterval(
        this.activateCurrentBlockFromPattern.bind(this),
        1000
      );
      return;
    } 
    this.orientationSensor.start();
    //this.flag = true;
  }

  wrongPattern() {
    // TODO: Notify the user that the pattern entered is incorrect.
    // Reset the system. use this.reset()
    // Use this.blocks.message to write a message to user.
    this.blocks.message.text("Incorrect, please try again");
    this.blocks.all.addClass("incorrect-attempt");
    
    setTimeout(
      function () {
        this.blocks.message.text("");
        this.blocks.all.removeClass("incorrect-attempt")
      }.bind(this),
      3000
    );
      
    this.reset();
  }

  unlockPhone() {
    // TODO: Unlock the phone,
    // Use this.blocks.screen_* and css class: hidden
    this.blocks.screen_lock.addClass("hidden");
    this.blocks.screen_main.removeClass("hidden");
  }
}

export function getSimon() {
  return new SimonSays();
}
