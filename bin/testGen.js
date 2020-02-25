const Markov = require('../src/Markov');
const fs = require('fs');
const chainFile = './src/data/chain.json';
const pcount = process.argv[2] || 3;
const wcount = process.argv[3] || 100;

fs.readFile(chainFile, 'utf8', (err, data) => {
  console.log(
    Markov.generateText({ chain: JSON.parse(data), pcount, wcount }).join(
      '\n\n'
    )
  );
});
