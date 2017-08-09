import {UnitType} from "./UnitType";

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

}
