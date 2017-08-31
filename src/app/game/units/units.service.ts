import {Injectable} from '@angular/core';
import {Unit} from "../../model/units/Unit";
import {UNITS} from "./mock-units";

@Injectable()
export class UnitsService {

  constructor() {
  }

  getUnit(id: string) : Unit {
    return UNITS.find(value => value.getId() == id);
  }
  getUnits() : Unit[] {
    return UNITS;
  }

  addUnit(unit: Unit) {

  }

}
