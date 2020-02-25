const Markov = require('../src/Markov');
const fs = require('fs');
const textDir = './text';
const chainFile = './src/data/chain.json';
const chain = {};

const files = fs.readdirSync(textDir);
for (let i = 0; i < files.length; i++) {
  Markov.indexWords(
    chain,
    fs.readFileSync(`${textDir}/${files[i]}`, 'utf8').split(/\s+/)
  );
}
fs.writeFile(chainFile, JSON.stringify(chain), () => console.log('done.'));
