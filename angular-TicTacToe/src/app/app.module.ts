import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
//import { ButtonsComponent } from './components/buttons/buttons.component';
//import { SquaresComponent } from './componnts/squares/squares.component';
import { SquareComponent } from './components/square/square.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    //ButtonsComponent,
    //SquaresComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
