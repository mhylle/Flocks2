import { Component, OnInit } from '@angular/core';
import {Player} from "../Player";

@Component({
  selector: 'app-create',
  templateUrl: './create.player.component.html',
  styleUrls: ['./create.player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  player: Player;
  constructor() { }

  ngOnInit() {
  }

}
