import Die from "./Die"
import React from "react";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function generateNewDie(){
  return { 
    value: Math.floor(Math.random()*6)+1, 
    isHeld: false,
    id: nanoid()
  }
}


function allNewDice(){
  let new_Dice = []
  for (let i=0; i<10; i++){
    new_Dice.push(
      generateNewDie()
    );
  }

  return new_Dice
}



export default function App() {
  const [dice, setDice]= React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)


  React.useEffect(() => {
    
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue){
      setTenzies(true)
      //console.log("You won!")
     // console.log(tenzies) 
      

    }
  }, [dice])

  const diceElements = dice.map(die => <Die key = {die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={() => holdDice(die.id)} />)

  function rollDice(isHeld){

    if(!tenzies){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? 
      die
      : generateNewDie()
    }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }


  }
  
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld}
      : die
    }))
    
  }

  


  return (<main>
    <div className="setup">
      <div className="title">Tenzies</div>
      <div className="description">
      {tenzies && <Confetti />}
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="container--1">
        {diceElements.slice(0,5)}
      </div>
      <div  className="container--2">
      {diceElements.slice(-5)}
      </div>
      <button onClick={rollDice}>{tenzies === true ? "New Game": "Roll"}</button>
    </div>
  </main>
  )
  }
