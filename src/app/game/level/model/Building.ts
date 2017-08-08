import {Tile} from "./Tile";
import {GroundTypes} from "./GroundTypes";

export class Building implements Tile {
  name: string;
  hp: number;

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
