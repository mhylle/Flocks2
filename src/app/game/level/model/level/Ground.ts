import {Tile} from "./Tile";
import {GroundTypes} from "./GroundTypes";

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

}
