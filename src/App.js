import React, { useEffect, useState } from 'react';
import './App.scss';
import TextGenerator from './TextGenerator';

export default function App() {
  const chainFile = 'chain.json';
  const [chain, setChain] = useState({});

  useEffect(() => {
    fetch(chainFile)
      .then(res => res.json())
      .then(json => setChain(json));
  }, []);

  return (
    <div className="App">
      <header className="" role="navigation">
        <h1 className="site-title">HPLipsum</h1>
        <h2>The H.P. Lovecraft-inspired Lorem Ipsum generator</h2>
      </header>

      <form className="pure-form pure-form-stacked">
        <fieldset>
          <label htmlFor="pCount">Number of paragraphs:</label>
          <input id="pCount" type="number" value="3" />

          <label htmlFor="wordCount">Words per paragraph:</label>
          <input id="wordCount" type="number" value="100" />

          <button className="pure-button" type="button">
            Summon Text
          </button>
        </fieldset>
      </form>

      <div className="generated-text">
        <TextGenerator chain={chain}></TextGenerator>
      </div>

      <footer>
        Created by Marc Majcher <span>&lt;majcher@gmail.com&gt;</span>
      </footer>
    </div>
  );
}

