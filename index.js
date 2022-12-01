/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

class Bolinha {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        ctx.fillStyle = "blue"
        ctx.font = "150px arial"
        ctx.fillText("O", this.x, this.y)
    }
}

class Xis {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        ctx.fillStyle = "red"
        ctx.font = "150px arial"
        ctx.fillText("X", this.x, this.y)
    }
}

function drawLine(line) {
    ctx.lineWidth = 10
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
}

const linhas = [
    {
        x1: CANVAS_WIDTH / 3,
        y1: 50,
        x2: CANVAS_WIDTH / 3,
        y2: CANVAS_HEIGHT - 50
    },
    {
        x1: CANVAS_WIDTH - (CANVAS_WIDTH / 3),
        y1: 50,
        x2: CANVAS_WIDTH - (CANVAS_WIDTH / 3),
        y2: CANVAS_HEIGHT - 50
    },
    {
        x1: 50,
        y1: CANVAS_HEIGHT / 3,
        x2: CANVAS_WIDTH - 50,
        y2: CANVAS_HEIGHT / 3
    },
    {
        x1: 50,
        y1: CANVAS_HEIGHT - (CANVAS_HEIGHT / 3),
        x2: CANVAS_WIDTH - 50,
        y2: CANVAS_HEIGHT - (CANVAS_HEIGHT / 3)
    }
]
//desenhando o tabuleiro
linhas.forEach(line => { drawLine(line) })

window.addEventListener("auxclick", (e) => {
    const pos = getMousePos(canvas, e)
    const cel = setCel(pos)
    const bolinha = new Bolinha(cel.x, cel.y)
    bolinha.draw()
})

window.addEventListener("click", (e) => {
    const pos = getMousePos(canvas, e)
    const cel = setCel(pos)
    const xis = new Xis(cel.x, cel.y)
    xis.draw()
})

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
function setCel(p) {
    switch (true) {
        case (p.x <= 200 && p.y <= 200): p.x = 70; p.y = 175; break;
        case (p.x <= 400 && p.y <= 200): p.x = 250; p.y = 175; break;
        case (p.x <= 600 && p.y <= 200): p.x = 420; p.y = 175; break;
        case (p.x <= 200 && p.y <= 400): p.x = 70; p.y = 350; break;
        case (p.x <= 400 && p.y <= 400): p.x = 250; p.y = 350; break;
        case (p.x <= 600 && p.y <= 400): p.x = 420; p.y = 350; break;
        case (p.x <= 200 && p.y <= 600): p.x = 70; p.y = 525; break;
        case (p.x <= 400 && p.y <= 600): p.x = 250; p.y = 525; break;
        case (p.x <= 600 && p.y <= 600): p.x = 420; p.y = 525; break;
        default: break;
    }
    console.log("como ficou o P: ", p)
    return p
}


