import {Tile} from "./Tile";

export class Ground implements Tile {
  x: number;
  y: number;
  w: number;
  h: number;

  type: GroundTypes;

}
