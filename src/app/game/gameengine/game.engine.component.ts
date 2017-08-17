import {Component, OnInit} from '@angular/core';
import {RangedUnit} from "../level/model/units/RangedUnit";
import {UnitType} from "../level/model/units/UnitType";
import {Unit} from "../level/model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";
import {LevelService} from "../level/level.service";
import {Subscription} from "rxjs/Subscription";
import {Path} from "../pathing/Path";
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
  path: Path;
  private tileClickedSubscription: Subscription;
  private unitClickedSubscription: Subscription;

  UnitType: typeof UnitType = UnitType;

  constructor(private levelService: LevelService, private pathFinderService: PathfinderService) {
    this.timer = TimerObservable.create(0, 25);

    this.tileClickedSubscription = this.levelService.tileClickedSource$.subscribe(tile => {
      console.log('TileType: ' + tile.type + " selectedUnit: " + this.selectedUnit);
      if (tile.type == GroundTypes.Building && this.selectedUnit != null) {
        tile.setSelected(true);
        this.selectedUnit.setTarget(tile);
        console.log('returning, with building and selected unit');
        return;
      }

      // if (this.selectedUnit != null) {
      //   this.selectedUnit.setSelected(true);
      // } else {
      this.createUnit(tile);
      // }
    });

    this.unitClickedSubscription = this.levelService.unitClickedSource$.subscribe(unit => {
      if (this.selectedUnit != null) {
        this.selectedUnit = null;
      }

      for (let i = 0; i < this.units.length; i++) {
        let unit = this.units[i];
        console.log("Unit: (" + unit.x + ", " + unit.y + ") Tile: (" + unit.x + ", " + unit.y + ")");
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
    console.log("creating unit");
    let archer = new RangedUnit();
    archer.setX(tile.x);
    archer.setY(tile.y);
    archer.setWidth(1);
    archer.setHeight(1);
    archer.type = UnitType.Archer;
    this.units.push(archer);
  }

  ngOnInit() {
  }

  mapNodes: MapNode[][];

  startGame() {
    for (let i = 0; i < this.units.length; i++) {
      let unit = this.units[i];
      let target = unit.getTarget();
      if (target != null) {
        this.path = this.pathFinderService.findPath(unit, target);
        this.mapNodes = this.pathFinderService.getNodes();
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

    let level = this.levelService.level;
    for (let i = 0; i < level.length; i++) {
      let row = level[i];
      for (let j = 0; j < row.length; j++) {
        let tile = row[j];
        tile.setCost(this.mapNodes[j][i].cost);
        if (this.path != null && this.path.contains(j, i)) {
          tile.setPathed(true);
        } else {
          tile.setPathed(false);
        }
      }
    }
  }

  private updateUnitPositions() {
    for (let i = 0; i < this.units.length; i++) {
      let unit = this.units[i];
      unit.setY(unit.y - 1);
    }
  }

  onUnitClicked(unit: Unit) {
    this.levelService.unitClicked(unit);
    console.log("Clicked on tile: " + unit.x + ", " + unit.y);
  }
}
