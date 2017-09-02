import { Component, OnInit } from '@angular/core';
import {Player} from "../Player";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.player.component.html',
  styleUrls: ['./create.player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  player: Player;
  status: string;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.player = new Player();
  }

  createPlayer() {
    if (this.player.name != null && this.player.email != null) {
      let result = this.playerService.createPlayer(this.player);
      if (result) {
        this.status = "Player " + this.player.name + " created!";
      } else {
        this.status = "Unable to create player " + this.player.name;
      }
    }
  }

}
