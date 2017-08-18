import {Injectable} from '@angular/core';
import {Unit} from "../level/model/units/Unit";
import {Tile} from "../level/model/level/Tile";

@Injectable()
export class HeuristicService {

  constructor() {
  }

  getCost(unit:Unit, target: Tile): number {
    let D1 = 1;
    let D2 = Math.sqrt(4);

    let dx = Math.abs(unit.x - target.x);
    let dy = Math.abs(unit.y - target.y);
    return D1 * (dx + dy) + (D2 - 2 * D1) * Math.min(dx, dy);
  }
}
