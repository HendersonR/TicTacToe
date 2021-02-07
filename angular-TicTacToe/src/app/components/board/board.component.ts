import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;

  //added
  yourTurn: boolean;
  playerGame: boolean;
  comGame: boolean;
  tie: boolean;
  //

  constructor() {}
  
  ngOnInit(): void {
    this.vsPlayer();

  }
  
  
  //added
  resetGame(){
    this.squares = Array(9).fill(null);
    this.tie = false;
    this.winner = null;
    this.comGame = false;
    this.playerGame = false;
    this.xIsNext = true; 
    //var rando= Math.floor(Math.random()*2);
  }
  //needs to be 
  get player(){
    return this.xIsNext ? 'X': 'O';
  }
  vsCom(){
    this.resetGame();
    let rando = Math.floor(Math.random()*2);
    this.yourTurn = (rando) ? true: false;
    this.xIsNext = this.yourTurn;
    this.comGame = true;
    if(!this.yourTurn){//com goes first
      this.comTurn();
    }
  }

  vsPlayer(){
    this.resetGame();
    let rando = Math.floor(Math.random()*2);
    this.yourTurn = (rando) ? true: false
    this.xIsNext = this.yourTurn;
    this.playerGame = true;
  }

  passTurn(){
    //this.xIsNext = !this.xIsNext;
    this.yourTurn=!this.yourTurn;
    this.xIsNext = this.yourTurn;
  }

  //make a function that calls this funtion that determines  what type of game it is, should also move
  //the calculate winner call to the new function
  makeMove(idx:number){
    if(!this.squares[idx]){
      this.squares.splice(idx,1,this.player);
      this.passTurn();
    }

    //this.winner = this.calculateWinner();
  }
  
  calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    let check:boolean= false;

    for (let i = 0; i<lines.length; i++){
      const [a,b,c] = lines[i];
      if (
        this.squares[a] && 
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ){
        return this.squares[a];
      }
    }
    for (let j = 0; j<this.squares.length; j++)
    {
      if(!this.squares[j])
      {
        check = true;
      }

    }
    if(!check)
    {
      this.tie=true;
    }
    return null;
  }

  //added
  canWin(target:string){
    const pairs = [
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [1,0,2],
      [1,4,7],
      [2,1,0],
      [2,4,6],
      [2,5,8],
      [3,0,6],
      [3,4,5],
      [4,0,8],
      [4,1,7],
      [4,2,6],
      [4,3,5],
      [5,2,8],
      [5,3,4],
      [6,0,3],
      [6,2,4],
      [6,7,8],
      [7,1,4],
      [7,6,8],
      [8,0,4],
      [8,2,5],
      [8,6,7],
    
    ];
    for (let i = 0; i<pairs.length; i++){
      const [a,b,c] = pairs[i];
      if (
        !this.squares[a] && 
        this.squares[b] === target &&
        this.squares[c] === target
      ){
        return a;
      }
    }
    return null;

  }
  comTurn()
  {
       //check if its a com game
    if(this.comGame && !this.winner)
    {
      if(!this.yourTurn)//com turn
      {
        console.log("com turn\n");
        let neededIndex:number = this.canWin('O')//check if computer can win
        if(neededIndex)//can win
        {
          this.squares.splice(neededIndex,1,this.player); 
        }
        else
        {
          neededIndex=this.canWin('X')//check if player can win
          if(neededIndex)//can win
          {
            this.squares.splice(neededIndex,1,this.player);
          }
          else//nobody can win yet randomly select a location to place a target
          {
            let placed = false; 
            while(!placed)
            {
              let location = Math.floor(Math.random()*9)
              if(!this.squares[location])
              {
                this.squares.splice(location,1,this.player);
                placed = true;
              }
            }  
          }
        
          this.passTurn();
        } 
      }
     
    }
  }
  game(idx:number)
  {
    //console.log("game\n");
    //check if the game is over
    this.winner = this.calculateWinner();

    //check if its a com game
    if(this.comGame && !this.winner)
    {
      if(!this.yourTurn)//com turn
      {
        this.comTurn();
        //console.log("com turn\n");
        //let neededIndex:number = this.canWin('O')//check if computer can win
        //if(neededIndex)//can win
        //{
          //this.squares.splice(neededIndex,1,this.player); 
        //}
        //else
        //{
          //neededIndex=this.canWin('X')//check if player can win
          //if(neededIndex)//can win
          //{
            //this.squares.splice(neededIndex,1,this.player);
          //}
          //else//nobody can win yet randomly select a location to place a target
          //{
            //let placed = false; 
            //while(!placed)
            //{
              //let location = Math.floor(Math.random()*9)
              //if(!this.squares[location])
              //{
                //this.squares.splice(location,1,this.player);
                //placed = true;
              //}
            //}  
          //}
        
          //this.passTurn();
         
      }
      else if(!this.winner)//your turn
      {
        console.log("player turn\n");
        this.makeMove(idx);
        this.comTurn();
      }
    }

    //check if its vs a player
    else if(!this.winner)
    {
      this.makeMove(idx);
    }

  }//end of game


}//end of export
