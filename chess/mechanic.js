let ifCheck = (pieces) => {
    let tempKing = new Piece;
    let inCheck = false;
    let kingColor;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].black_or_white == "white") { //account for turnCount incrementing before ifCheck called
            kingColor = "black";
        }
        else {
            kingColor = "white";
        }
        for (let j = 0; j < pieces.length; j++) {
            if (pieces[j].pieceV == "king" && pieces[j].black_or_white == kingColor){
                tempKing = pieces[j];
                break;
            }
        }
        switch(pieces[i].pieceV) {
            case "pawn":
                if ((Math.abs(pieces[i].positionX - tempKing.positionX) === 1 && Math.abs(pieces[i].positionY - tempKing.positionY) === 1)
                    && pieces[i].black_or_white != tempKing.black_or_white){
                    inCheck = true;
                }
                break;
            case "knight":
                if (((tempKing.positionY == Math.abs(pieces[i].positionY + 2) || tempKing.positionY == Math.abs(pieces[i].positionY - 2))
                && (tempKing.positionX == Math.abs(pieces[i].positionX + 1) || tempKing.positionX == Math.abs(pieces[i].positionX - 1))) 
                && pieces[i].black_or_white != tempKing.black_or_white){
                    inCheck = true;
                }
                else if (((tempKing.positionX == Math.abs(pieces[i].positionX + 2) || tempKing.positionX == Math.abs(pieces[i].positionX - 2))
                && (tempKing.positionY == Math.abs(pieces[i].positionY + 1) || tempKing.positionY == Math.abs(pieces[i].positionY - 1))) 
                && pieces[i].black_or_white != tempKing.black_or_white) {
                    inCheck = true;
                }
                break;
            case "rook":
                if (((pieces[i].positionX == tempKing.positionX || pieces[i].positionY == tempKing.positionY)
                    && pieces[i].isPathClearStraight(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces)) 
                    && pieces[i].black_or_white != tempKing.black_or_white){
                    console.log(pieces[i].black_or_white);
                    inCheck = true;
                }
                break;
            case "bishop":
                if (((Math.abs(pieces[i].positionX - tempKing.positionX) == Math.abs(pieces[i].positionY - tempKing.positionY))
                    && pieces[i].isPathClearDiagonal(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces)) 
                    && pieces[i].black_or_white != tempKing.black_or_white){
                    inCheck = true;
                }
                break;
            case "queen":
                if ((((Math.abs(pieces[i].positionX - tempKing.positionX) == Math.abs(pieces[i].positionY - tempKing.positionY))
                    || (pieces[i].positionX == tempKing.positionX || pieces[i].positionY == tempKing.positionY))
                    && (pieces[i].isPathClearDiagonal(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces))
                    || (pieces[i].isPathClearDiagonal(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces)))
                    && pieces[i].black_or_white != tempKing.black_or_white){
                    inCheck = true;
                }
                break;
            case "king":
                if (((Math.abs(pieces[i].positionX - tempKing.positionX) == Math.abs(pieces[i].positionY - tempKing.positionY))
                || (pieces[i].positionX == tempKing.positionX || pieces[i].positionY == tempKing.positionY))
                && (pieces[i].isPathClearDiagonal(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces))
                || (pieces[i].isPathClearDiagonal(pieces[i].positionX, pieces[i].positionY, tempKing.positionX, tempKing.positionY, pieces))){
                    inCheck = true;
                }
                break;
        }
    }
    return inCheck;
}

ownCheck = (piece, endX, endY, pieces) => {
    let tempX = piece.positionX;
    let tempY = piece.positionY;
    piece.positionX = endX;
    piece.positionY = endY;

    // Check if the move puts the player in check
    let isInCheck = ifCheck(pieces);

    // Undo the move
    piece.positionX = tempX;
    piece.positionY = tempY;

    return isInCheck;
}

let checkMate = (pieces, turnCount) => {
    let tempKing = new Piece;
    let turn;
    if (ifCheck(pieces) == true) {
        if (turnCount % 2 == 1) {
            turn = "white";
        }
        else {
            turn = "black";
        }
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].pieceV == "king" && pieces[i].black_or_white == turn) {
                tempKing = pieces[i];
                break;
            }
        }
        for (let moveX = tempKing.positionX - 1; moveX <= tempKing.positionX + 1; moveX++) {
            for (let moveY = tempKing.positionY - 1; moveY <= tempKing.positionY + 1; moveY++) {
                if (tempKing.isValidMove(tempKing.positionX, tempKing.positionY, moveX, moveY, pieces) && ownCheck(tempKing, moveX, moveY, pieces) == false) {
                    return false;
                }
            }
        }
        return true;
    }

}