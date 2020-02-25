import React from 'react';
import Markov from '../src/Markov';

export default function TextGenerator(props) {
  return Markov.generateText(props).map((p, i) => <p key={i}>{p}</p>);
}
