class Piece {
    constructor(black_or_white, positionY, positionX, pieceV) {
        this.black_or_white = black_or_white;
        this.positionY = positionY;
        this.positionX = positionX;
        this.pieceV = pieceV;
    }
    
    createPieces() {
        let pieces = [];
        for (let i = 16; i < 24; i++) {
            pieces[i] = new Piece("black", 1, i - 16, "pawn");
        }
        for (let i = 24; i < 32; i++) {
            pieces[i] = new Piece("white", 6, i - 24, "pawn");
        }
        pieces[0] = new Piece("white", 7, 0, "rook");
        pieces[1] = new Piece("white", 7, 7, "rook");
        pieces[2] = new Piece("black", 0, 0, "rook");
        pieces[3] = new Piece("black", 0, 7, "rook");
        pieces[4] = new Piece("white", 7, 1, "knight");
        pieces[5] = new Piece("white", 7, 6, "knight");
        pieces[6] = new Piece("black", 0, 1, "knight");
        pieces[7] = new Piece("black", 0, 6, "knight");
        pieces[8] = new Piece("white", 7, 2, "bishop");
        pieces[9] = new Piece("white", 7, 5, "bishop");
        pieces[10] = new Piece("black", 0, 2, "bishop");
        pieces[11] = new Piece("black", 0, 5, "bishop");
        pieces[12] = new Piece("white", 7, 3, "queen"); 
        pieces[13] = new Piece("black", 0, 4, "queen"); 
        pieces[14] = new Piece("white", 7, 4, "king");
        pieces[15] = new Piece("black", 0, 3, "king");
        return pieces;
    }

    findPiece(x, y, pieces) {
        for (let i = 0; i < pieces.length; i++) {
            if (x == pieces[i].positionX && y == pieces[i].positionY) {
                return pieces[i];
            }
        }
        return pieces[0];
    }

    isValidMove(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) {
        let firstPiece = new Piece;
        if (secondPieceX > 0 && secondPieceX < 8 && secondPieceY > 0 && secondPieceY < 8){
            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].positionX == firstPieceX && pieces[i].positionY == firstPieceY) {
                    firstPiece = pieces[i];
                    break;
                }
            }
            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].positionX == secondPieceX && pieces[i].positionY == secondPieceY) {
                    return false;
                } 
            }
            return true;
        }
        return false;
    }

    samePieceExists(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) {
        let firstPiece = new Piece;
        let secondPiece = new Piece;
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].positionX == firstPieceX && pieces[i].positionY == firstPieceY) {
                firstPiece = pieces[i];
            }
        }
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].positionX == secondPieceX && pieces[i].positionY == secondPieceY) {
                secondPiece = pieces[i];
            } 
        }
        if (firstPiece.black_or_white == secondPiece.black_or_white) {
            return true;
        }
        return false;
    }

    oppositePieceExists(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) {
        let firstPiece = new Piece;
        let secondPiece = new Piece;
        let firstFound = false;
        let secondFound = false;
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].positionX == firstPieceX && pieces[i].positionY == firstPieceY) {
                firstPiece = pieces[i];
                firstFound = true;
            }
        }
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].positionX == secondPieceX && pieces[i].positionY == secondPieceY) {
                secondPiece = pieces[i];
                secondFound = true;
            } 
        }
        if (firstFound == true && secondFound == true) {
            if (firstPiece.black_or_white != secondPiece.black_or_white) {
                return true;
            }
        }
        return false;
    }
    
    isPathClearStraight(startX, startY, endX, endY, pieces) {
        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);
    
        if (deltaX !== 0 && deltaY !== 0) {
            return false; // Straight path is either horizontal or vertical
        }
    
        const stepX = (endX > startX) ? 1 : (endX < startX) ? -1 : 0;
        const stepY = (endY > startY) ? 1 : (endY < startY) ? -1 : 0;
    
        for (let i = 1; i < Math.max(deltaX, deltaY); i++) {
            const checkX = startX + i * stepX;
            const checkY = startY + i * stepY;
    
            for (let j = 0; j < pieces.length; j++) {
                if (checkX === pieces[j].positionX && checkY === pieces[j].positionY) {
                    return false;
                }
            }
        }
        return true; // Path is clear
    }
    
    
    isPathClearDiagonal(startX, startY, endX, endY, pieces) {
        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);
    
        if (deltaX !== deltaY) {
            return false; // Diagonal path must have equal deltaX and deltaY
        }
    
        const stepX = (endX > startX) ? 1 : (endX < startX) ? -1 : 0;
        const stepY = (endY > startY) ? 1 : (endY < startY) ? -1 : 0;
    
        for (let i = 1; i < deltaX; i++) {
            const checkX = startX + i * stepX;
            const checkY = startY + i * stepY;
    
            for (let j = 0; j < pieces.length; j++) {
                if (checkX === pieces[j].positionX && checkY === pieces[j].positionY) {
                    return false; // Path is not clear if there is a piece
                }
            }
        }
    
        // If the loop completes without returning, the path is clear
        return true; // Path is clear
    }

    attackPossible(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces, turnCount) {
        let currentPiece = new Piece;
        let targetPiece = new Piece;
        if (this.oppositePieceExists(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces) == true) {
            currentPiece = this.findPiece(firstPieceX, firstPieceY, pieces);
            targetPiece = this.findPiece(secondPieceX, secondPieceY, pieces);
            if ((currentPiece.black_or_white != targetPiece.black_or_white)
                && ((turnCount % 2 == 1 && currentPiece.black_or_white == "white") 
                || (turnCount % 2 == 0 && currentPiece.black_or_white == "black"))){
                switch(currentPiece.pieceV) {
                    case "pawn":
                        if (Math.abs(secondPieceX - firstPieceX) === 1 && Math.abs(secondPieceY - firstPieceY) === 1) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "rook":
                        if (firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "knight":
                        if (((secondPieceY == firstPieceY + 2) || (secondPieceY == firstPieceY - 2))
                            && ((secondPieceX == firstPieceX + 1) || (secondPieceX == firstPieceX - 1))) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;
                            return true;
                        }
                        else if (((secondPieceX == firstPieceX + 2) || (secondPieceX == firstPieceX - 2))
                                && ((secondPieceY == firstPieceY + 1) || (secondPieceY == firstPieceY - 1))) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "bishop":
                        if (this.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "queen":
                        if ((firstPiece.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) 
                        || (firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces))) {
                            currentPiece.positionX = secondPieceX;
                            currentPiece.positionY = secondPieceY;
                            targetPiece.positionX = 99;
                            targetPiece.positionY = 99;   
                            return true;
                        }
                        else {
                            return false;
                        }
                    case "king":
                        if ((firstPiece.isPathClearDiagonal(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces)) 
                        || (firstPiece.isPathClearStraight(firstPieceX, firstPieceY, secondPieceX, secondPieceY, pieces))) {
                            if ((secondPieceY == (firstPieceY + 1) || secondPieceY == (firstPieceY - 1)) 
                            || (secondPieceX == (firstPieceX + 1) || secondPieceX == (firstPieceX - 1))){
                                currentPiece.positionX = secondPieceX;
                                currentPiece.positionY = secondPieceY;
                                targetPiece.positionX = 99;
                                targetPiece.positionY = 99;   
                                return true; 
                            }
                        }
                        else {
                            return false;
                        }
                    default:
                        return false;
                }
            }
            return false;
        }
        return false;
    }

};

