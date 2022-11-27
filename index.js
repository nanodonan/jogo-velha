/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 300

class Bolinha{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    draw(){
        console.log("THIS X e Y: ", this)
        ctx.fillRect(this.x,this.y,30,30)
    }

}

//ctx.fillStyle = "black"
//ctx.fillRect(5,5,20,20)

ctx.font = "15px arial"
//ctx.fillText("Hello World", 10,20)

window.addEventListener("click", (e)=>{
 console.log("E: ",e)
 //ctx.fillText("X", e.x, e.y)
 const pos = getMousePos(canvas,e)
 console.log("POS: ",pos)
 const bolinha = new Bolinha(pos.x, pos.y)
 bolinha.draw()
})

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}