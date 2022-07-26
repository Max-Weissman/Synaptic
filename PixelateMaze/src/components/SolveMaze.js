import React from 'react'
const synaptic = require('synaptic')
import trainingSet, { gridConverter } from './TrainingSet'
import store, { mazeAnswer } from '../store'

trainingSet.forEach(set => {
    set.input = gridConverter(set.input)
})

let perceptron = new synaptic.Architect.Perceptron(25,10,1);
    
let trainer = new synaptic.Trainer(perceptron)

trainer.train(trainingSet,{
    rate: 0.1,
    iterations: 20000,
    error: 0.05,
    shuffle: true,
    log: 1000,
    cost: synaptic.Trainer.cost.CROSS_ENTROPY
});

export default (props) => {
  
  const solve = (e) => {
    e.preventDefault()
    let answer = perceptron.activate(gridConverter(props.grid))
    console.log(answer)
    if (answer > 0.5){
        store.dispatch(mazeAnswer("This Maze is solveable"))
    }
    else {
        store.dispatch(mazeAnswer("This Maze is not solveable"))
    }
  }    
    
  return (
    <span>
        <button onClick={solve}>Solve Maze</button>
    </span>
  )
}
