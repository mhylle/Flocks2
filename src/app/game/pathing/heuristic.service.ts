import {Injectable} from '@angular/core';

@Injectable()
export class HeuristicService {

  constructor() {
  }

  getCost(x: number, y: number, tx: number, ty: number): number {
    let D1 = 1;
    let D2 = Math.sqrt(2);
    let dx = Math.abs(tx - x);
    let dy = Math.abs(ty - y);
    let result = D1 * (dx + dy) + (D2 - 2 * D1) * Math.min(dx, dy);
    return result;
  }
}
