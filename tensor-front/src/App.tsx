import React from 'react';
import ErrorBoundaries from './ErrorBoundaries';

import './App.css';

//@ts-ignore
const { tf, tfvis } = window;

// console.log('tf = ', tf);
// console.log('tfvis = ', tfvis);

// // Define a model for linear regression.
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// // Generate some synthetic data for training.
// const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// // Train the model using the data.
// model.fit(xs, ys, { epochs: 10 }).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
//   model.predict(tf.tensor2d([5], [1, 1])).print();
//   // Open the browser devtools to see the output
// });

function App() {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getData() {
      const carsDataResponse = await fetch(
        'https://storage.googleapis.com/tfjs-tutorials/carsData.json',
      );
      const carsData = await carsDataResponse.json();
      console.log('carsData = ', carsData);
      const cleaned = carsData
        .map((car: any) => ({
          mpg: car.Miles_per_Gallon,
          horsepower: car.Horsepower,
        }))
        .filter((car: any) => car.mpg != null && car.horsepower != null);
      console.log('carsData cleaned = ', cleaned);
      setData(cleaned);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          <div>{`data.length = ${data.length}`}</div>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
