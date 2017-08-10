import {Component, OnInit} from '@angular/core';
import {RangedUnit} from "../level/model/units/RangedUnit";
import {UnitType} from "../level/model/units/UnitType";
import {Unit} from "../level/model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";
import {LevelService} from "../level/level.service";
import {Tile} from "../level/model/level/Tile";
import {GroundTypes} from "../level/model/level/GroundTypes";
import {PathfinderService} from "../pathing/pathfinder.service";

@Component({
  selector: 'gameengine',
  templateUrl: './game.engine.component.html',
  styleUrls: ['./game.engine.component.css']
})
export class GameEngineComponent implements OnInit {
  private sizeFactor = 32;
  units: Unit[] = [];
  timer: Observable<number>;
  selectedUnit: Unit;

  UnitType: typeof UnitType = UnitType;
  constructor(private levelService: LevelService, private pathFinderService: PathfinderService) {
    this.timer = TimerObservable.create(0, 25);

    this.levelService.tileClickedSource$.subscribe(tile => {
      console.log('TileType: ' + tile.type);
      if (tile.type == GroundTypes.Building && this.selectedUnit != null) {
        tile.setSelected(true);
        this.selectedUnit.setTarget(tile);
        return;
      }
      if (this.selectedUnit != null) {
        this.selectedUnit = null;
      }

      for (let i = 0; i < this.units.length; i++) {
        let unit = this.units[i];
        if (unit.x == tile.x && unit.y == tile.y) {
          this.selectedUnit = unit;
        }
      }
      if (this.selectedUnit != null) {
        this.selectedUnit.setSelected(true);
      } else {
        this.createUnit(tile);
      }
    });
  }

  private createUnit(tile: Tile) {
    let archer = new RangedUnit();
    archer.setX(tile.x);
    archer.setY(tile.y);
    archer.setWidth(1 * this.sizeFactor);
    archer.setHeight(1 * this.sizeFactor);
    archer.type = UnitType.Archer;
    this.units.push(archer);
  }

  ngOnInit() {
  }

  startGame() {
    for (let i = 0; i < this.units.length; i++) {
      let unit = this.units[i];
      if (unit.getTarget() != null) {
        let path = this.pathFinderService.findPath(unit, this.levelService.level[unit.x][unit.y], unit.getTarget());
      }

    }
    this.timer.subscribe(t => {
      this.tick();
      this.updateUnitPositions();
    });
  }

  private tick() {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].update();
    }
  }

  private updateUnitPositions() {
    for (let i = 0; i < this.units.length; i++) {
      let unit = this.units[i];
      unit.setY(unit.y - 1);
    }
  }
}
