import { Component, OnInit } from '@angular/core';

const directions = [
  { x: -1, y: -1 }, // UP + LEFT
  { x: 0, y: -1 }, // UP
  { x: 1, y: -1 }, // UP RIGHT
  { x: -1, y: 0 }, // LEFT
  { x: 1, y: 0 }, // RIGHT
  { x: -1, y: 1 }, // DOWN LEFT
  { x: 0, y: 1 }, // DOWN
  { x: 1, y: 1 }, // DOWN RIGHT
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

  public initBoard(rows, cols){
    this.makeBoard(rows, cols);
    this.makeMines();
    this.calcNeighborsOfAllCells();
  }
  private makeBoard(rows, cols) {
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

  private makeMines() {
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

  openCells(row, col) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return;
    }
    let cell: Cell = this.matrix[row][col];
    if (cell.mine || cell.open) return;

    cell.open = true;

    if (cell.neighbors == 0) {
      for (let d of directions) {
        this.openCells(row + d.x, col + d.y);
      }
    }
  }

  private calcNeighborsOfAllCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.calcNeighborsOfOneCell(i, j);
      }
    }
  }

  openAllCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.matrix[i][j];
        cell.open = true;
      }
    }
  }

  onClickCell(row, col) {
    let cell = this.matrix[row][col];
    if (cell.mine) {
      this.openAllCells();
      alert('game over');
      return;
    }
    this.openCells(row, col);
  }

  private calcNeighborsOfOneCell(row:number, col:number) {
    let count:number = 0;
    for (let d of directions) {
      let r = row + d.x;
      let c = col + d.y;
      if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
        continue;
      }
      let cell = this.matrix[r][c];
      if (cell.mine == true) {
        count++;
      }
    }
    let currentCell: Cell = this.matrix[row][col];
    currentCell.neighbors = count;
  }

  public flagCell(row, col){
    let cell = this.matrix[row][col]
    if(cell.open){
      return;
    }
    cell.flag = true
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
