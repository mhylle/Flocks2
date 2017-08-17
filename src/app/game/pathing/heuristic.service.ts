import {Injectable} from '@angular/core';
import {LevelService} from "../level/level.service";

@Injectable()
export class HeuristicService {

  constructor(private levelService: LevelService) {
  }

  getCost(x: number, y: number, tx: number, ty: number): number {
    let dx = tx - x;
    let dy = ty - y;
    let result = (Math.sqrt((dx * dx) + (dy * dy)));
    return result;
  }
}
