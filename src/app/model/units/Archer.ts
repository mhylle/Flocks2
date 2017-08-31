import {Unit} from "./Unit";
import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";
import {Path} from "../../game/pathing/Path";

export class Archer implements Unit {
  id: string;
  type: UnitType = UnitType.Archer;
  x: number;
  y: number;
  posX: string;
  posY: string;
  w: number;
  h: number;
  width: string;
  height: string;

  getId(): string {
    return undefined;
  }

  setX(x: number): void {
  }

  setY(y: number): void {
  }

  setWidth(w: number): void {
  }

  setHeight(h: number): void {
  }

  update(iteration: number): void {
  }

  setTarget(tile: Tile): void {
  }

  getTarget(): Tile {
    return undefined;
  }

  setSelected(selected: boolean): void {
  }

  isSelected(): boolean {
    return undefined;
  }

  setPath(path: Path): void {
  }

  getPath(): Path {
    return undefined;
  }

  setName(name: string) {
  }

  getName(): string {
    return undefined;
  }

}
