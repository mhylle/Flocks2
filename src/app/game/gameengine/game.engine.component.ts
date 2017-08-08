import { Component, OnInit } from '@angular/core';
import {RangedUnit} from "../level/model/units/RangedUnit";
import {UnitType} from "../level/model/units/UnitType";
import {Unit} from "../level/model/units/Unit";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'gameengine',
  templateUrl: './game.engine.component.html',
  styleUrls: ['./game.engine.component.css']
})
export class GameEngineComponent implements OnInit {
  private sizeFactor = 32;
  units: Unit[] = [];
  timer: Observable<number>;
  constructor() {
    this.timer = TimerObservable.create(0,25);
  }

  ngOnInit() {
  }

  createUnits() {
    let archer = new RangedUnit();
    archer.setX(2 * this.sizeFactor);
    archer.setY(2 * this.sizeFactor);
    archer.setWidth(1* this.sizeFactor);
    archer.setHeight(1* this.sizeFactor);
    archer.type = UnitType.Archer;
    this.units.push(archer);
  }

  startGame() {
    this.createUnits();
    this.timer.subscribe(t => {
      this.updateUnitPositions();
    })

  }

  private updateUnitPositions() {
    for (let i = 0; i < this.units.length; i++) {
      let unit = this.units[i];
      unit.setY(unit.y + 1);
    }
  }
}
