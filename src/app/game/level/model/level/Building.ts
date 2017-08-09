import {Tile} from "./Tile";
import {GroundTypes} from "./GroundTypes";

export class Building implements Tile {
  name: string;
  hp: number;

  type: GroundTypes;

  x: number;
  y: number;
  w: number;
  h: number;

  posX: string;
  posY: string;
  width: string;
  height: string;

  setX(x: number) {
    this.x = x;
    this.posX = x + "px";
  }

  setY(y: number) {
    this.y = y;
    this.posY = y + "px";
  }

  setWidth(w: number) {
    this.w = w;
    this.width = w + "px";
  }

  setHeight(h: number) {
    this.h = h;
    this.height = h + "px";
  }
  isBlocked(): boolean {
    return true;
  }


}
