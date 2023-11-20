function Timer(fps, posX, posY) {
    this.fps = fps;
    this.posX = posX;
    this.posY = posY;
    this.min = 0;
    this.sec = 0;
    this.milisec = 0;
    this.time = 0;
    this.update = (ctx) => updateTimer(ctx, this);
    this.stop = () => stopTimer(this);
}

function updateTimer(ctx, timer) {
    calculateTime(timer);
    drawTimer(ctx, timer);
}

function calculateTime(timer) {
    timer.time += 1 / timer.fps;
    timer.min = Math.floor(timer.time / 60);
    timer.sec = Math.floor(timer.time % 60);
    timer.milisec = Math.floor((timer.time % 1) * 100);
}

function drawTimer(ctx, timer) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText("Current time: " + `${timer.min}:${timer.sec}:${timer.milisec}`, timer.posX, timer.posY);
    ctx.restore();
}

function stopTimer(timer) {
    const bestTime = localStorage.getItem('time');
    if(!bestTime || timer.time > bestTime) {
        localStorage.setItem('time', timer.time);
    }
}

export { Timer };