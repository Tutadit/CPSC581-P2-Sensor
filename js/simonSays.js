import { Direction } from "./utiltities.js";

class SimonSays {

  constructor() {
    this.blocks = {
      all: $(".simon-option"),
      message: $("#message"),
      screen_lock: $(".lock-screen"),
      screen_main: $(".main-screen"),
      [Direction.Left]: $(".simon-option.left"),
      [Direction.Right]: $(".simon-option.right"),
      [Direction.Down]: $(".simon-option.down"),
      [Direction.Up]: $(".simon-option.up"),
    };
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
    if(this.current_attempt[curIndex] !== this.pattern[curIndex]){
      this.wrongPattern();
    }
    if(this.current_attempt.length == this.pattern.length && this.current_attempt[curIndex] == this.pattern[curIndex]){
      this.unlockPhone();
    }
  }

  playPattern() {
    // TODO: Use this.pattern and this.blocks to play the
    // given pattern for the user.
    // I recommend you use setTimeout() ( https://developer.mozilla.org/en-US/docs/Web/API/setTimeout )
    // Use provided this.activateBlocks() and this.deactivateBlocks() functions.
    // Only play pattern if this.pattern_as_password is false
    //this.flag = false;

    if(!this.pattern_as_password){
      for(let playIndex = 0; playIndex < this.pattern.length; playIndex++){
        const theFunction = function(playIndex) {
          this.activateBlock(this.pattern[playIndex]);
          this.pattern[playIndex].removeClass("active");
          this.blocks.message.text("test " + playIndex); 
        }       
        
      }

      setTimeout(theFunction.bind(this), 1000); 
    }

    //this.flag = true;
    
  }

  wrongPattern() {
    // TODO: Notify the user that the pattern entered is incorrect.
    // Reset the system. use this.reset()
    // Use this.blocks.message to write a message to user.
    this.blocks.message.text("Incorrect, please try again");
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
