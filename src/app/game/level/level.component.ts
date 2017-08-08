import {Component, OnInit} from '@angular/core';
import {Tile} from './model/Tile';
import {Building} from './model/Building';
import {Ground} from './model/Ground';
import {GroundTypes} from "./model/GroundTypes";


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  GroundTypes : typeof GroundTypes = GroundTypes;
  towerPositions: number[][];
  tileWidth: number = 10;
  tileHeight: number = 25;
  level: Tile[] = [];
  constructor() {
    this.towerPositions = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 2, 2, 2, 2, 0, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  ngOnInit() {
    for (let i = 0; i < this.towerPositions.length; i++) {
      let row = this.towerPositions[i];
      for (let j = 0; j < row.length; j++) {
        if (this.towerPositions[i][j] === 0) {
          this.createGround(i, j, GroundTypes.Grass);
        }
        if (this.towerPositions[i][j] === 1) {
          this.createBuilding(i, j);
        }
        if (this.towerPositions[i][j] === 2) {
          this.createGround(i, j, GroundTypes.Water);
        }
        if (this.towerPositions[i][j] === 3) {
          this.createGround(i, j, GroundTypes.Rock);
        }
      }
    }

  }

  private sizeFactor = 25;

  private createGround(i: number, j: number, groundType: GroundTypes) {
    const ground = new Ground();
    ground.y = i * this.sizeFactor;
    ground.x = j * this.sizeFactor;
    ground.w = this.sizeFactor;
    ground.h = this.sizeFactor;
    ground.posX = ground.x + "px";
    ground.posY = ground.y + "px";
    ground.width = ground.w + "px";
    ground.height = ground.h + "px";
    ground.type = groundType;
    this.level.push(ground);
    return ground;
  }
  private createBuilding(i: number, j: number) {
    const building = new Building();
    building.y = i * this.sizeFactor;
    building.x = j * this.sizeFactor;
    building.w = this.sizeFactor;
    building.h = this.sizeFactor;
    building.posX = building.x + "px";
    building.posY = building.y + "px";
    building.width = building.w + "px";
    building.height = building.h + "px";
    building.type = GroundTypes.Building;
    this.level.push(building);
    return building;
  }
}
