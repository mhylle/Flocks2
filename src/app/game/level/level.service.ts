import {Injectable} from '@angular/core';
import {Tile} from "./model/level/Tile";
import {GroundTypes} from "./model/level/GroundTypes";
import {Building} from "./model/level/Building";
import {Ground} from "./model/level/Ground";

@Injectable()
export class LevelService {

  towerPositions: number[][];
  level: Tile[][];

  constructor() {
    this.towerPositions = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    for (let i = 0; i < this.towerPositions.length; i++) {
      this.level[i] = [];
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

  getLevel(): Tile[][] {
    return this.level;
  }

  private sizeFactor = 32;

  private createGround(i: number, j: number, groundType: GroundTypes) {
    const ground = new Ground();
    ground.setY(i * this.sizeFactor);
    ground.setX(j * this.sizeFactor);
    ground.setWidth(this.sizeFactor);
    ground.setHeight(this.sizeFactor);
    ground.type = groundType;
    this.level[i][j] = ground;
  }

  private createBuilding(i: number, j: number) {
    const building = new Building();
    building.setY(i * this.sizeFactor);
    building.setX(j * this.sizeFactor);
    building.setWidth(this.sizeFactor);
    building.setHeight(this.sizeFactor);
    building.posX = building.x + "px";
    building.posY = building.y + "px";
    building.width = building.w + "px";
    building.height = building.h + "px";
    building.type = GroundTypes.Building;
    this.level[i][j] = building;
  }
}
