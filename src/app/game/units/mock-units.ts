import {UnitType} from "../../model/units/UnitType";

export const UNITS: any[] = [
  {
    id: 'Arch01',
    name: 'Archer',
    avatar: 'assets/cannon1.png',
    type: UnitType.Ranged,
    x: 0,
    y: 0,
    posX: '0px',
    posY: '0px',
    w: 1,
    h: 1,
    hp: 128,
    level: 1
  }, {
    id: 'Cannon01',
    name: 'Cannon',
    avatar: 'assets/cannon.png',
    type: UnitType.Artillery, x: 0,
    y: 0,
    posX: '0px',
    posY: '0px',
    w: 1,
    h: 1,
    hp: 256,
    level: 1

  }
];
