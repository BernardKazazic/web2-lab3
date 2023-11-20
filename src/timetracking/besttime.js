function BestTime(fps, posX, posY) {
    this.fps = fps;
    this.posX = posX;
    this.posY = posY;
    this.min = 0;
    this.sec = 0;
    this.milisec = 0;
    this.time = 0;
    this.update = (ctx) => updateBestTime(ctx, this);
}

function updateBestTime(ctx, bestTime) {
    calculateTime(bestTime);
    drawBestTime(ctx, bestTime);
}

function calculateTime(bestTime) {
    bestTime.time = getBestTime();
    bestTime.min = Math.floor(bestTime.time / 60);
    bestTime.sec = Math.floor(bestTime.time % 60);
    bestTime.milisec = Math.floor((bestTime.time % 1) * 100);
}

function getBestTime() {
    const bestTime = localStorage.getItem('time');
    if(!bestTime) {
        return 0;
    }
    return bestTime;
}

function drawBestTime(ctx, bestTime) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText("Best time: " + `${bestTime.min}:${bestTime.sec}:${bestTime.milisec}`, bestTime.posX, bestTime.posY);
    ctx.restore();
}

export { BestTime };