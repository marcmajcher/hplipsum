import React from 'react';
const Markov = require('../src/Markov');

export default function TextGenerator(props) {
  return Markov.generateText(props).map((p, i) => <p key={i}>{p}</p>);
}
