import React, { useEffect, useState } from 'react';
import './App.scss';
import TextGenerator from './TextGenerator';

const chainData = require('./data/chain.json');

export default function App() {
  const [chain, setChain] = useState({});
  const [pcount, setPcount] = useState(3);
  const [wcount, setWcount] = useState(100);

  useEffect(() => {
    setChain(chainData);
  }, []);

  return (
    <div className="App">
      <header className="pure-g" role="navigation">
        <div className="pure-u-md-7-12 pure-u-1-1 title">
          <h1 className="site-title">HPLipsum</h1>
          <h2>The H.P. Lovecraft-inspired Lorem Ipsum generator</h2>
        </div>
        <div className="pure-u-1-12"></div>
        <div className="pure-u-4-12 pure-u-1-1" >
          <form className="pure-form pure-form-stacked">
            <fieldset>
              <label htmlFor="pCount">Number of paragraphs:</label>
              <input className="number-input"
              min="1"
              id="pCount"
                type="number"
                value={pcount}
                onChange={e => setPcount(e.target.value)}
              />

              <label htmlFor="wordCount">Words per paragraph:</label>
              <input className="number-input"
              min="1"
                id="wordCount"
                type="number"
                value={wcount}
                onChange={e => setWcount(e.target.value)}
              />

              <button className="pure-button" type="button">
                Summon Text
              </button>
            </fieldset>
          </form>
        </div>
      </header>

      <div className="generated-text">
        <TextGenerator
          chain={chain}
          pcount={pcount}
          wcount={wcount}
        ></TextGenerator>
      </div>

      <footer>
        Created by Marc Majcher <span>&lt;majcher@gmail.com&gt;</span>
      </footer>
    </div>
  );
}