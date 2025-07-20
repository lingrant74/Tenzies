import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Die from "./Die.jsx"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size'; 

export default function App() {
  const [width, height] = useWindowSize();
  const [ran, setRan] = React.useState(()=>generateAllNewDice());
  const gameWon = ran.every(die=>die.isHeld) && ran.every(die=>die.value === ran[0].value);
  function generateAllNewDice() {
    const random = [];
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * 6) + 1;
      const obj = {
        value: num,
        isHeld: false,
        id: nanoid()
      }
      random[i] = obj;
    }
    return random;
  }
  function hold(id) {
    setRan(prevRan => {
      return prevRan.map(die => {
        return die.id === id ?
          {
            ...die,
            isHeld: !die.isHeld
          } : die
      })

    })
  }

  function rollDice() {
    if (gameWon){
      newGame();
    }
    else{
          setRan(prevRan =>
      prevRan.map(ele => {
        if (!ele.isHeld) {
          return {
            ...ele,
            value: Math.ceil(Math.random() * 6),
          };
        } else {
          return ele;
        }
      })
    ); 
    }

  }
  function newGame(){
    setRan(generateAllNewDice())
  }

  const newButton = React.useRef(null);
  React.useEffect(() => {
  if (gameWon) {
    newButton.current.focus();
  }
}, [gameWon]);

  const diceElement = ran.map(ele => <Die
    key={ele.id}
    value={ele.value}
    isHeld={ele.isHeld}
    hold={hold}
    id={ele.id}
  />);
  return (
    <>

      <main className='main'>
        {gameWon && 
        <Confetti
          width={width}
          height={height}
        />
      }
        <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <div className='title'>
          Tenzies
        </div>
        <div className='description'>
          Roll until all dice are the same. Click each die to freeze it at its current value bewteen rolls.
        </div>
        <div className="container">
          {diceElement}
        </div>
        <button
          ref = {newButton}
          className='roll'
          onClick={rollDice}>
          {gameWon ? "New Game" : "Roll" }
        </button>
      </main>
    </>
  )

}
