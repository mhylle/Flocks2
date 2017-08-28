import {Injectable} from '@angular/core';
import {Player} from "./Player";
import {UUID} from "angular2-uuid";

@Injectable()
export class PlayerService {

  players: Player[];

  constructor() {
  }

  createPlayer(player: Player) {
    if (!this.getPlayerByUsername(player.userName) == null) {
      player.id = UUID.UUID();
      player.level = 1;
      player.xp = 0;
    }
  }

  getPlayerById(id: string): Player {
    return this.players.find(player => player.id == id);
  }

  getPlayerByUsername(userName: string): Player {
    return this.players.find(player => player.userName == userName);
  }

}
