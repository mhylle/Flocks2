import {Component, OnInit} from '@angular/core';
import {RangedUnit} from "../../model/units/RangedUnit";
import {UnitType} from "../../model/units/UnitType";
import {Unit} from "../../model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";
import {LevelService} from "../level/level.service";
import {Subscription} from "rxjs/Subscription";
import {GroundTypes} from "../../model/level/GroundTypes";
import {Tile} from "../../model/level/Tile";
import {PathfinderService} from "../pathing/pathfinder.service";
import {MeleeUnit} from "../../model/units/MeleeUnit";
import {Ground} from "../../model/level/Ground";

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
    this.createFloatsam();
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
    });
  }

  private createUnit(tile: Tile) {
    let unit = null;
    if (this.selectedUnitType == UnitType.Archer) {
      unit = new RangedUnit();
      unit.setName("A");
    }
    if (this.selectedUnitType == UnitType.Artillery) {
      unit = new RangedUnit();
      unit.setName("M");
    }
    if (this.selectedUnitType == UnitType.Infantry) {
      unit = new MeleeUnit();
      unit.setName("I");
    }
    unit.setX(tile.x);
    unit.setY(tile.y);
    unit.setWidth(1);
    unit.setHeight(1);
    unit.type = this.selectedUnitType;
    this.levelService.addUnit(unit);
    this.units.push(unit);
  }

  ngOnInit() {
  }

  startGame() {

    this.timer.subscribe(t => {
      this.tick();
    });
  }

  private createFloatsam() {
    let floatSam = new Ground();
    floatSam.speedX = 1;
    floatSam.speedY = 0;
    floatSam.setHeight(2);
    floatSam.setWidth(1);
    floatSam.type = GroundTypes.FloatSam;
    floatSam.setX(0);
    floatSam.setY(15);
    this.levelService.addTile(floatSam);
  }

  private tick() {
    for (let k = 0; k < this.units.length; k++) {
      let unit = this.units[k];
      let target = unit.getTarget();
      if (target != null) {
        unit.setPath(this.pathFinderService.findPath(unit, target));
      }

      // 0 is ourself?
      unit.update(1);
    }

    for (let i = 0; i < this.levelService.dynamicTiles.length; i++) {
      let tile = this.levelService.dynamicTiles[i];
      if (tile.speedX > 0) {
        tile.setX(tile.x + tile.speedX);
        console.log("moving dynamic to : " + tile.x);
      }
      if (tile.speedY > 0) {
        tile.setY(tile.y + tile.speedY);
      }
    }
  }

  onUnitClicked(unit: Unit) {
    this.levelService.unitClicked(unit);
  }

  setUnitType(unitType: UnitType) {
    this.selectedUnitType = unitType;
  }
}
