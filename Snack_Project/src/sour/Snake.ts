import Food from "./food";
import Direction from "./Direction";
import SquareWall from "./square_wall";
type bodyLoc = [number, number];
class Snake {
  length: number;
  curreversedirection: Direction;
  curdirection: Direction;
  body: Map<number, bodyLoc>;
  constructor(init_size: number = 13) {
    this.body = new Map<number, bodyLoc>();
    this.length = init_size;
    for (let i = init_size; i > 0; i--) {
      this.body.set(init_size - i, [i - 1, 0] as bodyLoc);
    }
    this.curreversedirection = Direction.left;
    this.curdirection = Direction.right;
  }
  // 连通性保证
  is_connection(): boolean {
    if (this.length === this.body.size) {
      let k: number = 0;
      let v: bodyLoc = [1, 1];
      for (let item of this.body.entries()) {
        if (item[0] == 0) {
          k = item[0];
          v = item[1];
        } else {
          if (k + 1 === item[0]) {
            if (
              // 横竖有一个必须相同
              (item[1][0] == v[0] || item[1][1] == v[1]) &&
              !(item[1][0] == v[0] && item[1][1] == v[1])
            ) {
              continue;
            } else {
              return false;
            }
          }
          k = item[0];
          v = item[1];
        }
      }
    }
    return true;
  }
  // 回环检测
  // 回环的问题只会发生在头部
  is_loop(): boolean {
    if (this.length === this.body.size) {
      let head: number = 0;
      let value: bodyLoc = [1, 1];
      for (let item of this.body.entries()) {
        if (item[0] == 0) {
          head = item[0];
          value = item[1];
        } else {
          if (item[1][0] == value[0] && item[1][1] == value[1]) {
            return true;
          } else {
            continue;
          }
        }
      }
    }
    return false;
  }
  eat(food: Food) {}
  move(direation: Direction) {
    if(this.curreversedirection === direation) return ;
    if (direation == Direction.up) {
        let temp = this.body.get(0)
        for(let item of this.body.entries()){
            if(item[0]==0){
                this.body.set(item[0],[item[1][0],item[1][1]-1])
            }else{
                this.body.set(item[0],temp as bodyLoc)
                temp = item[1]
            }
        }
        this.curdirection = direation
        this.curreversedirection = Direction.down
    } else if (direation == Direction.down) {
        let temp = this.body.get(0)
        for(let item of this.body.entries()){
            if(item[0]==0){
                this.body.set(item[0],[item[1][0],item[1][1]+1])
            }else{
                this.body.set(item[0],temp as bodyLoc)
                temp = item[1]
            }
        }
        this.curdirection = direation
        this.curreversedirection = Direction.up
    } else if (direation == Direction.left) {
        let temp = this.body.get(0)
        for(let item of this.body.entries()){
            if(item[0]==0){
                this.body.set(item[0],[item[1][0]-1,item[1][1]])
            }else{
                this.body.set(item[0], temp as bodyLoc)
                temp = item[1]
            }
        }
        this.curdirection = direation
        this.curreversedirection = Direction.right
    } else {
        let temp = this.body.get(0)
        for(let item of this.body.entries()){
            if(item[0]==0){
                this.body.set(item[0],[item[1][0]+1,item[1][1]])
            }else{
                this.body.set(item[0],temp as bodyLoc)
                temp = item[1]
            }
        }
        this.curdirection = direation
        this.curreversedirection = Direction.left
    }
  }
  get getHead():[number,number]{
    let head  = this.body.get(0) as bodyLoc
    return  [head[0],head[1]]
  }
  stop(){
    this.move(this.curreversedirection)
  }
}

// let snake = new Snake();
// console.log(snake);
// console.log(snake.is_connection());
// console.log(snake.is_loop());
export default Snake;
