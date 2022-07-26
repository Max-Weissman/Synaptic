

for (let n = 0; n < 100 ; n++){
    let grid = []
    for (let i = 0; i < 5; i++){
      let arr = []
      for (let j = 0; j < 5; j++){
        if (Math.random() > 0.33){
            arr.push("")
        }
        else{
            arr.push("1")
        }
      }
      grid.push(arr)
    }
    
    console.log({
        input: grid,
        output: [1]
    },",")
}