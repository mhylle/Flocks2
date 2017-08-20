import {Tile} from "./Tile";
import {GroundTypes} from "./GroundTypes";
import * as globals from '../../../globals';

export class Ground implements Tile {
  type: GroundTypes;

  x: number;

  y: number;
  w: number;
  h: number;
  posX: string;

  posY: string;
  width: string;
  height: string;
  cost: number;
  avatar: string;

  private blocked: boolean;
  private pathed: boolean;

  setX(x: number) {
    this.x = x;
    this.posX = x * globals.sizeFactor + "px";
  }

  setY(y: number) {
    this.y = y;
    this.posY = y * globals.sizeFactor + "px";
  }

  setWidth(w: number) {
    this.w = w;
    this.width = w * globals.sizeFactor + "px";
  }

  setHeight(h: number) {
    this.h = h;
    this.height = h * globals.sizeFactor + "px";
  }

  isBlocked(): boolean {
    return this.blocked;
  }

  setBlocked(blocked: boolean) {
    this.blocked = blocked;
  }

  setSelected(selected: boolean): void {
    // purposefully ignored, cannot select ground.
  }


  isSelected(): boolean {
    return false;
  }

  setPathed(pathed: boolean) {
    this.pathed = pathed;
  }

  isPath(): boolean {
    return this.pathed;
  }

  setCost(cost: number): void {
    this.cost = cost;
  }
}
