const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pawnWhite = document.getElementById("pawnWhite");
const pawnBlack = document.getElementById("pawnBlack");
const rookWhite = document.getElementById("rookWhite");
const rookBlack = document.getElementById("rookBlack");
const knightWhite = document.getElementById("knightWhite");
const knightBlack = document.getElementById("knightBlack");
const bishopWhite = document.getElementById("bishopWhite");
const bishopBlack = document.getElementById("bishopBlack");
const queenWhite = document.getElementById("queenWhite");
const queenBlack = document.getElementById("queenBlack");
const kingWhite = document.getElementById("kingWhite");
const kingBlack = document.getElementById("kingBlack");

//add multiplayer
// -add multiple people
// -create lobby
// pvp or pve
//chess bot api
//castle
//change to dictionary
//add multiplayer pacman

let oneBlockSize = 80;

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

let firstClick = false;
let firstPieceX = 99;
let firstPieceY = 99;
let secondPieceX = 99;
let secondPieceY = 99;
let turnCount = 1;
let pieces = [];
let takenBlackIncrement = 0;
let takenWhiteIncrement = 0;
let check = false;
let ifcheckMate = false;
let isRunning = true;

let firstPiece = new Piece();
let newPiece = new Piece;
pieces = newPiece.createPieces();


let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

let drawBoard = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++)
        {
            if ((i + j) % 2) {
                createRect(                    
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize, 
                    "white");
            }
            else {
                createRect(                    
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize, 
                    "#90ee90");
            }
        }
    }
    createRect(0, 0, board[0].length * oneBlockSize, oneBlockSize/50, "Black"); // Top border
    createRect(0, 0, oneBlockSize/50, board.length * oneBlockSize, "Black"); // Left border
    createRect(
        0,
        board.length * oneBlockSize,
        board[0].length * oneBlockSize,
        oneBlockSize/50,
        "Black"
    ); // Bottom border
    createRect(
        board[0].length * oneBlockSize,
        0,
        oneBlockSize/50,
        board.length * oneBlockSize,
        "Black"
    ); // Right border
};


let drawPieces = () => {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].pieceV == "pawn") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    pawnWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    pawnBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
        }
        else if (pieces[i].pieceV == "rook") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    rookWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    rookBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
        }
        else if (pieces[i].pieceV == "knight") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    knightWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    knightBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
        }
        else if (pieces[i].pieceV == "bishop") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    bishopWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    bishopBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
        }
        else if (pieces[i].pieceV == "queen") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    queenWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    queenBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
        }
        else if (pieces[i].pieceV == "king") {
            if (pieces[i].black_or_white == "white") {
                canvasContext.save()
                canvasContext.drawImage(
                    kingWhite, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            }
            else if (pieces[i].black_or_white == "black") {
                canvasContext.save()
                canvasContext.drawImage(
                    kingBlack, 
                    pieces[i].positionX * oneBlockSize, 
                    pieces[i].positionY  * oneBlockSize, 
                    oneBlockSize,
                    oneBlockSize
                    );
                    canvasContext.restore();
            };
        }
    }
}


let movePiece = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    x = (Math.floor(mouseX / 80) * 100) / 100;
    y = (Math.floor(mouseY / 80) * 100) / 100;
    if (firstClick == false)
    {
        firstPieceX = x;
        firstPieceY = y;
        firstPiece = firstPiece.findPiece(firstPieceX, firstPieceY, pieces);
        firstClick = true;
    }
    else {
        let secondPiece = new Piece;
        secondPieceX = x;
        secondPieceY = y;
        if ((secondPieceX >= 0 && secondPieceX < board.length && secondPieceY >= 0 && secondPieceY < board.length)
            && (firstPiece.samePieceExists(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) == false)){
            switch(firstPiece.pieceV) {
                case "pawn":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if ((firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces))
                            && (firstPiece.oppositePieceExists(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) == false)) {
                            if (turnCount % 2 == 1 && firstPiece.black_or_white == "white") {
                                //white
                                if (firstPieceY == 6) {
                                    if (((secondPieceY == firstPieceY - 1) || (secondPieceY == firstPieceY - 2))
                                        && secondPieceX == firstPieceX) {
                                            if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                                firstPiece.positionX = secondPieceX; 
                                                firstPiece.positionY = secondPieceY;
                                                turnCount += 1;
                                            }
                                    }
                                }
                                else if (secondPieceY == firstPieceY - 1 && secondPieceX == firstPieceX && firstPieceY != 6) {
                                    if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                        firstPiece.positionX = secondPieceX; 
                                        firstPiece.positionY = secondPieceY;
                                        turnCount += 1;
                                    }
                                }
                            }
                            else if (turnCount % 2 == 0 && firstPiece.black_or_white == "black"){
                                if (firstPieceY == 1) {
                                    if (((secondPieceY == firstPieceY + 1) || (secondPieceY == firstPieceY + 2))
                                        && secondPieceX == firstPieceX) {
                                            if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                                firstPiece.positionX = secondPieceX; 
                                                firstPiece.positionY = secondPieceY;
                                                turnCount += 1;
                                            }
                                    }
                                }
                                else if (secondPieceY == firstPieceY + 1 && secondPieceX == firstPieceX && firstPieceY != 1) {
                                    if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                        firstPiece.positionX = secondPieceX; 
                                        firstPiece.positionY = secondPieceY;
                                        turnCount += 1;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        turnCount += 1;
                    }
                    break;
                case "rook":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if (firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) 
                        && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                        || (turnCount % 2 == 1 && firstPiece.black_or_white == "white"))) {
                            if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                firstPiece.positionX = secondPieceX; 
                                firstPiece.positionY = secondPieceY;
                                turnCount += 1;
                            }
                        }
                    }
                    else {
                        turnCount += 1;
                    }
                    break;
                case "knight":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if (((secondPieceY == firstPieceY + 2) || (secondPieceY == firstPieceY - 2))
                            && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                            || (turnCount % 2 == 1 && firstPiece.black_or_white == "white"))) {
                            if ((secondPieceX == firstPieceX + 1) || (secondPieceX == firstPieceX - 1)) {
                                if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                    firstPiece.positionX = secondPieceX; 
                                    firstPiece.positionY = secondPieceY;
                                    turnCount += 1;
                                }
                            }
                        }
                        else if (((secondPieceX == firstPieceX + 2) || (secondPieceX == firstPieceX - 2))
                            && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                            || (turnCount % 2 == 1 && firstPiece.black_or_white == "white"))){
                            if ((secondPieceY == firstPieceY + 1) || (secondPieceY == firstPieceY - 1)) {
                                if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                    firstPiece.positionX = secondPieceX; 
                                    firstPiece.positionY = secondPieceY;
                                    turnCount += 1;
                                }
                            }
                        }
                    }    
                    else {
                        turnCount += 1;
                    }                
                    break;
                case "bishop":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if (firstPiece.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) 
                        && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                        || (turnCount % 2 == 1 && firstPiece.black_or_white == "white"))){
                            if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                firstPiece.positionX = secondPieceX; 
                                firstPiece.positionY = secondPieceY;
                                turnCount += 1;
                            }
                        }
                    }
                    else {
                        turnCount += 1;
                    }
                    break;
                case "queen":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if ((((firstPiece.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) 
                        || (firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)))
                        && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                        || (turnCount % 2 == 1 && firstPiece.black_or_white == "white")))
                        && ifCheck(pieces) == false);
                        {
                            if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                firstPiece.positionX = secondPieceX; 
                                firstPiece.positionY = secondPieceY;
                                turnCount += 1;
                            }
                        }
                    }
                    else {
                        turnCount += 1;
                    }
                    break;
                case "king":
                    if (firstPiece.attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) == false) {
                        if (((firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) 
                        || (firstPiece.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)))
                        && ((turnCount % 2 == 0 && firstPiece.black_or_white == "black") 
                        || (turnCount % 2 == 1 && firstPiece.black_or_white == "white")))
                        {
                            if ((secondPieceY == (firstPieceY + 1) || secondPieceY == (firstPieceY - 1)) 
                                || (secondPieceX == (firstPieceX + 1) || secondPieceX == (firstPieceX - 1))){
                                    if (ownCheck(firstPiece, secondPiece.positionX, secondPiece.positionY, pieces) == false){
                                        firstPiece.positionX = secondPieceX; 
                                        firstPiece.positionY = secondPieceY;
                                        turnCount += 1;
                                    }
                            }
                        }
                    }
                    else {
                        turnCount += 1;
                    }
                    break;
                default:
                    break;
                }
            }
        console.log(turnCount);
        firstClick = false;
    }
}


let showStatus = () => {
    canvasContext.clearRect(650, 250, 150, 100);
    canvasContext.font = "25px Emulogic";
    canvasContext.fillStyle = "black";
    if (turnCount % 2 == 1) {
        canvasContext.fillText("White", 680, 300);
    }
    else {
        canvasContext.fillText("Black", 680, 300);
    }
    if (ifCheck(pieces)) {
        check = true;
        console.log("CHECK");
        drawCheck();
    }
    else {
        check = false;
    }
    if (checkMate(pieces) == true) {
        ifcheckMate = true;
        console.log("CHECKMATE");
        drawCheckMate();
        isRunning = false;
    }
}

let drawCheck = () => { //add draw check so that it doesnt remove turn
    if (check == true) {
        canvasContext.font = "25px Emulogic";
        canvasContext.fillStyle = "black";
        canvasContext.fillText("CHECK", 650, 350);
    }
}

let drawCheckMate = () => { //add draw check so that it doesnt remove turn
    if (ifcheckMate == true) {
        canvasContext.font = "25px Emulogic";
        canvasContext.fillStyle = "black";
        canvasContext.fillText("CHECKMATE", 650, 250);
    }
}

let drawTakenPieces = () => {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].positionX == 99 && pieces[i].positionY == 99) {
            if (pieces[i].black_or_white == "white"){
                pieces[i].positionX = 8 + takenBlackIncrement;
                pieces[i].positionY = 0;
                takenBlackIncrement ++;
            }
            else if (pieces[i].black_or_white == "black") {
                pieces[i].positionX = 8 + takenWhiteIncrement;
                pieces[i].positionY = 7;
                takenWhiteIncrement++
            }
        }
    }
}
let gameLoop = () => {
    if (isRunning == true) {
        drawBoard();
        showStatus();
        drawTakenPieces();
        drawPieces();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

document.addEventListener('click', movePiece);
