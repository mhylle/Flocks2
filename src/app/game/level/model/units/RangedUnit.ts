import {Unit} from "./Unit";
import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";

export class RangedUnit implements Unit {

  type: UnitType;
  x: number;
  y: number;
  posX: string;
  posY: string;
  w: number;
  h: number;
  width: string;
  height: string;
  private target: Tile;

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

  update(): void {
  }

  setTarget(target: Tile): void {
    this.target = target;
  }

  getTarget() : Tile {
    return this.target;
  }


}
