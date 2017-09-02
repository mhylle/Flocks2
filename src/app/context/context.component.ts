import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../game/player/player.service";
import {Player} from "../game/player/Player";

@Component({
  selector: 'context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

  playerContext: Player;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.playerContext.subscribe(playerContext => this.playerContext = playerContext);
  }

}
