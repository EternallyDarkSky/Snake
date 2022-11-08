
import Snake from "./Snake"
import Food from "./food"

enum OCCUP{
    unfill,fill
}

class Panel {
    total_size:number
    cur_size:number
    panel: Array<Array<number>> = [[]] 
    pannelNode:HTMLElement
    constructor(row: number, col: number,pannelID:string) {
        this.init_panel(row,col)
        this.pannelNode = document.getElementById(pannelID)! 
        this.total_size = row*col
        this.cur_size = 0
    }
    state(snake:Snake){
        // clear
        for (var i = 0; i < this.panel.length; i++) {
            this.panel[i].fill(OCCUP.unfill)
        }
        this.cur_size = 0
        // set
        for(let item of snake.body.entries()){
            let x:number = item[1][0]
            let y:number = item[1][1]
            this.panel[x][y] = OCCUP.fill
            this.cur_size +=1
        }
        
    }
    is_full_occupa():boolean{
        if(this.cur_size >= this.total_size){
            return true
        }
        return false
    }
    
    private init_panel(row: number, col: number){
        this.panel = new Array(row)
        for (var i = 0; i < row; i++) {
            this.panel[i] = new Array(col); // make each element an array
            this.panel[i].fill(OCCUP.unfill)
        }
    }
    // 判断面板的某个位置(x,y)是否占据
    is_occupa(x:number,y:number):boolean{
        if(this.panel[x][y]==OCCUP.fill){
            return true
        }
        return false
    }
    // 面板展示--TO HTML
    panel_show(snake:Snake,food:Food){
        this.snake_show(snake)
        this.food_show(food)
    }
    private snake_show(snake:Snake,snakeid:string="snake"){
        // 1. 创建div
        let  SnakeElem:HTMLElement = document.getElementById(snakeid) !     
        let newSnakeElem:HTMLElement = document.createElement("div")
        newSnakeElem.id = SnakeElem.id
        for(let item of snake.body.entries()){
            let div:HTMLElement = document.createElement("div")
            if(item[0]==0){
                div.style.backgroundColor='blue'
            }
            div.style.left = item[1][0]*0.12 +"rem"
            div.style.top = item[1][1]*0.12 +"rem"
            newSnakeElem.appendChild(div)
        }
        this.pannelNode.replaceChild(newSnakeElem,SnakeElem)
    }
    private food_show(food:Food,foodid:string="food"){
        // 1. 创建div
        let foodElem:HTMLElement = document.getElementById(foodid)!
        foodElem.style.left = food.x*0.12 +"rem"
        foodElem.style.top = food.y*0.12 +"rem"
    
    }

}

export default Panel


// let pannel =  new Pannel(25,25,'stage')
// console.log( pannel);