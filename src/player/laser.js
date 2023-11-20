const LASER_SPEED = 20;

function Laser(id, posX, posY, angle) {
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.speed = {
        x: 0,
        y: 0
    };
    this.color = "orange";
    this.width = 15;
    this.height = 3;
    this.update = (gameArea) => updateLaser(gameArea, this);
}

function updateLaser(gameArea, laser) {
    calculateSpeed(laser);
    calculateNewPosition(laser);
    checkWidthBoundaries(gameArea, laser);
    checkHeightBoundaries(gameArea, laser);
    drawLaser(gameArea.ctx, laser);
}

function drawLaser(ctx, laser) {
    ctx.save();
    ctx.translate(laser.posX, laser.posY);
    ctx.rotate(laser.angle);
    ctx.fillStyle = laser.color;
    ctx.fillRect(-laser.width / 2, -laser.height / 2, laser.width, laser.height);
    ctx.restore();
}

function calculateSpeed(laser) {
    laser.speed.x = -LASER_SPEED * Math.cos(laser.angle);
    laser.speed.y = -LASER_SPEED * Math.sin(laser.angle);
}

function calculateNewPosition(laser) {
    laser.posX = laser.posX + laser.speed.x;
    laser.posY = laser.posY + laser.speed.y;
}

function checkWidthBoundaries(gameArea, laser) {
    const canvas = gameArea.canvas;
    if (laser.posX < 0 - laser.width / 2 || laser.posX > canvas.width + laser.width / 2) {
        gameArea.player.lasers.delete(laser.id);
    }
}

function checkHeightBoundaries(gameArea, laser) {
    const canvas = gameArea.canvas;
    if (laser.posY < 0 - laser.height / 2 || laser.posY > canvas.height + laser.height / 2) {
        gameArea.player.lasers.delete(laser.id);
    }
}

export { Laser };