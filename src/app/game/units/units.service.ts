import { Injectable } from '@angular/core';
import {Unit} from "../../model/units/Unit";

@Injectable()
export class UnitsService {

  units: Unit[] = [];
  constructor() {
    

  }

  getUnit(id: string) : Unit {
    return this.units.find(value => value.getId() == id);
  }

  addUnit(unit: Unit) {

  }

}
