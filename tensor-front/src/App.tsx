import React from 'react';
import ErrorBoundaries from './ErrorBoundaries';

import logo from './logo.svg';
import './App.css';

//@ts-ignore
const tf = window.tf;

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys, { epochs: 10 }).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5], [1, 1])).print();
  // Open the browser devtools to see the output
});

function App() {
  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          {/* <div
          className="App-link"
          onClick={() => {
            console.log('shareRet prep = ');
            const data = {
              title: 'web.dev',
              text: 'Check out web.dev.',
              url: 'https://web.dev/',
            };

            if (navigator.share) {
              navigator
                .share(data)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else {
              console.log('navigator.share not found');
            }
          }}
        >
          Share link 222
        </div> */}
          <div
            className="App-link"
            onClick={() => {
              console.log('shareRet prep = ');
            }}
          >
            <a href="yandexnavi://build_route_on_map?lat_from=55.74&lon_from=37.60&lat_to=55.76&lon_to=37.64">
              Открыть Яндекс.Навигатор
            </a>
          </div>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
