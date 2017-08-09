import { Injectable } from '@angular/core';
import {Path} from "./Path";
import {Tile} from "../level/model/level/Tile";
import {LevelService} from "../level/level.service";

@Injectable()
export class PathfinderService {

  constructor(private levelService: LevelService) { }
  private open: Tile[] = [];
  private closed: Tile[] = [];


  findPath(source: Tile, target: Tile): Path {
    this.open = [];
    this.closed = [];
    let level = this.levelService.getLevel();
    if (level[target.x][target.y].isBlocked()) {
      return null;
    }



    return null;
  }
}
