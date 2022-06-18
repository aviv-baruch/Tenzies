import React from "react"
import Dice from "./Components/Dice.js"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'


function App() {
  const [dices, setDice] = React.useState(allNewDices());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue)
    {
      setTenzies(true)

    }
  }, [dices])

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function allNewDices() {
    let newDice = []
    for (let i = 0; i < 10; i++)

      newDice.push(
        {
          id: nanoid(),
          value: getRandomArbitrary(1, 7),
          isHeld: false
        });

    return newDice
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return !die.isHeld ?
        { ...die, value: getRandomArbitrary(1, 7) } :
        die
    }))
  }

  function newGame() {
    setTenzies(false)
    setDice(allNewDices())
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))

  }


  const diceElements = dices.map((die) => <Dice
    value={die.value}
    isHeld={die.isHeld}
    key={die.id}
    holdDice={() => holdDice(die.id)}
  />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice--rows">
        {diceElements}
      </div>
      <div
        className="re--roll"
        onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "NEW GAME" : "ROLL"}
      </div>

    </main>
  )
}

export default App;
