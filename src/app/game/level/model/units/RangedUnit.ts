import {Unit} from "./Unit";
import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";
import * as globals from '../../../globals';
import {Path} from "../../../pathing/Path";

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
  private path: Path;

  private currentPathPosition: number = 0;

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
    if (this.path.steps.length >0) {
      let step = this.path.steps[this.currentPathPosition];
      if (step != null) {
        this.setX(step.x);
        this.setY(step.y);
        console.log("Update: setting x, y to "+ this.x + ", " + this.y);
        this.currentPathPosition++;
      }
    }
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


  setPath(path: Path): void {
    this.path = path;
  }

  getPath(): Path {
    return this.path;
  }
}
