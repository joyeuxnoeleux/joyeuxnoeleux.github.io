const tcanvas = document.getElementById('tetrisCanvas');
const tctx = tcanvas.getContext('2d');
const ROW=20, COL=10, SQ=30, VACANT='#111';
let board = Array.from({length:ROW},()=>Array(COL).fill(VACANT));

function drawSquare(x,y,color){
  tctx.fillStyle=color;
  tctx.fillRect(x*SQ,y*SQ,SQ,SQ);
  tctx.strokeStyle='#333';
  tctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

function drawBoard(){
  for(let r=0;r<ROW;r++)
    for(let c=0;c<COL;c++)
      drawSquare(c,r,board[r][c]);
}

// Pieces
const PIECES = [
  [ [1,1,1,1], 'cyan'], // I
  [ [1,1,1],[0,1,0], 'orange'], // T
  [ [1,1,0],[0,1,1], 'green'], // S
  [ [0,1,1],[1,1,0], 'red'], // Z
  [ [1,1],[1,1], 'yellow'], // O
  [ [1,0,0],[1,1,1], 'blue'], // J
  [ [0,0,1],[1,1,1], 'purple'] // L
];

class Piece {
  constructor(matrix,color){
    this.matrix=matrix; this.color=color;
    this.row=0; this.col=Math.floor(COL/2)-Math.floor(matrix[0].length/2);
  }
  draw(){ this.matrix.forEach((r,i)=>r.forEach((v,j)=>{if(v)drawSquare(this.col+j,this.row+i,this.color)})); }
  undraw(){ this.matrix.forEach((r,i)=>r.forEach((v,j)=>{if(v)drawSquare(this.col+j,this.row+i,VACANT)})); }
  moveDown(){ if(!this.collision(0,1,this.matrix)){this.undraw(); this.row++; this.draw();} else {this.lock(); piece=randomPiece();} }
  moveLeft(){ if(!this.collision(-1,0,this.matrix)){this.undraw(); this.col--; this.draw();} }
  moveRight(){ if(!this.collision(1,0,this.matrix)){this.undraw(); this.col++; this.draw();} }
  rotate(){ let rotated=this.matrix[0].map((_,i)=>this.matrix.map(r=>r[i]).reverse()); if(!this.collision(0,0,rotated)){this.undraw(); this.matrix=rotated; this.draw();} }
  collision(x,y,matrix){
    for(let r=0;r<matrix.length;r++)
      for(let c=0;c<matrix[r].length;c++)
        if(matrix[r][c]){
          let newX=this.col+c+x,newY=this.row+r+y;
          if(newX<0||newX>=COL||newY>=ROW||board[newY][newX]!==VACANT) return true;
        }
    return false;
  }
  lock(){
    this.matrix.forEach((r,i)=>r.forEach((v,j)=>{if(v){if(this.row+i<0){alert('Game Over'); board=Array.from({length:ROW},()=>Array(COL).fill(VACANT)); return;} board[this.row+i][this.col+j]=this.color;}}));
    for(let r=0;r<ROW;r++){ if(board[r].every(c=>c!==VACANT)){board.splice(r,1); board.unshift(Array(COL).fill(VACANT));} }
    drawBoard();
  }
}

function randomPiece(){ return new Piece(...PIECES[Math.floor(Math.random()*PIECES.length)]); }

let piece=randomPiece();
piece.draw();

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft') piece.moveLeft();
  else if(e.key==='ArrowRight') piece.moveRight();
  else if(e.key==='ArrowDown') piece.moveDown();
  else if(e.key==='ArrowUp') piece.rotate();
});

function drop(){
  piece.moveDown();
  requestAnimationFrame(drop);
}
drop();