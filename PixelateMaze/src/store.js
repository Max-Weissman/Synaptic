import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

const NUM_COLUMNS = 5
export const AVAILABLE_COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "black",
  "white",
  "brown",
]

let grid = []

for (let i = 0; i < 5; i++){
  let arr = []
  for (let j = 0; j < NUM_COLUMNS; j++){
    arr.push("")
  }
  grid.push(arr)
}

const initialState = {
  grid,
  selectedColor: AVAILABLE_COLORS[0],
  answer: ''
}

// ACTION TYPES
const PICK_COLOR = 'PICK_COLOR'
const COLORIZE   = 'COLORIZE'
const MAZE_ANSWER = "MAZE_ANSWER"

// ACTION CREATORS
export const pickColor = (color) => ({ type: PICK_COLOR, color })
export const colorize = (row, column) => ({ type: COLORIZE, row, column })
export const mazeAnswer = (answer) => ({ type: MAZE_ANSWER, answer})

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case PICK_COLOR:
      return { ...state, selectedColor: action.color }
    case COLORIZE:
      const newGrid = [...state.grid]
      newGrid[action.row] = [...newGrid[action.row]]
      if (newGrid[action.row][action.column] === state.selectedColor){
        newGrid[action.row][action.column] = ""
      }
      else{
        newGrid[action.row][action.column] = state.selectedColor
      }
      return { ...state, grid: newGrid}
    case MAZE_ANSWER:
      return { ...state, answer: action.answer }
    default:
      return state
  }
}

export default createStore(reducer)
