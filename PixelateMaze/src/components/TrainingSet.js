const random = 0.33
const trainSize = 10000
const testSize = 2000

export const gridConverter = (grid) => {
    let arr = grid.map(row => {
        return row.map(cell => {
            if (cell === ""){
                return 1
            }
            else {
                return 0
            }
        })
    })
    let newArr = []
    arr.forEach(row => {
        newArr = newArr.concat(row)
    })
    return newArr
}

const makeGrid = () => {
    for (let n = 0; n < 100 ; n++){
        let grid = []
        for (let i = 0; i < 5; i++){
          let arr = []
          for (let j = 0; j < 5; j++){
            if (Math.random() > random){
                arr.push("")
            }
            else{
                arr.push("1")
            }
          }
          grid.push(arr)
        }
    return grid
    }   
}

export const solveGrid = (grid) => {
    if (grid[0][0] === "1" || grid[4][4] === "1"){
        return [0]
    }
    let trav = [0]
    let checked = []
    while(trav.length > 0){
        if (trav[0] === 24){
            return [1]
        }
        let right = trav[0]
        let left = trav[0]
        let up = trav[0]
        let down = trav[0]
        if ((right + 1) % 5 === 0){
            right = 0
        }
        right++
        if (left % 5 === 0){
            left = 0
        }
        left--
        up -= 5
        down += 5
        if (right < 25){ //Checks if within index of grid
            if (grid[Math.floor(right / 5)][right % 5] === ''){ //checks if that cell is a wall
                if (!checked.includes(right) && !trav.includes(right)){ //checks if already checked that cell
                    trav.push(right)
                }
            }
        }
        if (left > -1){
            if (grid[Math.floor(left / 5)][left % 5] === ''){
                if (!checked.includes(left) && !trav.includes(left)){
                    trav.push(left)
                }
            }
        }
        if (up > -1){
            if (grid[Math.floor(up / 5)][up % 5] === ''){
                if (!checked.includes(up) && !trav.includes(up)){
                    trav.push(up)
                }
            }
        }
        if (down < 25){
            if (grid[Math.floor(down / 5)][down % 5] === ''){
                if (!checked.includes(down) && !trav.includes(down)){
                    trav.push(down)
                }
            }
        }
        checked.push(trav.shift())
    }
    return [0]
    
}

const trainingSet = (test) => {
    let set = []
    for (let i = 0; i < test; i++){
        let grid = makeGrid()
        set.push(
            {
                input: grid,
                output: solveGrid(grid)
            }
        )
    }
    return set
}


export const testSet = trainingSet(testSize)

export default trainingSet(trainSize)