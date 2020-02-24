import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header class="" role="navigation">
        <h1 class="site-title">HPLipsum</h1>
        <h2>The H.P. Lovecraft-inspired Lorem Ipsum generator</h2>
      </header>

      <form class="pure-form pure-form-stacked">
        <fieldset>
          <label for="pCount">Number of paragraphs:</label>
          <input id="pCount" type="number" value="3" />

          <label for="wordCount">Words per paragraph:</label>
          <input id="wordCount" type="number" value="100" />

          {/* loadingText */}

          <button class="pure-button" type="button">
            Summon Text
          </button>
        </fieldset>
      </form>

      <div class="generated-text"></div>

      <footer>
        Created by Marc Majcher <email>&lt;majcher@gmail.com&gt;</email>
      </footer>
    </div>
  );
}

export default App;
