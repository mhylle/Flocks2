import {Injectable} from '@angular/core';
import {Tile} from "./model/level/Tile";
import {GroundTypes} from "./model/level/GroundTypes";
import {Building} from "./model/level/Building";
import {Ground} from "./model/level/Ground";
import {Unit} from "./model/units/Unit";
import {UnitType} from "./model/units/UnitType";

@Injectable()
export class LevelService {

  towerPositions: number[][];
  level: Tile[][];

  visited: boolean[][];

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
      this.visited[i] =[];
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
        this.visited[i][j] = false;
      }
    }



  }

  getLevel(): Tile[][] {
    return this.level;
  }

  getWidthInTiles(): number {
    return this.level.length;
  }
  getHeightInTiles(): number {
    return this.level[0].length;
  }

  private sizeFactor = 32;

  private createGround(i: number, j: number, groundType: GroundTypes) {
    const ground = new Ground();
    ground.setY(i * this.sizeFactor);
    ground.setX(j * this.sizeFactor);
    ground.setWidth(this.sizeFactor);
    ground.setHeight(this.sizeFactor);
    switch (groundType) {
      case GroundTypes.Grass:
        ground.setBlocked(false);
        break;
      case GroundTypes.Rock:
        ground.setBlocked(true);
        break;
      case GroundTypes.Wall:
        ground.setBlocked(true);
        break;
      case GroundTypes.Water:
        ground.setBlocked(true);
        break;


    }
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

  cost(unit: Unit, xp: number, yp: number) : number{
    if (this.level[xp] != null) {
      let tile = this.level[xp][yp];
      switch (tile.type) {
        case GroundTypes.Grass:
          return 1;
        case GroundTypes.Wall:
          switch (unit.type) {
            case UnitType.Archer:
              return 10;
            case UnitType.Infantry:
              return 8;
            case UnitType.Artillery:
              return 20;
          }
        case GroundTypes.Rock:
          switch (unit.type) {
            case UnitType.Archer:
              return 8;
            case UnitType.Infantry:
              return 7;
            case UnitType.Artillery:
              return 12;
          }
        case GroundTypes.Water:
          switch (unit.type) {
            case UnitType.Archer:
              return 8;
            case UnitType.Infantry:
              return 8;
            case UnitType.Artillery:
              return 2000;
          }
      }
    }
    return 2;
  }

  pathFinderVisited(xp: number, yp: number) {
    this.visited[xp][yp] = true;
  }
}
