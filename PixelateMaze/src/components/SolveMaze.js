import React from 'react'
const synaptic = require('synaptic')
import trainingSet, { gridConverter, solveGrid, testSet } from './TrainingSet'
import store, { mazeAnswer } from '../store'

trainingSet.forEach(set => {
    set.input = gridConverter(set.input)
})

let perceptron = new synaptic.Architect.Perceptron(25,20,1);
    
let trainer = new synaptic.Trainer(perceptron)

let learningRate = 0.01

const rate = (iterations,error) => {
  if (iterations < 5){
    return 0.1
  }
  return  learningRate / (1 + iterations * 0.001)
}



trainer.train(trainingSet,{
    rate,
    iterations: 2000,
    error: 0.0000000005,
    shuffle: true,
    log: 1000,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY
});

let test = testSet.reduce( (total, grid) => {
  let answer = perceptron.activate(gridConverter(grid.input))
  if (Math.round(answer) === grid.output[0]){
      return total + 1
    }
  else {
    return total
  }
}, 0)

let accuracy = test / testSet.length

console.log("accuracy:", accuracy)

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
    let answer = perceptron.activate(gridConverter(props.grid))
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
