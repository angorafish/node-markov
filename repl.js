const { MarkovMachine } = require('./markov');

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText());