import React from 'react';
import ErrorBoundaries from '../ErrorBoundaries';

import { createModel } from './createModel';
import { getData } from './getData';
import { ploteData } from './ploteData';
import { convertToTensor } from './convertToTensor';
import { trainModel } from './trainModel';
import { testModel } from './testModel';

import '../App.css';

//@ts-ignore
const { tf, tfvis } = window;

console.log('tf = ', tf);
console.log('tfvis = ', tfvis);

function App() {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    getData().then((cleaned) => setData(cleaned));
  }, []);

  React.useEffect(() => {
    const fn = async () => {
      if (data.length !== 0) {
        const model = createModel();
        ploteData(data, model);
        const tensorData = convertToTensor(data);
        console.log('tensor = ', tensorData);
        const { inputs, labels } = tensorData;
        await trainModel(model, inputs, labels);
        testModel(model, data, tensorData);
      }
    };
    fn();
  }, [data]);

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
