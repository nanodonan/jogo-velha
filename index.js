/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const pontosX = [70, 250, 420]
const pontosY = [70, 250, 425]

let jogador = 2

const tabuleiro = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

class Bolinha {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        ctx.strokeStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.x + 50, this.y + 50, 60, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Xis {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.length = 100
    }
    draw() {
        ctx.strokeStyle = "red"
        drawLine({ x1: this.x, y1: this.y, x2: this.x + this.length, y2: this.y + this.length })
        drawLine({ x1: this.x, y1: this.y + this.length, x2: this.x + this.length, y2: this.y })

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


window.addEventListener("click", (e) => {
    const pos = getMousePos(canvas, e)
    updateTabuleiro(pos)
    const posTab = pegaPosicaoClicada(pos)
    
    if (jogador === 1) {
        const xis = new Xis(pontosX[posTab.y], pontosY[posTab.x])
        xis.draw()
        jogador = 2
    } else {
        const bolinha = new Bolinha(pontosX[posTab.y], pontosY[posTab.x])
        bolinha.draw()
        jogador = 1
    }

})

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
/*function setCel(pos) {
    const p = { ...pos }
    switch (true) {
        case (p.x <= 200 && p.y <= 200): p.x = 70; p.y = 70; break;
        case (p.x <= 400 && p.y <= 200): p.x = 250; p.y = 70; break;
        case (p.x <= 600 && p.y <= 200): p.x = 420; p.y = 70; break;
        case (p.x <= 200 && p.y <= 400): p.x = 70; p.y = 250; break;
        case (p.x <= 400 && p.y <= 400): p.x = 250; p.y = 250; break;
        case (p.x <= 600 && p.y <= 400): p.x = 420; p.y = 250; break;
        case (p.x <= 200 && p.y <= 600): p.x = 70; p.y = 425; break;
        case (p.x <= 400 && p.y <= 600): p.x = 250; p.y = 425; break;
        case (p.x <= 600 && p.y <= 600): p.x = 420; p.y = 425; break;
        default: break;
    }
    return p
}
*/

function updateTabuleiro(pos) {
    const posTab = pegaPosicaoClicada(pos)
    tabuleiro[posTab.x][posTab.y] = 2
}


function pegaPosicaoClicada(pos) {
    let resultadoX = -1
    let resultadoY = -1
    const range = {
        0: [0, 200],
        1: [200, 400],
        2: [400, 600]
    }
    for (const key of Object.keys(range)) {
        const min = range[key][0]
        const max = range[key][1]
        if (pos.y > min && pos.y < max) {
            resultadoX = key
        }
        if (pos.x > min && pos.x < max) {
            resultadoY = key
        }

    }

    return { x: resultadoX, y: resultadoY }
}
