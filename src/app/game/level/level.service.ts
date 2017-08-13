import {Injectable} from '@angular/core';
import {Tile} from "./model/level/Tile";
import {GroundTypes} from "./model/level/GroundTypes";
import {Building} from "./model/level/Building";
import {Ground} from "./model/level/Ground";
import {Unit} from "./model/units/Unit";
import {UnitType} from "./model/units/UnitType";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LevelService {

  towerPositions: number[][];
  level: Tile[][] = [];
  visited: boolean[][] = [];

  private tileClickedSource = new Subject<Tile>();
  tileClickedSource$ = this.tileClickedSource.asObservable();
  private unitClickedSource = new Subject<Unit>();
  unitClickedSource$ = this.unitClickedSource.asObservable();

  constructor() {
    this.towerPositions = [
      [0, 0, 0, 0, ],
      [0, 0, 1, 0, ],
      [0, 0, 0, 0, ]
    ];
    // this.towerPositions = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ];
    for (let y = 0; y < this.towerPositions.length; y++) {
      this.level[y] = [];
      this.visited[y] = [];
      let row = this.towerPositions[y];
      for (let x = 0; x < row.length; x++) {
        if (this.towerPositions[y][x] === 0) {
          this.createGround(x, y, GroundTypes.Grass);
        }
        if (this.towerPositions[y][x] === 1) {
          this.createBuilding(x, y);
        }
        if (this.towerPositions[y][x] === 2) {
          this.createGround(x, y, GroundTypes.Water);
        }
        if (this.towerPositions[y][x] === 3) {
          this.createGround(x, y, GroundTypes.Rock);
        }
        this.visited[y][x] = false;
      }
    }
  }

  getLevel(): Tile[][] {
    return this.level;
  }

  getWidthInTiles(): number {
    return this.level[0].length;
  }

  getHeightInTiles(): number {
    return this.level.length;
  }



  private createGround(x: number, y: number, groundType: GroundTypes) {
    const ground = new Ground();
    ground.setX(x);
    ground.setY(y);
    ground.setWidth(1);
    ground.setHeight(1);
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
    this.level[y][x] = ground;
  }

  private createBuilding(x: number, y: number) {
    const building = new Building();
    building.setX(x);
    building.setY(y);
    building.setWidth(1);
    building.setHeight(1);
    building.type = GroundTypes.Building;
    this.level[y][x] = building;
  }

  cost(unit: Unit, xp: number, yp: number): number {
    if (this.level[yp] != null) {
      let tile = this.level[yp][xp];
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
          return 12;
        case GroundTypes.Rock:
          switch (unit.type) {
            case UnitType.Archer:
              return 8;
            case UnitType.Infantry:
              return 7;
            case UnitType.Artillery:
              return 12;
          }
          return 14;
        case GroundTypes.Water:
          switch (unit.type) {
            case UnitType.Archer:
              return 8;
            case UnitType.Infantry:
              return 8;
            case UnitType.Artillery:
              return 2000;
          }
          return 20;
      }
    }
    return 2;
  }

  pathFinderVisited(xp: number, yp: number) {
    this.visited[xp][yp] = true;
  }

  tileClicked(tile: Tile) {
    this.tileClickedSource.next(tile);
  }

  unitClicked(unit: Unit) {
    this.unitClickedSource.next(unit);
  }
}
