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
  const [count, setCount] = React.useState(0)


  React.useEffect(() => {
    
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue){
      setTenzies(true)
      setCount(0)
      
      //console.log("You won!")
     // console.log(tenzies) 
      

    }
  }, [dice])

  const diceElements = dice.map(die => <Die key = {die.id} value={die.value} isHeld={die.isHeld} id={die.id} holdDice={() => holdDice(die.id)} />)

  function rollDice(isHeld){
    
    if(!tenzies && count < 10){
    setCount(count +1)
    console.log(count)
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? 
      die
      : generateNewDie()
    }))
  }else if(count === 10){
    //console.log("You reached 10 times")
    setCount(0)
    setDice(allNewDice())
   
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
    {((tenzies && count <10) && <Confetti />)}
      <div className="title">Tenzies</div>
      <div className="description">
        <p>Roll <strong>10</strong> times until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="container--1">
        {diceElements.slice(0,5)}
      </div>
      <div  className="container--2">
      {diceElements.slice(-5)}
      </div>
      <button onClick={rollDice}>{count ===10 || tenzies === true? "New Game": "Roll"}</button>
      {count < 10?<p className="para-green">You rolled: {count} times</p>:<p className="para-red">You rolled 10 times!</p> }
      {count ===10? <p>Try new game!</p>: null}
    </div>
  </main>
  )
  }
