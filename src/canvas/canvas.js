import { Player } from '/player.js';
import { Timer } from '/timer.js';
import { BestTime } from '/besttime.js';
import { Level } from '/level.js';
import { Asteroid } from '/asteroid.js';

const STARTING_ASTEROIDS = 2;

function GameArea(fps, width, height) {
    this.fps = fps;
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.player;
    this.asteroids = new Map();
    this.asteroidsId = 0;
    this.timer;
    this.bestTime;
    this.level;
    this.ctx;
    this.interval;
    this.start = () => initCanvas(this);
    this.clear = () => clearGameArea(this);
    this.stop = () => stopGame(this);
}

function initCanvas(gameArea) {
    resizeCanvas(gameArea);
    gameArea.ctx = gameArea.canvas.getContext('2d');
    addShadows(gameArea);
    addPlayer(gameArea);
    addTimer(gameArea);
    addBestTime(gameArea);
    addLevel(gameArea);
    generateAsteroids(gameArea);

    document.getElementById('game').appendChild(gameArea.canvas);
    gameArea.interval = setInterval(() => updateGameArea(gameArea), 1000 / gameArea.fps);
}

function resizeCanvas(gameArea) {
    gameArea.canvas.width = gameArea.width;
    gameArea.canvas.height = gameArea.height;
}

function addShadows(gameArea) {
    gameArea.ctx.shadowBlur = 20;
    gameArea.ctx.shadowColor = 'white';
}

function addPlayer(gameArea) {
    gameArea.player = new Player(gameArea.fps, gameArea.width / 2, gameArea.height / 2, 90, 20, 20);
}

function updateGameArea(gameArea) {
    gameArea.clear();
    gameArea.ctx.fillStyle = 'black';
    gameArea.ctx.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
    gameArea.player.update(gameArea);
    gameArea.timer.update(gameArea.ctx);
    gameArea.bestTime.update(gameArea.ctx);
    gameArea.level.update(gameArea);
    updateAsteroids(gameArea);
    checkLaserAsteroidColision(gameArea);
    checkColision(gameArea);
}

function clearGameArea(gameArea) {
    gameArea.ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
}

function stopGame(gameArea) {
    gameArea.timer.stop();
    gameOver(gameArea);
    clearInterval(gameArea.interval);
}

function addTimer(gameArea) {
    gameArea.timer = new Timer(gameArea.fps, gameArea.width - 20, 20);
}

function addBestTime(gameArea) {
    gameArea.bestTime = new BestTime(gameArea.fps, gameArea.width - 20, 40);
}

function addLevel(gameArea) {
    gameArea.level = new Level(gameArea.width - 20, 60);
}

function generateAsteroids(gameArea) {
    const asteroidGenerationTreshold = (1 / gameArea.fps) * (STARTING_ASTEROIDS + gameArea.level.level) / 2;
    const asteroidGenerationChance = Math.random();
    if(asteroidGenerationChance < asteroidGenerationTreshold) {
        const asteroid = new Asteroid(gameArea.asteroidsId, gameArea.width, gameArea.height);
        gameArea.asteroids.set(gameArea.asteroidsId, asteroid)
        gameArea.asteroidsId++;
    }
}

function updateAsteroids(gameArea) {
    generateAsteroids(gameArea);
    gameArea.asteroids.forEach(asteroid => asteroid.update(gameArea, asteroid));
}

function checkLaserAsteroidColision(gameArea) {
    gameArea.player.lasers.forEach(laser => {
        gameArea.asteroids.forEach(asteroid => {
            if(checkColisionWithLaser(laser, asteroid)) {
                gameArea.player.lasers.delete(laser.id);
                gameArea.asteroids.delete(asteroid.index);
            }
        });
    });
}

function checkColisionWithLaser(laser, asteroid) {
    const laserLeft = laser.posX - laser.width / 2;
    const laserRight = laser.posX + laser.width / 2;
    const laserTop = laser.posY - laser.height / 2;
    const laserBottom = laser.posY + laser.height / 2;

    const asteroidLeft = asteroid.posX - asteroid.size / 2;
    const asteroidRight = asteroid.posX + asteroid.size / 2;
    const asteroidTop = asteroid.posY - asteroid.size / 2;
    const asteroidBottom = asteroid.posY + asteroid.size / 2;

    return laserLeft < asteroidRight && laserRight > asteroidLeft && laserTop < asteroidBottom && laserBottom > asteroidTop;
}

function checkColision(gameArea) {
    gameArea.asteroids.forEach(asteroid => {
        if(checkColisionWithPlayer(gameArea, asteroid)) {
            gameArea.stop();
        }
    });
}

function checkColisionWithPlayer(gameArea, asteroid) {
    const player = gameArea.player;
    const playerLeft = player.posX - player.width / 2;
    const playerRight = player.posX + player.width / 2;
    const playerTop = player.posY - player.height / 2;
    const playerBottom = player.posY + player.height / 2;

    const asteroidLeft = asteroid.posX - asteroid.size / 2;
    const asteroidRight = asteroid.posX + asteroid.size / 2;
    const asteroidTop = asteroid.posY - asteroid.size / 2;
    const asteroidBottom = asteroid.posY + asteroid.size / 2;

    return playerLeft < asteroidRight && playerRight > asteroidLeft && playerTop < asteroidBottom && playerBottom > asteroidTop;
}

function gameOver(gameArea) {
    const ctx = gameArea.ctx;
    const canvasWidth = gameArea.canvas.width;
    const canvasHeight = gameArea.canvas.height;
    const timer = gameArea.timer;

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over Your time: " + `${timer.min}:${timer.sec}:${timer.milisec}`, canvasWidth / 2, canvasHeight / 2);
}

export { GameArea };