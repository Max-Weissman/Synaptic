import React from 'react'
const synaptic = require('synaptic')
import { gridConverter, solveGrid } from './TrainingSet'
import store, { mazeAnswer } from '../store'
import file from './file.js'


let trained = synaptic.Network.fromJSON(file)

export default (props) => {
  
  const solve = (e) => {
    e.preventDefault()
    let answer = solveGrid(props.grid)
    console.log(answer)
    if (answer >= 0.5){
        store.dispatch(mazeAnswer("This maze is solveable"))
    }
    else {
        store.dispatch(mazeAnswer("This maze is not solveable"))
    }
  }
  
  const guess = (e) => {
    e.preventDefault()
    let answer = trained.activate(gridConverter(props.grid))
    console.log(answer)
    if (answer >= 0.5){
        store.dispatch(mazeAnswer("I calculate that this maze is solveable"))
    }
    else {
        store.dispatch(mazeAnswer("I calculate that this maze is not solveable"))
    }
  }    
    
  return (
    <span>
      <button onClick={solve}>Solve Maze</button>
      <button onClick={guess}>AI's Guess</button>
    </span>
  )
}
