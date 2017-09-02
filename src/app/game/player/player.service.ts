import {Injectable} from '@angular/core';
import {Player} from "./Player";
import {UUID} from "angular2-uuid";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlayerService {

  players: Player[] = [];

  private _playerContext: BehaviorSubject<Player> = new BehaviorSubject(null);
  public playerContext: Observable<Player> = this._playerContext.asObservable();

  constructor() {
  }

  createPlayer(player: Player) : boolean{
    if (this.getPlayerByUsername(player.userName) == null) {
      player.id = UUID.UUID();
      player.level = 1;
      player.xp = 0;
      this.players.push(player);
      this.setPlayerContext(player);
      return true;
    }
    return false;
  }

  getPlayerById(id: string): Player {
    return this.players.find(player => player.id == id);
  }

  getPlayerByUsername(userName: string): Player {
    return this.players.find(player => player.userName == userName);
  }

  setPlayerContext(player: Player) {
    this._playerContext.next(player);
  }

}
