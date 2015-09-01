//---------------------------------


//ChessBoardTest3 - By eagleangelo and some nice people on the pbsideachannel (you know who you are)

//create a canvas thing

canvas = document.getElementById('canvasTest');
document.body.appendChild(canvas);

XrectSize = 100;
XboardSizeX = 8;
XboardSizeY = 8;
Xcolor1 = 'skyblue';
Xcolor2 = 'lightgreen';

//---------------------------------


//create a board thing

var CanvasObject = function (rectSize, boardSizeX, boardSizeY, color1, color2) {

	this.rectSize = rectSize;
	this.boardSizeX = boardSizeX;
	this.boardSizeY = boardSizeY;
	this.color1 = color1;
	this.color2 = color2;

	this.layers = [];
	this.layers = this.setCanvasBoard(this.layers,rectSize,boardSizeX,boardSizeY,color1,color2);
	
	this.loadCounter = 0;
};

//set the canvas up and the background

CanvasObject.prototype.setCanvasBoard = function (layers,rectSize,boardSizeX,boardSizeY,color1,color2) {

	boardL0 = []; //(background layer)
	boardL1 = []; //(pieces layer)
	boardL2 = []; //(text layer)
	boardL3 = []; //(second text layer)

	for (var j = 0, len1 = boardSizeY; j < len1; j++) {
		boardL0[j] = [];
		boardL1[j] = [];
		boardL2[j] = [];
		boardL3[j] = [];
		
		for (var i = 0, len2 = boardSizeX; i < len2; i++) {
			
			var rect = canvas.getContext('2d');
			var pos = canvas.getContext('2d');
			var pieceTxt = canvas.getContext('2d');

			//rect.globalAlpha = 0.5;

			rect.fillStyle = j % 2 == 0 ? color1 : color2;
			rect.fillRect( rectSize * (i % boardSizeX) + 50, rectSize * (j % boardSizeY) + 50, rectSize, rectSize);

			pos.font = '12px serif';
			pos.fillStyle = 'black';
			pos.fillText(i+','+j, rectSize * (i % boardSizeX) + 50, rectSize * (j % boardSizeY) + 60);

			boardL0[j][i] = rect;
			boardL2[j][i] = pos;

			color1 = [color2, color2 = color1][0];
		}

	}
	
	layers = [boardL0,boardL1,boardL2,boardL3];

	return layers;
};


//sets a canvas piece on the canvas board, allows it to preload the source image

CanvasObject.prototype.setCanvasPiece = function (Board, x, y) {

	var BoardL1 = this.layers[1];

	if(Board.board[y][x] != null){

		var ctx = canvas.getContext('2d');
		var img = new Image();
	
		var src = this.getIMGSrcByTypePlayer(Board.board[y][x].type, Board.board[y][x].player);

		img.src = src;

		var CanvasPiece1 =  new CanvasPiece (
			Board.board[y][x].type,
			Board.board[y][x].player,
			src,
			ctx,
			img
		); //type,player,src,context,img

/*		this doesn't work

		img.onload = function () {
			ev1 = new Event('PieceReady');
			ev1.src = src;
			ev1.img = img;
			ev1.x = x;
			ev1.y = y;
			ev1.sizeX = CanvasObject1.boardSizeX;
			ev1.sizeY = CanvasObject1.boardSizeY;
			window.dispatchEvent(ev1);
		};
*/
//		testing WOAH! IT WORKS!!! MUST TEST FURTHER

		img.onload = function () {
			ev1 = new Event('PieceReady');
			ev1.src = src;
			ev1.img = img;
			ev1.x = x;
			ev1.y = y;
			ev1.sizeX = CanvasObject1.boardSizeX;
			ev1.sizeY = CanvasObject1.boardSizeY;
			window.dispatchEvent(ev1);

			if (CanvasObject1.loadCounter == Board.ids) {
				CanvasObject1.displayBoard(Board, CanvasObject1);
			}
			CanvasObject1.loadCounter++;
		};
//
/*		this does work, though I have to specify the context as CanvasObject1 = this; my problem is that it will only work once, at the start...and I would like more control over the render function

		CanvasObject1 = this;

		img.onload = function () {
			ctx.drawImage(img, CanvasObject1.rectSize * (x % CanvasObject1.boardSizeX) + 50, CanvasObject1.rectSize * (y % CanvasObject1.boardSizeY) + 50, 100, 100);
		};
*/

		BoardL1[y][x] = CanvasPiece1;
        }
};


//does a loop for the canvas pieces so they can later be displayed, this is called once at the beginning. setCanvasPiece() (the singular version) can be called if more pieces were to be added

CanvasObject.prototype.setCanvasPieces = function (Board) {

        for(var j = 0; j < Board.board.length; j++) {
                for(var i = 0; i < Board.board[0].length; i++) {
                        if(Board.board[j][i] != null){

				this.setCanvasPiece(Board, i, j);
                        }	
                }
        }
};


//provides the source for a given piece type and player

CanvasObject.prototype.getIMGSrcByTypePlayer = function (type, player) {

	var name = type+player;
	
	switch (name) {

		case 'P1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661365/49cb22f8-2974-11e5-90ce-519c1c2a1547.png';
		break;

		case 'P2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661386/65ebed6e-2974-11e5-9b9a-3954b9ec957e.png';
		break;

		case 'R1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661865/0c18e86a-2978-11e5-97c7-e25bf067bfc5.png';
		break;

		case 'R2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661871/18f8179a-2978-11e5-9795-8a21f2486cac.png';
		break;

		case 'N1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661883/31c1b4de-2978-11e5-98b1-2e82d27e98bd.png';
		break;

		case 'N2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661876/24b9a706-2978-11e5-93a8-e7d11ae1cd79.png';
		break;

		case 'B1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661897/4aeb035c-2978-11e5-81f1-1746b8853ac1.png';
		break;

		case 'B2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661893/406081a0-2978-11e5-8690-2f1e33fac4fc.png';
		break;

		case 'Q1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661420/a4f8f83a-2974-11e5-81e7-7d0fdeb904a0.png';
		break;

		case 'Q2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661443/c00f1668-2974-11e5-9d36-c8af52bc5e7d.png';
		break;

		case 'K1':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661397/768c5802-2974-11e5-9e34-25c42afeb743.png';
		break;

		case 'K2':
		name = 'https://cloud.githubusercontent.com/assets/12261709/8661405/87604f26-2974-11e5-891a-4ed3aa3f87e7.png';
		break;

		Default:
		name = 'dummy.png';
		break;
	}

	return name;

};


//display the chessboard pieces images taken from Layer 1 of the canvas object A.K.A The Render Loop.
//This does not do anything as of now, as setCanvasPiece() has the onload event() that triggers displayPiece()

CanvasObject.prototype.displayBoard = function (Board, CanvasObject) {

	var BoardL1 = CanvasObject.layers[1];

        for(var j = 0; j < Board.board.length; j++) {
                for(var i = 0; i < Board.board[0].length; i++) {
                        if(Board.board[j][i] != null){
		
				//context.drawImage(image,x,y,sizeX,sizeY);
				//BoardL1[j][i] is the canvas chess piece at i,j, it has img and cxt (context) as part of its properties

				//BoardL1[j][i].ctx.drawImage(BoardL1[j][i].img, this.rectSize * (i % this.boardSizeX) + 50, this.rectSize * (j % this.boardSizeY) + 50, 100, 100);
				BoardL1[j][i].ctx.drawImage(BoardL1[j][i].img, CanvasObject.rectSize * (i % CanvasObject.boardSizeX) + 50, CanvasObject.rectSize * (j % CanvasObject.boardSizeY) + 50, 100, 100);
                        }	
                }
        }
};


//display the moves for a given piece; needs the list of moves from MovesPiece()

CanvasObject.prototype.displayMoves = function(movesPiece, Board) { //THIS FUNCTION IS CURRENTLY UNAVAILABLE, THANK YOU FOR YOUR PATIENCE *BEEP*

        var moves = movesPiece;

//need to turn this into text...somewhere...

	/*
	process.stdout.write(moves.length +' available moves.\n')

        for(var i = 0; i < moves.length; i++) {
                process.stdout.write(moves[i]+ '; ');
        }
	*/

        var displayBoard = JSON.parse(JSON.stringify(Board.board));

        var display = [];
        var displayX = [];
        var displayY = [];

	//the following loops split the list of moves into X and Y, then paints a square black where said possition is

        for(var i = 0; i < moves.length; i++) {
                display = moves[i].split(',');
                displayX.push(display[0]);
                displayY.push(display[1]);
        }

        for(var i = 0; i < displayX.length; i++) {
		boardL0[displayY[i]][displayX[i]].globalAlpha=0.64;
                boardL0[displayY[i]][displayX[i]].fillStyle = 'red';
		boardL0[displayY[i]][displayX[i]].fillRect(rectSize * (displayX[i] % boardSizeX) + rectSize*2/3, rectSize * (displayY[i] % boardSizeY) + rectSize*2/3,rectSize*2/3,rectSize*2/3);
        }

};


//---------------------------------


//make a canvas piece object, it will have and load its img file source once depending on the chesspiece

var CanvasPiece = function (type,player,src,ctx,img) {

	this.type =  type;
	this.player = player;
	this.src = src;
	this.ctx = ctx;
	this.img = img;

	window.addEventListener('PieceReady', function(ev){		
		this.setPieceIMG(ev.src, ev.img, ev.x, ev.y, ev.sizeX, ev.sizeY);
	}.bind(this));

};


//sets the piece object src

CanvasPiece.prototype.setPieceIMG = function(src,img,x,y,sizeX,sizeY) {

	img.setAttribute('src', src);
	img.setAttribute('x',x);
	img.setAttribute('y',y);
	img.setAttribute('width',sizeX);
	img.setAttribute('height',sizeY);
};


//---------------------------------


//ChessBoard and Chesspiece prototypes

var ChessBoard = function (x,y) {

        this.ids = 0;
        this.board = [];
        this.board = this.setBoard(this.board,x,y);

};

var ChessPiece = function (id,type,player) {
        this.id = id;
        this.type = type;
        this.player = player;
        this.hasMoved = false;
};

ChessBoard.prototype.setBoard = function(board,x,y) {

        for(var j = 0; j < y; j++) {
                board[j] = [];
                for(var i = 0; i  < x; i++) {
                        board[j][i] = null;
                }
        }
        return board;
};


//set a chess piece and gives it an ID based on a counter inside the Board

ChessBoard.prototype.setPiece = function(Board,x,y,type,player) {
        var piece = new ChessPiece(Board.ids+1,type,player);
        Board.ids++;
        Board.board[y][x] = piece;
};


//set a standard chessboard, 2 players, 8 by 8

ChessBoard.prototype.setStdBoard = function (Board) {

        for(var i = 0; i < 8; i++) {
                Board.setPiece(Board,i,1,'P',1);
                Board.setPiece(Board,i,6,'P',2);
        }

        Board.setPiece(Board,0,0,'R',1); Board.setPiece(Board,7,0,'R',1);
        Board.setPiece(Board,0,7,'R',2); Board.setPiece(Board,7,7,'R',2);

        Board.setPiece(Board,1,0,'N',1); Board.setPiece(Board,6,0,'N',1);
        Board.setPiece(Board,1,7,'N',2); Board.setPiece(Board,6,7,'N',2);

        Board.setPiece(Board,2,0,'B',1); Board.setPiece(Board,5,0,'B',1);
        Board.setPiece(Board,2,7,'B',2); Board.setPiece(Board,5,7,'B',2);

        Board.setPiece(Board,3,0,'Q',1); Board.setPiece(Board,3,7,'Q',2);
        
        Board.setPiece(Board,4,0,'K',1); Board.setPiece(Board,4,7,'K',2);

};


//display the entire chessboard on the console (needs Node.js), based on the type property, can be changed for id, player or possition

ChessBoard.prototype.displayBoardConsole = function (Board) {

        for(var j = 0; j < Board.board.length; j++) {
                for(var i = 0; i < Board.board[0].length; i++) {
                        if(Board.board[j][i] == null){
                                process.stdout.write('- ');
                        } else {
				process.stdout.write(Board.board[j][i].type + ' ');
                                //process.stdout.write(Board.board[j][i].id + ' ');
                                //process.stdout.write(Board.board[j][i].player + ' ');
				//process.stdout.write(i+","+j + ' ');
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n');
};


//display the moves for a given piece on the console (needs Node.js); needs the list of moves from MovesPiece()

ChessBoard.prototype.displayMovesConsole = function(movesPiece, Board) {

        var moves = movesPiece;

        process.stdout.write(moves.length +' available moves.\n')

        for(var i = 0; i < moves.length; i++) {
                process.stdout.write(moves[i]+ '; ');
        }

        process.stdout.write('\n');

        var displayBoard = JSON.parse(JSON.stringify(Board.board));

        var display = [];
        var displayX = [];
        var displayY = [];

	//the following loops split the list of moves into X and Y, then marks an 'x' where said possition is

        for(var i = 0; i < moves.length; i++) {
                display = moves[i].split(',');
                displayX.push(display[0]);
                displayY.push(display[1]);
        }

        for(var i = 0; i < displayX.length; i++) {
                displayBoard[displayY[i]][displayX[i]] = 'x';
        }

        process.stdout.write('\n');

        for(var j = 0; j < displayBoard.length; j++) {
                for(var i = 0; i < displayBoard[0].length; i++) {
                        if(displayBoard[j][i] == null){
                                process.stdout.write('- ');
                        } else if (displayBoard[j][i] == 'x') {
                                process.stdout.write('x ');
                        } else {
                                process.stdout.write(displayBoard[j][i].type + ' ');
                        }
                }
                process.stdout.write('\n');
        }

        process.stdout.write('\n'); //for terminal purposes

};


//movement functions


//isEmpty?

ChessBoard.prototype.isEmpty = function (Board,x,y) {
        if(Board.board[y][x] == null) {
                return true;
        } else {
                return false;
        }
};

//isEnemy?

ChessBoard.prototype.isEnemy = function (Board,x,y,i,j) {
        if ( Board.board[j][i] != null ) {
                if (Board.board[y][x].player != Board.board[j][i].player) {
                        return true;
                } else {
                        return false;
                }
        } else {
                return false;
        }
};

//Provide a list of available moves for a given piece, recognize the type and return the array of moves

ChessBoard.prototype.movesPiece = function(Board,x,y) {

        var moves = [];
        var type = Board.board[y][x].type;

        switch(type) {

                case 'R':
                        moves = Board.moveN(Board,x,y,moves);
                        moves = Board.moveS(Board,x,y,moves);
                        moves = Board.moveW(Board,x,y,moves);
                        moves = Board.moveE(Board,x,y,moves);
                        return moves;

                case 'B':
                        moves = Board.moveNE(Board,x,y,moves);
                        moves = Board.moveNW(Board,x,y,moves);
                        moves = Board.moveSE(Board,x,y,moves);
                        moves = Board.moveSW(Board,x,y,moves);
                        return moves;

                case 'Q':
                        moves = Board.moveN(Board,x,y,moves);
                        moves = Board.moveS(Board,x,y,moves);
                        moves = Board.moveW(Board,x,y,moves);
                        moves = Board.moveE(Board,x,y,moves);
                        moves = Board.moveNE(Board,x,y,moves);
                        moves = Board.moveNW(Board,x,y,moves);
                        moves = Board.moveSE(Board,x,y,moves);
                        moves = Board.moveSW(Board,x,y,moves);
                        return moves;

                default:
                        break;
        }

};

//standard directions: NSEW. cross, diagonal and one at a time

ChessBoard.prototype.moveE = function(Board,x,y,moves) {

        for (var i = (x-1); i >= 0; i--) {
                if( Board.isEnemy(Board,x,y,i,y) ) {
                        moves.push(i+ ',' +y);
                        break;
                } else if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveW = function(Board,x,y,moves) {

        for (var i = (x+1); i < Board.board[0].length; i++) {
                if( Board.isEnemy(Board,x,y,i,y) ) {
                        moves.push(i+ ',' +y);
                        break;
                } else if( Board.isEmpty(Board,i,y) ) {
                        moves.push(i+ ',' +y);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveN = function (Board,x,y,moves) {

        for (var j = (y-1); j >= 0; j--) {
                if( Board.isEnemy(Board,x,y,x,j) ) {
                        moves.push(x+ ',' +j);
                        break;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveS = function (Board,x,y,moves) {

        for (var j = (y+1); j < Board.board.length; j++) {
                if( Board.isEnemy(Board,x,y,x,j) ) {
                        moves.push(x+ ',' +j);
                        break;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +j);
                } else {
                        break;
                }
        }

        return moves;
};

ChessBoard.prototype.moveNW = function (Board,x,y,moves) {

        var i = -1; var j = -1;

        while (i+x >= 0 && j+y >= 0) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i--; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE = function (Board,x,y,moves) {

        var i = 1; var j = 1;

        while (i+x < Board.board[0].length && j+y < Board.board.length) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i++; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveNE = function (Board,x,y,moves) {

        var i = 1; var j = -1;

        while (i+x+1 < Board.board[0].length && j+y-1 >= 0) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i++; j--;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveSW = function (Board,x,y,moves) {

        var i = -1; var j = 1;

        while (i+x-1 >= 0 && j+y+1 < Board.board.length) {
                if( Board.isEnemy(Board,x,y,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        break;
                } else if ( Board.isEmpty(Board,i+x,j+y) ) {
                        moves.push((i+x)+','+(j+y));
                        i--; j++;
                } else {
                        break;
                }
        }
        return moves;
};

ChessBoard.prototype.moveW1 = function (Board,x,y,moves) {

        if ((x-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x-1,y) ) {
                        moves.push((x-1)+','+y);
                        return moves;
                } else if( Board.isEmpty(Board,x-1,y) ) {
                        moves.push((x-1)+ ',' +y);
                }
        }
        return moves;
};

ChessBoard.prototype.moveE1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length) {
                if( Board.isEnemy(Board,x,y,x+1,y) ) {
                        moves.push((x+1)+','+y);
                        return moves;
                } else if( Board.isEmpty(Board,x+1,y) ) {
                        moves.push((x+1)+ ',' +y);
                }
        }
        return moves;
};

ChessBoard.prototype.moveN1 = function (Board,x,y,moves) {

        if ((y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x,y-1) ) {
                        moves.push(x+','+(y-1));
                        return moves;
                } else if( Board.isEmpty(Board,x,y-1) ) {
                        moves.push(x+ ',' +(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveS1 = function (Board,x,y,moves) {

        if ((y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x,y+1) ) {
                        moves.push(x+','+(y+1));
                        return moves;
                } else if( Board.isEmpty(Board,x,j) ) {
                        moves.push(x+ ',' +(y+1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveNW1 = function (Board,x,y,moves) {

        if ((x-1) >= 0 && (y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x-1,y-1) ) {
                        moves.push((x-1)+','+(y-1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x-1,y-1) ) {
                        moves.push((x-1)+','+(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length && (y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x+1,y+1) ) {
                        moves.push((x+1)+','+(y+1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x+1,y+1) ) {
                        moves.push((x+1)+','+(y+1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveNW1 = function (Board,x,y,moves) {

        if ((x+1) < Board.board[0].length && (y-1) >= 0) {
                if( Board.isEnemy(Board,x,y,x+1,y-1) ) {
                        moves.push((x+1)+','+(y-1));
                        return moves;
                } else  if ( Board.isEmpty(Board,x+1,y-1) ) {
                        moves.push((x+1)+','+(y-1));
                }
        }
        return moves;
};

ChessBoard.prototype.moveSE1 = function (Board,x,y,moves) {
        if ((x-1) >= 0 && (y+1) < Board.board.length) {
                if( Board.isEnemy(Board,x,y,x-1,y+1) ) {
                        moves.push((x-1)+','+(y+1));
                        return moves;
                } else if ( Board.isEmpty(Board,x-1,y+1) ) {
                        moves.push((x-1)+','+(y+1));
                }
        }
        return moves;
};


//---------------------------------


var ChessBoard1 = new ChessBoard (XboardSizeX,XboardSizeY);
var CanvasObject1 = new CanvasObject (XrectSize, XboardSizeX, XboardSizeY, Xcolor1, Xcolor2);

ChessBoard1.setStdBoard(ChessBoard1);

ChessBoard1.setPiece(ChessBoard1,4,4,'Q',1); //test piece

CanvasObject1.setCanvasPieces(ChessBoard1);

//CanvasObject1.displayBoard(ChessBoard1); //doesn't do anything as of now. Will probably need it later though.

//CanvasObject.displayMoves(ChessBoard1.movesPiece(ChessBoard1,4,4),ChessBoard1); //display moves for 4,4


//---------------------------------