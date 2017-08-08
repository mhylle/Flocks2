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

}
