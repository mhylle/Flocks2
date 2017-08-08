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
  towerPositions: number[][];
  tileWidth: number = 10;
  tileHeight: number = 25;
  level: Tile[] = [];
  GroundTypes : typeof GroundTypes = GroundTypes;
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
    for (let i = 0; i < this.tileWidth; i++) {
      for (let j = 0; j < this.tileHeight; j++) {
        if (this.towerPositions[i][j] === 0) {
          const grass = new Ground();
          grass.x = i*10;
          grass.y = j*10;
          grass.w = 10;
          grass.h = 10;
          grass.type = GroundTypes.Grass;
          this.level.push(grass);
        }
        if (this.towerPositions[i][j] === 1) {
          const tower = new Building();
          tower.x = i*10;
          tower.y = j*10;
          tower.w = 10;
          tower.h = 10;

          this.level.push(tower);
        }
        if (this.towerPositions[i][j] === 2) {
          const water = new Ground();
          water.x = i*10;
          water.y = j*10;
          water.w = 10;
          water.h = 10;

          water.type = GroundTypes.Water;
          this.level.push(water);
        }
        if (this.towerPositions[i][j] === 3) {
          const rock = new Ground();
          rock.x = i*10;
          rock.y = j*10;
          rock.w = 10;
          rock.h = 10;

          rock.type = GroundTypes.Rock;
          this.level.push(rock);
        }
      }
    }

  }

}
