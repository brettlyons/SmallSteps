var board = [];

setBoard(8,8);
setStdBoard();

displayBoard();

setPiece(4,4,'Q'); //test piece

displayMoves(movesPiece(4,4));

function setBoard (x,y) {

        for(var i = 0; i < x; i++) {
                board[i] = [];
                for(var j = 0; j  < y; j++) {
                        board[i][j] = '-';
                }
        }
/*
        for(var i = 0; i < x; i++) {
                board[i] = [];
                for(var j = 0; j  < y; j++) {
                        board[i][j] = i+','+j;
                }
        }
*/
}

function setPiece(x,y,type) {
        board[x][y] = type;
}

function setStdBoard() {

        var P = 'P'; var R = 'R'; var N = 'N'; var B = 'B'; var Q = 'Q'; var K = 'K';

        for(var i = 0; i < 8; i++) {
                board[1][i] = P;
                board[6][i] = P;
        }

        setPiece(0,0,R); setPiece(0,7,R); setPiece(7,0,R); setPiece(7,7,R);
        setPiece(0,1,N); setPiece(0,6,N); setPiece(7,1,N); setPiece(7,6,N);
        setPiece(0,2,B); setPiece(0,5,B); setPiece(7,2,B); setPiece(7,5,B);
        setPiece(0,3,Q); setPiece(7,4,Q);
        setPiece(0,4,K); setPiece(7,3,K);

}

function displayBoard() {

        for(var i = 0; i < board.length; i++) {
                for(var j = 0; j < board[0].length; j++) {
                        process.stdout.write(board[i][j] + ' ');
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes
}

function displayMoves(movesPiece) {

        var moves = movesPiece;

        for(var i = 0; i < moves.length; i++) {
                process.stdout.write(moves[i]+ '; ');
        }

        process.stdout.write('\n');

        var displayBoard = JSON.parse(JSON.stringify(board));

        var display = [];
        var displayX = [];
        var displayY = [];

        for(var i = 0; i < moves.length; i++) {
                display = moves[i].split(',');
                displayX.push(display[0]);
                displayY.push(display[1]);
        }

        for(var i = 0; i < displayX.length; i++) {
                displayBoard[displayX[i]][displayY[i]] = 'x';
        }

        process.stdout.write('\n');

        for(var i = 0; i < displayBoard.length; i++) {
                for(var j = 0; j < displayBoard[0].length; j++) {
                        process.stdout.write(displayBoard[i][j] + ' ');
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes

}

function isEmpty(x, y) {
        if(board[x][y] == '-') {
                return true;
        } else {
                return false;
        }
}

function movesPiece(x,y) {

        var moves = [];
        var type = board[x][y];

        switch(type) {

                case 'R':
                        moveUp(x,y,moves);
                        moveDown(x,y,moves);
                        moveLeft(x,y,moves);
                        moveRight(x,y,moves);
                        return moves;

                case 'B':
                        moveUpRight(x,y,moves);
                        moveUpLeft(x,y,moves);
                        moveDownRight(x,y,moves);
                        moveDownLeft(x,y,moves);
                        return moves;

                case 'Q':
                        moveUp(x,y,moves);
                        moveDown(x,y,moves);
                        moveLeft(x,y,moves);
                        moveRight(x,y,moves);
                        moveUpRight(x,y,moves);
                        moveUpLeft(x,y,moves);
                        moveDownRight(x,y,moves);
                        moveDownLeft(x,y,moves);
                        return moves;

                default:
                        break;
        }

}

function moveUp(x,y,moves) {

        for (var i = (x-1); i >= 0; i--) {
                if( isEmpty(i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
}

function moveDown(x,y,moves) {

        for (var i = (x+1); i < board.length; i++) {
                if( isEmpty(i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
}

function moveLeft(x,y,moves) {

        for (var j = (y-1); j >= 0; j--) {
                if( isEmpty(x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
}

function moveRight(x,y,moves) {

        for (var j = (y+1); j < board[0].length; j++) {
                if( isEmpty(x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
}

function moveUpLeft(x,y,moves) {

        var i = 0; var j = 0;

        while (i+x-1 >= 0 && j+y-1 >= 0) {
                if ( isEmpty(i+x-1,j+y-1) ) {
                        moves.push((i+x-1)+','+(j+y-1));
                        i--; j--;
                } else {
                        break;
                }
        }
        return moves;
}

function moveDownRight(x,y,moves) {

        var i = 0; var j = 0;

        while (i+x+1 < board.length && j+y+1 < board[0].length) {
                if ( isEmpty(i+x+1,j+y+1) ) {
                        moves.push((i+x+1)+','+(j+y+1));
                        i++; j++;
                } else {
                        break;
                }
        }
        return moves;
}

function moveDownLeft(x,y,moves) {

        var i = 0; var j = 0;

        while (i+x+1 < board.length && j+y-1 >= 0) {
                if ( isEmpty(i+x+1,j+y-1) ) {
                        moves.push((i+x+1)+','+(j+y-1));
                        i++; j--;
                } else {
                        i = 0; j = 0;
                        break;
                }
        }
        return moves;
}

function moveUpRight(x,y,moves) {
        var i = 0; var j = 0;

        while (i+x-1 >= 0 && j+y+1 < board[0].length) {
                if ( isEmpty(i+x-1,j+y+1) ) {
                        moves.push((i+x-1)+','+(j+y+1));
                        i--; j++;
                } else {
                        i = 0; j = 0;
                        break;
                }
        }
        return moves;
}
