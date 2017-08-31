import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LevelComponent} from './game/level/level.component';
import {GameEngineComponent} from './game/gameengine/game.engine.component';
import {LevelService} from "./game/level/level.service";
import {PathfinderService} from "./game/pathing/pathfinder.service";
import {HeuristicService} from "./game/pathing/heuristic.service";
import {CreatePlayerComponent} from './game/player/create/create.player.component';
import {RouterModule} from "@angular/router";
import {MainScreenComponent} from './main-screen/main-screen.component';
import {DeckBuilderComponent} from './decks/deck-builder/deck-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    GameEngineComponent,
    CreatePlayerComponent,
    MainScreenComponent,
    DeckBuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainScreenComponent
      },
      {
        path: 'createPlayer',
        component: CreatePlayerComponent
      },
      {
        path: 'decks',
        component: DeckBuilderComponent
      },
      {
        path: 'play',
        component: GameEngineComponent
      }
    ])
  ],
  providers: [LevelService, PathfinderService, HeuristicService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
