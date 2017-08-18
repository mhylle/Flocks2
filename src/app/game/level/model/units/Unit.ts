import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";
import {Path} from "../../../pathing/Path";

export interface Unit {
  type: UnitType;

  x: number;
  y: number;
  posX: string;
  posY: string;

  w: number;
  h: number;
  width: string;
  height: string;

  setX(x: number) : void;

  setY(y: number): void;

  setWidth(w: number): void;

  setHeight(h: number): void;

  update(iteration: number): void;

  setTarget(tile: Tile): void;
  getTarget(): Tile;

  setSelected(selected: boolean): void;
  isSelected(): boolean;

  setPath(path: Path): void;

  getPath(): Path;

  setName(name: string);

  getName(): string;

}
