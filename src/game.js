import { GameArea } from '/canvas.js';

const FPS = 60;
const BORDER_WIDTH = 6;
const WIDTH = window.innerWidth - 2 * BORDER_WIDTH;
const HEIGHT = window.innerHeight - 2 * BORDER_WIDTH;

function startGame() {
    const game = new GameArea(FPS, WIDTH, HEIGHT);
    game.start();

    document.addEventListener("keydown", (event) => game.player.movementPress(event.key));
    document.addEventListener("keyup", (event) => game.player.movementRelease(event.key));
}
  
document.addEventListener("DOMContentLoaded", startGame);
