const fs = require('fs');
const textDir = './text';
const chainFile = './src/data/chain.json';
const chain = {
  _seeds: [],
};

const files = fs.readdirSync(textDir);

for (let i = 0; i < files.length; i++) {
  const words = fs.readFileSync(`${textDir}/${files[i]}`, 'utf8').split(/\s+/);
  chain._seeds.push([words[0], words[1]]);
  indexWords(words);
}
fs.writeFile(chainFile, JSON.stringify(chain), () => console.log('done.'));

function indexWords(words) {
  for (let i = 0; i < words.length - 2; i++) {
    const [w1, w2, w3] = [words[i], words[i + 1], words[i + 2]];
    if (!(w1 in chain)) {
      chain[w1] = {};
    }
    if (!(w2 in chain[w1])) {
      chain[w1][w2] = [];
    }
    chain[w1][w2].push(w3);
  }
}
