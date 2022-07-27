let synaptic = require('synaptic')
let React = require('react')
let ReactDOM = require('react-dom')

let perceptron = new synaptic.Architect.Perceptron(10,10,10,3);
let trainingSet = [ //colors by wavelength
  {
    input: 380, //violet
    output: [97,0,97]
  },
  {
    input: 420, //indigo
    output: [106,0,255]
  },
  {
    input: 440,  //blue
    output: [0,0,255]
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
    input: 645, //red
    output: [255,0,0]
  },
  {
    input: 400, //fill in gaps
    output: [131,0,181]
  },
  {
    input: 425, 
    output: [84,0,255]
  },
  {
    input: 433, 
    output: [46,0,255]
  },
  {
    input: 450, 
    output: [0,0,255]
  },
  {
    input: 475,  
    output: [0,169,255]
  },
  {
    input: 480,  
    output: [0,213,255]
  },
  {
    input: 495,
    output: [0,255,203]
  },
  {
    input: 505, 
    output: [0,255,84]
  },
  {
    input: 530,
    output: [94,255,0]
  },
  {
    input: 565, 
    output: [210,255,0]
  },
  {
    input: 600, 
    output: [255,190,0]
  },
  {
    input: 630,
    output: [255,57,0]
  },
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

let prevError = 10
let learningRate = 0.1

const rate = (iterations,error) => {
  if (iterations < 5){
    return 0.1
  }
  return  learningRate / (1 + iterations * 0.001)
}

trainingSet = trainerTranslator(trainingSet)

let trainer = new synaptic.Trainer(perceptron)

trainer.train(trainingSet,{
	rate: rate,
	iterations: 20000,
	error: -1,
	shuffle: true,
	log: 1000,
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
            