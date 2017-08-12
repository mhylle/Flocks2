import {Unit} from "./Unit";
import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";
import * as globals from '../../../globals';

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
  private selected: boolean;

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

  update(): void {
  }

  setTarget(target: Tile): void {
    this.target = target;
  }

  getTarget(): Tile {
    return this.target;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }

  isSelected(): boolean {
    return this.selected;
  }
}
