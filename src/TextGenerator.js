import React from 'react';

function select(arr) {
  return arr ? arr[Math.floor(Math.random() * arr.length)] : '.';
}

function generateText(args) {
  const { chain, pcount, wcount } = args;
  if (chain._seeds) {
    let paragraphs = [];
    for (let i = 0; i < pcount; i++) {
      paragraphs.push(generateParagraph(chain, wcount));
    }
    return paragraphs;
  }
  return ['Loading...'];
}

function generateParagraph(chain, numWords) {
  let text = select(chain._seeds);
  let [w1, w2] = text;
  for (
    let i = 0;
    i < numWords ||
    text[text.length - 1][text[text.length - 1].length - 1] !== '.';
    i++
  ) {
    const w3 = getNextWord(chain, w1, w2);
    text.push(w3);
    [w1, w2] = [w2, w3];
  }

  return text.join(' ');
}

function getNextWord(chain, w1, w2) {
  if (chain[w1] === undefined || chain[w1][w2] === undefined) {
    return select(chain._seeds);
  }
  return select(chain[w1][w2]);
}

export default function TextGenerator(props) {
  return generateText(props).map((p, i) => <p key={i}>{p}</p>);
}
