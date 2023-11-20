import { Laser } from '/laser.js';

const TURN_SPEED = 360;
const DRAG = 0.95;

function Player(fps, startingPosX, startingPosY, degreeAngle, playerWidth, playerHeight) {
    this.fps = fps;
    this.posX = startingPosX;
    this.posY = startingPosY;
    this.angle = degreeToRadians(degreeAngle);
    this.width = playerWidth;
    this.height = playerHeight;
    this.speed = {
        x: 0,
        y: 0
    };
    this.acceleration = 0;
    this.keyState = {"ArrowUp" : false, "ArrowLeft": false, "ArrowRight": false, " ": false};
    this.shotReady = true;
    this.lasers = new Map();
    this.laserId = 0;
    this.update = (gameArea) => updatePlayer(gameArea, this);
    this.movementPress = (key) => movementPress(this, key);
    this.movementRelease = (key) => movementRelease(this, key);
}

function updatePlayer(gameArea, player) {
    applyMovementCommands(player);
    calculateSpeed(player);
    calculateNewPosition(player);
    checkBoundaries(gameArea.canvas, player);
    drawPlayer(gameArea.ctx, player);
    updateLasers(gameArea, player);
}

function checkBoundaries(canvas, player) {
    checkWidthBoundaries(canvas, player);
    checkHeightBoundaries(canvas, player);
}

function drawPlayer(ctx, player) {
    ctx.save();
    ctx.translate(player.posX, player.posY);
    ctx.rotate(player.angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();
}

function calculateSpeed(player) {
    if(player.acceleration === 0) {
        player.speed.x *= DRAG;
        player.speed.y *= DRAG;
        return;
    }

    player.speed.x -= player.acceleration * Math.cos(player.angle) / player.fps;
    player.speed.y -= player.acceleration * Math.sin(player.angle) / player.fps;
}

function calculateNewPosition(player) {
    player.posX = player.posX + player.speed.x;
    player.posY = player.posY + player.speed.y;
}

function movementPress(player, key) {
    player.keyState[key] = true;
}

function movementRelease(player, key) {
    player.keyState[key] = false;
}

function applyMovementCommands(player) {
    if (player.keyState['ArrowUp']) {
      player.acceleration = 5;
    }
    else {
        player.acceleration = 0;
    }

    if (player.keyState['ArrowLeft']) {
      player.angle -= degreeToRadians(TURN_SPEED / player.fps);
    }

    if (player.keyState['ArrowRight']) {
      player.angle += degreeToRadians(TURN_SPEED / player.fps);
    }

    if (player.keyState[' ']) {
        if(player.shotReady) {
            player.shotReady = false;
            const laser = new Laser(player.laserId, player.posX, player.posY, player.angle);
            player.lasers.set(player.laserId, laser);
            player.laserId++;
            setTimeout(() => player.shotReady = true, 250);
        }
    }
}

function checkWidthBoundaries(canvas, player) {
    if (player.posX < 0 - player.width / 2) {
        player.posX = canvas.width + player.width / 2;
    }
    else if (player.posX > canvas.width + player.width / 2) {
        player.posX = 0 - player.width / 2;
    }
}

function checkHeightBoundaries(canvas, player) {
    if (player.posY < 0 - player.height / 2) {
        player.posY = canvas.height + player.height / 2;
    }
    else if (player.posY > canvas.height + player.height / 2) {
        player.posY = 0 - player.height / 2;
    }
}

function degreeToRadians(angle) {
    return angle * (Math.PI / 180);
}

function updateLasers(gameArea, player) {
    player.lasers.forEach(laser => laser.update(gameArea));
}

export { Player };