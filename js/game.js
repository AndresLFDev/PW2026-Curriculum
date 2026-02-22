const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 448
canvas.height = 400
/* VARIABLES DE LA PELOTA */
const radiusBall = 4;
//posicion 
let x = canvas.width / 2
let y = canvas.height - 30
//Velocidad
let dx = 3
let dy = -3

/* VARIABLES DE LA PALETA */
const paddleHeight = 10;
const paddleWidth = 60;
const paddleSensitivity = 4;

//posicion
let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 10

//Movimiento
let rightPressed = false
let leftPressed = false

/* VARIABLE DE LOS LADRILLOS*/
const brickRowCount = 6;
const brickColmnCount = 13;
const brickWidth = 30;
const brickHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft = 18;
const bricks = [];
const brickStatus = { ACTIVE: 1, DESTROYED: 0 }

for (let c = 0; c < brickColmnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop

        const ramdom = Math.floor(Math.random * 8)
        bricks[c][r] = { x: brickX, y: brickY, status: brickStatus.ACTIVE, color: ramdom }
    }
}

/* DIBUJAR */
function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, radiusBall, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}
function drawPaddel() {
    ctx.fillStyle = '#2873dbff'
    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight)
}
function drawBrick() {
    for (let c = 0; c < brickColmnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r]
            if (currentBrick.status != brickStatus.DESTROYED) {
                ctx.fillStyle = 'white'
                ctx.rect(
                    currentBrick.x,
                    currentBrick.y,
                    brickWidth,
                    brickHeight
                )
                ctx.fill()
            }
        }
    }
}

/* Moviento */
function colisionDection() {
    for (let c = 0; c < brickColmnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r]
            if (currentBrick.status === brickStatus.ACTIVE) {
                const isBallSameXAsBrick =
                    x - radiusBall > currentBrick.x &&
                    x - radiusBall < currentBrick.x + brickWidth
                const isBallSameYAsBrick =
                    y - radiusBall > currentBrick.y &&
                    y - radiusBall < currentBrick.y + brickHeight

                if (isBallSameXAsBrick && isBallSameYAsBrick) {
                    dy = -dy
                    currentBrick.status = brickStatus.DESTROYED
                }
            }
        }
    }
}

function ballMovement() {

    //Rebotar en los laterales
    if (x + dx > canvas.width - radiusBall ||
        x + dx < radiusBall
    ) {
        dx = -dx
    }

    //Rebotar Superior
    if (y + dy < radiusBall) {
        dy = -dy
    }

    //Rebote Inferior

    isBallSameXAsPabble = x > paddleX && x < paddleWidth + paddleX
    isBallSameYAsPaddle = (y > paddleY - radiusBall)
    if (isBallSameXAsPabble && isBallSameYAsPaddle) {
        dy = -dy
    }
    else if (y + dy > canvas.height - 10 - radiusBall) {
        console.log('Game Over')
        document.location.reload()
    }
    x += dx
    y += dy
}
function paddlemovement() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSensitivity
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSensitivity
    }
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvent() {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler(event) {
        const { key } = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = true
        } else if (key == 'Left' || key === 'ArrowLeft') {
            leftPressed = true
        }
    }

    function keyUpHandler(event) {
        const { key } = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = false
        } else if (key == 'Left' || key === 'ArrowLeft') {
            leftPressed = false
        }
    }
}

function draw() {
    console.log(rightPressed, leftPressed);

    cleanCanvas()

    drawBall()
    drawPaddel()
    drawBrick()

    colisionDection()

    ballMovement()
    paddlemovement()
    window.requestAnimationFrame(draw)
}

draw()
initEvent()