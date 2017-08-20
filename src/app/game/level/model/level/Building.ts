import {Tile} from "./Tile";
import {GroundTypes} from "./GroundTypes";
import * as globals from '../../../globals';

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
  cost: number;
  avatar: string;
  private selected: boolean;
  private pathed: boolean;

  setX(x: number) {
    this.x = x;
    this.posX = x * globals.sizeFactor + "px";
    console.log("setting build x to: Tile:" + this.x + " UI: " + this.posX);
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
    return true;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }

  isSelected(): boolean {
    return this.selected;
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
