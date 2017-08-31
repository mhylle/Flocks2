import {Component, OnInit} from '@angular/core';
import {UnitsService} from "../../game/units/units.service";
import {Unit} from "../../model/units/Unit";

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css'],
  providers: [UnitsService]
})
export class DeckBuilderComponent implements OnInit {

  units: Unit[];

  constructor(private unitService: UnitsService) {
    this.units = this.unitService.getUnits();
  }

  ngOnInit() {

  }

}
