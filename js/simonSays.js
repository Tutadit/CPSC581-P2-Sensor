import { Direction } from "./utiltities.js";
import { getOrientationSensor } from "./sensors.js";


const sensitivity_to_active = 15;
const sensitivity_from_active = 15;


class SimonSays {
  constructor(initial_sensitivity = 17) {
    this.inititateBlocks();
    this.inititateButtonHandlers()
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

  startChangePassword() {
    this.changing_password = true;
    this.old_pattern = this.pattern
    this.pattern = [];
  }

  stopChangePassword() { 
    if (this.pattern.length === 0) 
      this.pattern = this.old_pattern
    this.changing_password = false;
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

  inititateButtonHandlers() {

      this.blocks.return_to_lockscreen_btn.click(function(){
        if(!this.blocks.screen_main.hasClass("hidden")){
          this.blocks.screen_main.addClass("hidden");
          this.blocks.screen_lock.removeClass("hidden");
          this.reset()
        }
      }.bind(this))
      
      this.blocks.pw_change.click(function() {
        if (this.blocks.pw_change.hasClass("disabled"))
          return
        if (this.changing_password) {
          this.stopChangePassword()
          this.blocks.pw_change_prompt.text("Pattern saved!")
          this.blocks.pw_change.text("Set Pattern")
          setTimeout(function(){
            this.blocks.pw_change_prompt.text("")}.bind(this), 3500)
        
          
        } else {
          this.orientationSensor.start();
          this.startChangePassword()
          //this.playPattern();

          this.blocks.pw_change_prompt.text("Please set a new pattern");
          this.blocks.pw_change.text("Save")
        }
      }.bind(this))

      this.blocks.pattern_replay.click(function () {
        if (this.blocks.pattern_replay.hasClass("disabled"))
          return
        this.playPattern();
      }.bind(this));

      this.blocks.pw_toggle.click(function () {
        if (this.blocks.pw_toggle.hasClass("disabled"))
          return
          
        this.pattern_as_password = !this.pattern_as_password

        if (this.pattern_as_password)
          this.blocks.pattern_replay.addClass("disabled")
        else
          this.blocks.pattern_replay.removeClass("disabled")
        this.blocks.pw_toggle.removeClass("on off")
        this.blocks.pw_toggle.addClass(this.pattern_as_password ? "off" : "on")

      }.bind(this))

      this.blocks.close_actions.click(function() {
        if (this.blocks.close_actions.hasClass("disabled"))
          return
        this.blocks.actions_wrapper.addClass("no-show")
        this.blocks.pw_change_prompt.text("");

      }.bind(this))

      this.blocks.settings.click(function() {
        this.blocks.actions_wrapper.removeClass("no-show")
      }.bind(this))
  }
  
  inititateBlocks() {
    this.blocks = {
      all: $(".simon-option"),
      message: $("#message"),
      screen_lock: $(".lock-screen"),
      screen_main: $(".main-screen"),
      content:$(".content-cont"),
      pattern_replay: $("#replayPattern"),
      action_button:$(".action-button"),
      pw_toggle: $("#toggle-pw"),
      toggle_p: $("#toggle-p"),  
      pw_change:$("#changePassword"),
      pw_change_prompt:$(".prompt-text"),
      return_to_lockscreen_btn:$("#goLockscreen"),
      close_actions:$(".close-actions"),
      actions:$(".actions"),
      actions_wrapper:$(".setting-cont"),
      settings:$(".settings"),
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

    if (this.changing_password) {
      this.pattern = [...this.pattern, direction]
      return;
    }

    this.current_attempt = [...this.current_attempt, direction];
    if ( this.current_attempt.length === this.pattern.length )
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

    for ( var i = 0; i < this.current_attempt.length; i++ ){
        if (this.current_attempt[i] !== this.pattern[i]){
          setTimeout(this.wrongPattern.bind(this), 500);
          return;
        }
    }

    setTimeout(this.unlockPhone.bind(this), 500);
    
  }

  activateCurrentBlockFromPattern() {
    this.deactivateBlocks();
    if (this.current_active_block_from_pattern === this.pattern.length) {
      clearInterval(this.pattern_interval_id);
      this.blocks.pattern_replay.removeClass("replay-animation");
      this.orientationSensor.start();
      this.blocks.action_button.removeClass("disabled")
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
    console.log("here")
    if (!this.pattern_as_password) {
      console.log("there")
      this.blocks.pattern_replay.addClass("replay-animation");
      this.orientationSensor.stop();      
      this.current_active_block_from_pattern = 0;
      this.blocks.action_button.addClass("disabled")
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
    this.blocks.content.addClass("shake");
    this.orientationSensor.stop();
    setTimeout(
      function () {
        this.blocks.message.text("");
        this.blocks.content.removeClass("shake")
        this.orientationSensor.start();
      }.bind(this), 1500);
      
    this.reset();
  }

  unlockPhone() {
    // TODO: Unlock the phone,
    // Use this.blocks.screen_* and css class: hidden
    this.blocks.screen_lock.addClass("hidden");
    this.blocks.screen_main.removeClass("hidden");
    this.orientationSensor.stop();
    this.reset();
  }
}

export function getSimon() {
  return new SimonSays();
}
