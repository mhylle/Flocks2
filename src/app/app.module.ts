import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LevelComponent } from './game/level/level.component';
import { GameEngineComponent } from './game/gameengine/game.engine.component';
import {LevelService} from "./game/level/level.service";
import {PathfinderService} from "./game/pathing/pathfinder.service";

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    GameEngineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LevelService, PathfinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
