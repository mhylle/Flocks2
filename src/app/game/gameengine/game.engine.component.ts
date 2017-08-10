import {Component, OnInit} from '@angular/core';
import {RangedUnit} from "../level/model/units/RangedUnit";
import {UnitType} from "../level/model/units/UnitType";
import {Unit} from "../level/model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";
import {LevelService} from "../level/level.service";
import {Tile} from "../level/model/level/Tile";

@Component({
  selector: 'gameengine',
  templateUrl: './game.engine.component.html',
  styleUrls: ['./game.engine.component.css']
})
export class GameEngineComponent implements OnInit {
  private sizeFactor = 32;
  units: Unit[] = [];
  timer: Observable<number>;

  constructor(private levelService: LevelService) {
    this.timer = TimerObservable.create(0, 25);
    this.levelService.tileClickedSource$.subscribe(tile => {
      this.createUnit(tile);
    });
  }

  private createUnit(tile: Tile) {
    let archer = new RangedUnit();
    archer.setX(tile.x );
    archer.setY(tile.y);
    archer.setWidth(1 * this.sizeFactor);
    archer.setHeight(1 * this.sizeFactor);
    archer.type = UnitType.Archer;
    this.units.push(archer);
  }

  ngOnInit() {
  }



  startGame() {
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
