import React from 'react';
import ErrorBoundaries from '../ErrorBoundaries';

import { createModel } from './createModel';
import { getData } from './getData';
import { ploteData } from './ploteData';
import { convertToTensor } from './convertToTensor';

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
    if (data.length !== 0) {
      const model = createModel();
      ploteData(data, model);
      const tensor = convertToTensor(data);
      console.log('tensor = ', tensor);
    }
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
