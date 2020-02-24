const fs = require('fs');
const chainFile = './public/chain.json';
const paragraphCount = 3;
const wordCount = 100;

fs.readFile(chainFile, 'utf8', (err, data) => {
  const text = generateText(JSON.parse(data), paragraphCount, wordCount);
  console.log(text);
});

function select(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateText(chain, numParas, numWords) {
  let paragraphs = [];
  for (let i = 0; i < numParas; i++) {
    paragraphs.push(generateParagraph(chain, numWords));
  }
  return paragraphs.join('\n\n');
}

function generateParagraph(chain, numWords) {
  let text = select(chain._seeds);
  let [w1, w2] = text;
  for (
    let i = 0;
    i < numWords || !(text[text.length - 1].endsWith('.'));
    i++
  ) {
    const w3 = getNextWord(chain, w1, w2);
    text.push(w3);
    [w1, w2] = [w2, w3];
  }

  return text.join(' ');
}

function getNextWord(chain, w1, w2) {
  return select(chain[w1][w2]);
}
