import { Component, OnInit } from '@angular/core';

const directions = [

  {x:-1, y:-1 } , // UP + LEFT
  {x:0, y:-1 } , // UP  
  {x:1, y:-1 } , // UP RIGHT
  {x:-1, y:0 } , // LEFT
  {x:1, y:0 } , // RIGHT
  {x:-1, y:1 } , // DOWN LEFT
  {x:0, y:1 } , // DOWN
  {x:1, y:1 }  // DOWN RIGHT

];

class Cell {
  mine: Boolean;
  neighbors: number;
  flag: Boolean;
  open: Boolean;
}

class Board {
  rows: number;
  cols: number;
  cells: number;
  mines: number;
  matrix: any;

  makeBoard(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = rows * cols;
    this.mines = Math.floor(0.2 * this.cells);

    this.matrix = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let cell = new Cell();
        row.push(cell);
      }
      this.matrix.push(row);
    }
  }

  makeMines() {
    let count = 0;
    while (count < this.mines) {
      let row = Math.floor(Math.random() * this.rows * 0.9999);
      let col = Math.floor(Math.random() * this.cols * 0.9999);

      let cell = this.matrix[row][col];

      if (!cell.mine) {
        cell.mine = true;
        count++;
      }
    }
  }

  openCells(row, col){
    if(row<0 || row>=this.rows || col<0 || col>=this.cols){
      return;
    }
    let cell = this.matrix[row][col];
    cell.open = true;

    for(let d of directions){
      this.openCells(row+d.x , col+d.y);
    }
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
