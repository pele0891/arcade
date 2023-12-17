const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghost");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let foodColor = "#FEB897"
let score = 1;
let ghosts = [];
let ghostCount = 4;
let lives = 3;
let foodCount = 0;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;

let ghostLocation =  [
    {x: 0, y : 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x: 176, y: 121},    
];

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];


let randomTargetForGhosts = [
    {x:1 * oneBlockSize, y: 1 * oneBlockSize},
    {x:1 * oneBlockSize, y: (map.length - 2) * oneBlockSize},
    {x:(map[0].length - 2) * oneBlockSize, y: oneBlockSize},
    {x:(map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize},
];    

let gameLoop = () => {
    draw();
    update();
};

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 0) {
                foodCount++;
            }
        }
    }

let update = () => {
    pacman.moveProcess();
    pacman.eat();
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
    }

    if (pacman.checkGhostCollision()) {
        restartGame();
    }
    if (score >= foodCount) {
        drawWin();
        clearInterval(gameInterval);
    }
};

let restartGame = () => {
    createNewPacMan();
    createGhost();
    lives--;
    if (lives == 0) {
        gameOver();
    }
};

let gameOver = () => {
    drawGameOver();
    console.log("game over");
    clearInterval(gameInterval);
};

let drawLives = () => { 
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Lives: ", 230, oneBlockSize * (map.length + 1));
    for (let i = 0; i < lives; i++) {
        canvasContext.drawImage(
            pacmanFrames,
            2 * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            350 + i * oneBlockSize,
            oneBlockSize * map.length + 1,
            oneBlockSize,
            oneBlockSize
        );
    }
};

let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 0) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    foodColor
                );
            }
        }
    }
};

let drawGameOver = () => {
    canvasContext.font = "25px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Game Over!", 100, 230);
};

let drawWin = () => {
    canvasContext.font = "25px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Winner!", 130, 230);
};

let drawScore = () => {
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, 0, oneBlockSize * (map.length + 1));
};

let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
};

let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    drawFoods();
    drawScore();
    pacman.draw();
    drawGhosts();
    drawLives();
};

let gameInterval = setInterval(gameLoop, 1000 /fps);

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j <map[0].length; j++) {
            if (map[i][j] === 1) {
                createRect(
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize, 
                    wallColor);
            }
            if (j > 0 && map[i][j - 1] == 1){
                createRect(
                    j * oneBlockSize, 
                    i * oneBlockSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth, 
                    wallInnerColor);
            }
            if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                createRect(
                    j * oneBlockSize + wallOffset, 
                    i * oneBlockSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth, 
                    wallInnerColor);
            }
            if (i > 0 && map[i - 1][j] == 1){
                createRect(
                    j * oneBlockSize + wallOffset, 
                    i * oneBlockSize, 
                    wallSpaceWidth, 
                    wallSpaceWidth + wallOffset, 
                    wallInnerColor);
            }
            if (i < map.length - 1 && map[i + 1][j] == 1) {
                createRect(
                    j * oneBlockSize + wallOffset, 
                    i * oneBlockSize + wallOffset, 
                    wallSpaceWidth, 
                    wallSpaceWidth + wallOffset, 
                    wallInnerColor
                    );
            }
        }
    }
};

let createNewPacMan = () => {
    pacman = new PacMan(
        oneBlockSize, 
        oneBlockSize, 
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
};

let createGhost = () => {
    ghosts = [];
    for (let i = 0; i < ghostCount; i++) {
        let newGhost = new ghost(
            9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocation[i % 4].x,
            ghostLocation[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
    }
};

createNewPacMan();
createGhost();
gameLoop();

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            pacman.nextDirection = DIRECTION_LEFT;
        }
        else if (k == 38 || k == 87) {
            pacman.nextDirection = DIRECTION_UP;
        }
        else if (k == 39 || k == 68) {
            pacman.nextDirection =  DIRECTION_RIGHT;
        }
        else if (k == 40 || k == 83) {
            pacman.nextDirection = DIRECTION_DOWN;
        }
    }, 1);
});