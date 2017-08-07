import { Component, OnInit } from '@angular/core';
import {Tile} from "./model/Tile";
import {Building} from "./model/Building";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  towerPositions: number[][];
  tileWidth: number = 10;
  tileHeight: number = 25;
  level : Tile[];
  constructor() {
    this.towerPositions = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [2,2,0,2,2,2,2,0,2,2],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0,0],
    ];
  }

  ngOnInit() {
    for (let i = 0; i<this.tileWidth; i++) {
      for (let j = 0; j<this.tileHeight;j++) {
        if (this.towerPositions[i][j] === 1) {
          let tower = new Building();
          tower.x = i;
          tower.y = j;
        }
      }
    }

  }

}
