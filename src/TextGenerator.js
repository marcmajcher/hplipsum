import React from 'react';

function select(arr) {
  if (arr === undefined) {
    console.log('ARRRRRGH UNDEF', arr);
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateText(chain, numParas, numWords) {
  if (chain._seeds) {
    let paragraphs = [];
    for (let i = 0; i < numParas; i++) {
      paragraphs.push(generateParagraph(chain, numWords));
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
    if (typeof(w3) !== 'string') {
      break;
    }
    text.push(w3);
    [w1, w2] = [w2, w3];
    if (typeof text[text.length - 1] !== 'string') {
      console.error('WATTTTTTTTTTTTTT');
    }
    console.log("==> ",text[text.length - 1])
    console.log("I",i, "DOT:",text[text.length - 1][text[text.length - 1].length - 1] !== '.')
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
  const paragraphs = generateText(props.chain, props.pcount, props.wcount);
  return paragraphs.map((para, i) => <p key={i}>{para}</p>);
}
