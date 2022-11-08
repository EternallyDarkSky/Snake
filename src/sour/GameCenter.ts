import SquareWall from "./square_wall";
import Snake from "./Snake";
import Pannel from "./panel";
import Food from "./food";
import KeyBoardDirection from "./keyboard";

class GameCenter {
  wall: SquareWall;
  panel: Pannel;
  snake: Snake;
  food: Food;
  keyboard: KeyBoardDirection;
  statue: boolean;
  constructor() {
    this.wall = new SquareWall(-1, 25, -1, 25);
    this.panel = new Pannel(25, 25, "stage");
    this.snake = new Snake();
    this.food = new Food(24, 24);
    this.panel.panel_show(this.snake, this.food);
    this.keyboard = new KeyBoardDirection();
    this.statue = true;
  }
  async Run() {
    while (this.statue) {
      this.snake.move(this.keyboard.curDir);
      this.panel.panel_show(this.snake, this.food);
      let snackHead = this.snake.getHead;
      // 回环和撞墙检测
      if (
        this.wall.is_crash_dection(
          snackHead[0] as number,
          snackHead[1] as number
        ) ||
        this.snake.is_loop()
      ) {
        this.snake.stop();
        console.log("you are died");
        this.statue = false;
      }
      // 与食物相遇检测
        // 触发 eat函数,snack 尾巴边长：有必要在每次移动后进行记录尾巴的位置
        // pannel 展示
        // 生成食物的随机位置，pannel 判别是否有效
           //  食物位置改变

      await new Promise((r, j) => {
        setTimeout(() => {
          r("");
        }, 700);
      });
    }
  }
}
export default GameCenter;
