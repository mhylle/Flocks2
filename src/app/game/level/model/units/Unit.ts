import {UnitType} from "./UnitType";
import {Tile} from "../level/Tile";

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

  update(): void;

  setTarget(tile: Tile): void;
  getTarget(): Tile;

}
