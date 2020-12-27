import React from 'react';
import Webcam from 'react-webcam';

import ErrorBoundaries from '../ErrorBoundaries';

import '../App.css';

//@ts-ignore
const { tf, tfvis } = window;

console.log('tf = ', tf);
console.log('tfvis = ', tfvis);

const videoConstraints = {
  width: 800,
  height: 720,
  facingMode: 'environment',
};

function App() {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    // getData().then((cleaned) => setData(cleaned));
  }, []);

  React.useEffect(() => {
    const fn = async () => {
      // if (data.length !== 0) {
      //   const model = createModel();
      //   ploteData(data, model);
      //   const tensorData = convertToTensor(data);
      //   console.log('tensor = ', tensorData);
      //   const { inputs, labels } = tensorData;
      //   await trainModel(model, inputs, labels);
      //   testModel(model, data, tensorData);
      // }
    };
    fn();
  }, [data]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    //@ts-ignore
    const imageSrc = webcamRef.current && webcamRef.current.getScreenshot();
    console.log('imageSrc = ', imageSrc);
    //@ts-ignore
    setData(imageSrc && imageSrc.length);
  }, [webcamRef]);

  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          {`data count = ${data}`}
          <Webcam
            audio={false}
            mirrored={true}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.92}
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
