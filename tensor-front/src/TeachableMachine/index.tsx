import React from 'react';
import ReactWebcam from 'react-webcam';

import ErrorBoundaries from '../ErrorBoundaries';

import '../App.css';

//@ts-ignore
const { tf, tfvis } = window;

console.log('tf = ', tf);
console.log('tfvis = ', tfvis);

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: 'environment',
};

function App() {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    const fn = async () => {};
    fn();
  }, [data]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      //@ts-ignore
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('imageSrc = ', imageSrc);
      setData(imageSrc && imageSrc.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef?.current]);

  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          {`data count = ${data}`}
          <ReactWebcam
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
