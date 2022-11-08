


type FoodLoc = [number,number]
class Food{
    food_loc:FoodLoc;
    constructor(x:number,y:number){
        this.food_loc = [x,y]
    }
    eaten(){
        //1. 协助蛇进行边长
        //2. 消除自身
    }
    get x(){
        return this.food_loc[0]
    }
    get y(){
        return this.food_loc[1]
    }
    set loc(arg:FoodLoc){
        this.food_loc = arg
    }
}
export default Food