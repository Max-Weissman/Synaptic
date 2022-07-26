let synaptic = require('synaptic')
let React = require('react')
let ReactDOM = require('react-dom')

let perceptron = new synaptic.Architect.Perceptron(10,10,10,3);
let trainingSet = [ //colors by wavelength
  {
    input: 380, //violet
    output: [131,0,181]
  },
  {
    input: 420, //indigo
    output: [106,0,255]
  },
  {
    input: 450,  //blue
    output: [0,70,255]
  },
  {
    input: 490,  //cyan
    output: [0,255,255]
  },
  {
    input: 500,  //seafoam
    output: [0,255,146]
  },
  {
    input: 510, //green
    output: [0,255,0]
  },
  {
    input: 550, //lime-green
    output: [163,255,0]
  },
  {
    input: 580, //yellow
    output: [255,255,0]
  },
  {
    input: 620, //orange
    output: [255,119,0]
  },
  {
    input: 645, //bright-red
    output: [255,0,0]
  }
]

const trainerTranslator = (arr) => {
  return arr.map(color => {
    color.input = numToBinary(color.input)
    color.output = color.output.map(cone => {
      return cone / 255
    })
    return color
  })
}

const numToBinary = (num) => {
  num = num.toString(2).split("")
  while (num.length < 10){
    num.unshift("0")
  }
  return num
}

const decimaltoInt = (arr) => {
  return arr.map(cone => {
    return Math.floor(cone * 255)
  })
}

const rate = (iterations,error) => {
  return  0.15 *(20000 - iterations)/20000
}

trainingSet = trainerTranslator(trainingSet)

let trainer = new synaptic.Trainer(perceptron)

trainer.train(trainingSet,{
	rate: rate,
	iterations: 20000,
	error: 0.05,
	shuffle: true,
	log: 10000,
	cost: synaptic.Trainer.cost.CROSS_ENTROPY
});

const divs = () => {
  let arr = []
  for (let i = 380; i < 646; i++){
    arr.push(<div key={i} style={{backgroundColor: `RGB(${decimaltoInt(perceptron.activate(numToBinary(i))).join()})`, height: "10px", width: "10px"}}></div>)
  }
  return arr
}


ReactDOM.render(
    <div>
        {divs()}
    </div>,
  document.getElementById('app')
)
            