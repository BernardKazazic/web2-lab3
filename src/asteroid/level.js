function Level(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.level = 0;
    this.update = (gameArea) => updateLevel(gameArea, this);
}

function updateLevel(gameArea, level) {
    calculateLevel(gameArea, level);
    drawLevel(gameArea.ctx, level);
}

function calculateLevel(gameArea, level) {
    level.level = Math.floor((gameArea.timer.sec + gameArea.timer.min * 60) / 30);
}

function drawLevel(ctx, level) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText("Level: " + `${level.level}`, level.posX, level.posY);
    ctx.restore();
}

export { Level };