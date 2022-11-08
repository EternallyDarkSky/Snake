type SquareCorner = [number,number]
class SquareWall{
    
    private readonly  corner_left_top:SquareCorner;
    private readonly corner_right_top:SquareCorner;
    private readonly corner_left_bottom:SquareCorner;
    private readonly corner_right_bottom:SquareCorner;
    constructor(xMin:number,xMax:number,yMin:number,yMax:number){
        this.corner_left_top=[xMin,yMin];
        this.corner_right_top=[xMax,yMin];
        this.corner_left_bottom=[xMin,yMax];
        this.corner_right_bottom=[xMax,yMax];
    }

    is_crash_dection(loc_x:number,loc_y:number):boolean{
        return  this.crash_top_wall(loc_x,loc_y)||
            this.crash_bottom_wall(loc_x,loc_y)||
            this.crash_left_wall(loc_x,loc_y)||
            this.crash_right_wall(loc_x,loc_y) ;
    }
    private crash_top_wall(loc_x:number,loc_y:number):boolean{
        if(loc_y <= this.corner_left_top[1]){
            return true
        }
        return false
    }
    private crash_bottom_wall(loc_x:number,loc_y:number):boolean{
        if(loc_y >= this.corner_right_bottom[1]){
            return true
        }
        return false
    }
    private crash_left_wall(loc_x:number,loc_y:number):boolean{
        if(loc_x <= this.corner_left_top[0]){
            return true
        }
        return false
    }
    private crash_right_wall(loc_x:number,loc_y:number):boolean{
        if(loc_x >= this.corner_right_bottom[0]){
            return true
        }
        return false
    }
}
// let wall:SquareWall = new SquareWall(-1,25,-1,25)
// console.log(wall.is_crash_dection(-1,-1));
export default SquareWall
