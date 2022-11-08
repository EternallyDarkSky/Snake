
import Direction from "./Direction"


class KeyBoardDirection{
    curDir:Direction
    constructor(){
        this.init()
        this.curDir = Direction.right
    }
    init(){
        document.addEventListener("keydown",this.keydownHandler.bind(this))
    }
    keydownHandler(event: KeyboardEvent) {
        if (event.key == "ArrowUp") {
            this.curDir = Direction.up
        } else if (event.key == "ArrowRight") {
            this.curDir = Direction.right
        } else if (event.key == "ArrowDown") {
            this.curDir = Direction.down
        } else if (event.key == "ArrowLeft") {
            this.curDir = Direction.left
        } else {
          console.log("wrong PressDown");
        }
    }
}
export default KeyBoardDirection




