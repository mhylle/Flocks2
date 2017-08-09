import {Component, OnInit} from '@angular/core';
import {Tile} from './model/level/Tile';
import {GroundTypes} from "./model/level/GroundTypes";
import {LevelService} from "./level.service";


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  GroundTypes: typeof GroundTypes = GroundTypes;

  level: Tile[] = [];

  constructor(private levelService: LevelService) {
    let towerPositions = levelService.getLevel();
    for (let i = 0; i < towerPositions.length; i++) {
      let row = towerPositions[i];
      for (let j = 0; j < row.length; j++) {
        this.level.push(row[j]);
      }
    }
  }

  ngOnInit() {

  }




}
