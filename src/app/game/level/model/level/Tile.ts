import {GroundTypes} from "./GroundTypes";

export interface Tile {
  x: number;
  y: number;
  w: number;
  h: number;

  posX: string;
  posY: string;
  width: string;
  height: string;

  type: GroundTypes;

  setX(x: number);

  setY(y: number);

  setWidth(w: number);

  setHeight(h: number);

  isBlocked(): boolean;


}
