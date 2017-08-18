import {Component, OnInit} from '@angular/core';
import {RangedUnit} from "../level/model/units/RangedUnit";
import {UnitType} from "../level/model/units/UnitType";
import {Unit} from "../level/model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";
import {LevelService} from "../level/level.service";
import {Subscription} from "rxjs/Subscription";
import {GroundTypes} from "../level/model/level/GroundTypes";
import {Tile} from "../level/model/level/Tile";
import {PathfinderService} from "../pathing/pathfinder.service";
import {MapNode} from "../pathing/MapNode";

@Component({
  selector: 'gameengine',
  templateUrl: './game.engine.component.html',
  styleUrls: ['./game.engine.component.css']
})
export class GameEngineComponent implements OnInit {
  units: Unit[] = [];
  timer: Observable<number>;
  selectedUnit: Unit;
  private tileClickedSubscription: Subscription;
  private unitClickedSubscription: Subscription;

  UnitType: typeof UnitType = UnitType;
  selectedUnitType: UnitType;

  constructor(private levelService: LevelService, private pathFinderService: PathfinderService) {
    this.timer = TimerObservable.create(0, 400);

    this.tileClickedSubscription = this.levelService.tileClickedSource$.subscribe(tile => {
      if (tile.type == GroundTypes.Building && this.selectedUnit != null && this.selectedUnitType != null) {
        tile.setSelected(true);
        this.selectedUnit.setTarget(tile);
      } else {
        this.createUnit(tile);
      }
    });

    this.unitClickedSubscription = this.levelService.unitClickedSource$.subscribe(unit => {
      if (this.selectedUnit != null) {
        this.selectedUnit = null;
      }

      for (let i = 0; i < this.units.length; i++) {
        let unit = this.units[i];
        if (unit.x == unit.x && unit.y == unit.y) {
          this.selectedUnit = unit;
        }
      }
      if (this.selectedUnit != null) {
        this.selectedUnit.setSelected(true);
      }
    })
  }

  private createUnit(tile: Tile) {
    let unit = new RangedUnit();
    if (this.selectedUnitType == UnitType.Archer) {
      unit.setName("A");
    }
    if (this.selectedUnitType == UnitType.Artillery) {
      unit.setName("M");
    }
    if (this.selectedUnitType == UnitType.Infantry) {
      unit.setName("I");
    }
    unit.setX(tile.x);
    unit.setY(tile.y);
    unit.setWidth(1);
    unit.setHeight(1);
    unit.type = this.selectedUnitType;
    this.units.push(unit);
  }

  ngOnInit() {
  }

  mapNodes: MapNode[][];

  startGame() {
    // for (let i = 0; i < this.units.length; i++) {
    //   let unit = this.units[i];
    //   let target = unit.getTarget();
    //   if (target != null) {
    //     unit.setPath(this.pathFinderService.findPath(unit, target));
    //     this.mapNodes = this.pathFinderService.getNodes();
    //   }
    // }

    this.timer.subscribe(t => {
      this.tick();
    });
  }

  private tick() {
    for (let k = 0; k < this.units.length; k++) {
      let unit = this.units[k];
      let target = unit.getTarget();
      if (target != null) {
        unit.setPath(this.pathFinderService.findPath(unit, target));
      }
      // let level = this.levelService.level;
      // for (let i = 0; i < level.length; i++) {
      //   let row = level[i];
      //   for (let j = 0; j < row.length; j++) {
      //     let tile = row[j];
      //
      //     let unit = this.units[k];
      //     // if (unit.getPath() != null && unit.getPath().contains(j, i)) {
      //     //   tile.setPathed(true);
      //     // }
      //     //
      //     // tile.setCost(this.mapNodes[j][i].cost);
      //   }
      // }
      // 0 is ourself?
      unit.update(1);
    }
  }

  onUnitClicked(unit: Unit) {
    this.levelService.unitClicked(unit);
  }

  setUnitType(unitType: UnitType) {
    this.selectedUnitType = unitType;
  }
}
