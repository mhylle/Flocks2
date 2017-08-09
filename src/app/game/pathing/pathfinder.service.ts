import { Injectable } from '@angular/core';
import {Path} from "./Path";
import {Tile} from "../level/model/level/Tile";

@Injectable()
export class PathfinderService {

  constructor() { }
  private open: Tile[] = [];
  private closed: Tile[] = [];

  findPath(level: Tile[], source: Tile, target: Tile): Path {

    return null;
  }
}
