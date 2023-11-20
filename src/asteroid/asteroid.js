const ASTEROID_SPEED = 2;
const ASTEROID_SIZE = 30;

function Asteroid(key, canvasWidth, canvasHeight) {
    this.index = key;
    this.posX = generateXPosition(canvasWidth);
    this.posY = generateYPosition(canvasHeight);
    this.angle = calculateAngle(this, canvasWidth, canvasHeight);
    this.randomSpeed = ASTEROID_SPEED * Math.random();
    this.speed = {
        x: generateXSpeed(this),
        y: generateYSpeed(this)
    };
    this.size = generateSize();
    this.colour = generateColour();
    this.update = (gameArea) => updateAsteroid(gameArea, this);
}

function generateXPosition(canvasWidth) {
    const rand = Math.random();
    return rand < 0.5 ? Math.random() * -100 : Math.random() * 100 + canvasWidth;
}

function generateYPosition(canvasHeight) {
    const rand = Math.random();
    return rand < 0.5 ? Math.random() * -100 : Math.random() * 100 + canvasHeight;
}

function calculateAngle(asteroid, canvasWidth, canvasHeight) {
    const x1 = asteroid.posX;
    const y1 = asteroid.posY;
    const x2 = Math.random() * canvasWidth;
    const y2 = Math.random() * canvasHeight;

    return Math.atan2( y2 - y1, x2 - x1 )
}

function generateXSpeed(asteroid) {
    return Math.cos(asteroid.angle) * asteroid.randomSpeed;
}

function generateYSpeed(asteroid) {
    return Math.sin(asteroid.angle) * asteroid.randomSpeed;
}

function generateSize() {
    return ASTEROID_SIZE * Math.random() + ASTEROID_SIZE;
}

function generateColour() {
    const generatedColor = Math.floor(Math.random() * 256);
    return `rgb(${generatedColor}, ${generatedColor}, ${generatedColor})`;
}

function updateAsteroid(gameArea, asteroid) {
    calculateNewPosition(asteroid);
    checkWidthBoundaries(gameArea, asteroid);
    checkHeightBoundaries(gameArea, asteroid);
    drawAsteroid(gameArea.ctx, asteroid);
}

function calculateNewPosition(asteroid) {
    asteroid.posX = asteroid.posX + asteroid.speed.x;
    asteroid.posY = asteroid.posY + asteroid.speed.y;
}

function drawAsteroid(ctx, asteroid) {
    ctx.save();
    ctx.translate(asteroid.posX, asteroid.posY);
    ctx.fillStyle = asteroid.colour;
    ctx.fillRect(asteroid.size / -2, asteroid.size / -2, asteroid.size, asteroid.size);
    ctx.restore();
}

function checkWidthBoundaries(gameArea, asteroid) {
    if(asteroid.posX < (-100 - asteroid.size / 2)) {
        gameArea.asteroids.delete(asteroid.index);
    }
    else if(asteroid.posX > (gameArea.canvas.width + asteroid.size / 2 + 100)) {
        gameArea.asteroids.delete(asteroid.index);
    }
}

function checkHeightBoundaries(gameArea, asteroid) {
    if(asteroid.posY < (-100 - asteroid.size / 2)) {
        gameArea.asteroids.delete(asteroid.index);
    }
    else if(asteroid.posY > (gameArea.canvas.height + asteroid.size / 2 + 100)) {
        gameArea.asteroids.delete(asteroid.index);
    }
}

export { Asteroid };