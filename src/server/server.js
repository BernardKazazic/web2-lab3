const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/asteroids.html'));
});

app.get('/game.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../game.js'));
});

app.get('/canvas.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../canvas/canvas.js'));
});

app.get('/player.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../player/player.js'));
});

app.get('/timer.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../timetracking/timetracking.js'));
});

app.get('/besttime.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../timetracking/besttime.js'));
});

app.get('/level.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../asteroid/level.js'));
});

app.get('/asteroid.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../asteroid/asteroid.js'));
});

app.get('/laser.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../player/laser.js'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});