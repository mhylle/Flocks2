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
  towerPositions: Tile[][];
  level: Tile[] = [];

  constructor(private levelService: LevelService) {
    this.towerPositions = levelService.getLevel();
  }

  ngOnInit() {

  }




}
