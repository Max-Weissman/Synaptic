import React from 'react'
const synaptic = require('synaptic')
import trainingSet, { gridConverter } from './TrainingSet'
import store, { mazeAnswer } from '../store'

trainingSet.forEach(set => {
    set.input = gridConverter(set.input)
})

let perceptron = new synaptic.Architect.Perceptron(25,20,1);
    
let trainer = new synaptic.Trainer(perceptron)

let prevError = 0.1
let learningRate = 0.01

const rate = (iterations,error) => {
  if (error < prevError * 0.9){
      prevError = error
      learningRate *= 0.99
      if (learningRate < 0.00000000000000000000000000000000000000000000000000000000000009){
          prevError = 0
          learningRate = 0
      }
  }
  else {
      prevError = 0.1
  }
  return learningRate
}

trainer.train(trainingSet,{
    rate,
    iterations: 10000,
    error: 0.0000000005,
    shuffle: true,
    log: 1000,
    cost: synaptic.Trainer.cost.BINARY
});

export default (props) => {
  
  const solve = (e) => {
    e.preventDefault()
    let answer = perceptron.activate(gridConverter(props.grid))
    console.log(answer)
    if (answer > 0.5){
        store.dispatch(mazeAnswer("I calculate that this maze is solveable"))
    }
    else {
        store.dispatch(mazeAnswer("I calculate that this maze is not solveable"))
    }
  }    
    
  return (
    <span>
        <button onClick={solve}>Solve Maze</button>
    </span>
  )
}
