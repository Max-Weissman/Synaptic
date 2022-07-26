import React from 'react'
import store, { AVAILABLE_COLORS, pickColor } from '../store'
import Table from './Table.js'
import ColorSelector from './ColorSelector.js'
import SolveMaze from './SolveMaze.js'
import MazeAnswer from './MazeAnswer'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()

    this.handleColorChange = this.handleColorChange.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleColorChange(evt) {
    store.dispatch(pickColor(evt.target.value))
  }
  
  
  render() {
    return (
      <div id="pixelate">
        <h1>Pixelate Maze</h1>
        <div>
          <ColorSelector colors={AVAILABLE_COLORS}
                         selectedColor={this.state.selectedColor}
                         onChange={this.handleColorChange}
          />
          <SolveMaze grid={this.state.grid}/>
        </div>
        <div id="table">
          <span id="start">Start --&gt;</span>
          <Table grid={this.state.grid} />
          <span id="end">End ----&gt;</span>
        </div>
        <MazeAnswer answer={this.state.answer}/>
      </div>
    )
  }
}
