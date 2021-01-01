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

let count = 0;

function App() {
  const captureTimeoutId = React.useRef<NodeJS.Timeout>();
  const [capture, setCapture] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any[]>([]);

  const delay = (t: number) =>
    new Promise((resolve, reject) => {
      captureTimeoutId.current = setTimeout(() => resolve(true), t);
    });

  React.useEffect(() => {
    const id = captureTimeoutId.current;
    return () => id && clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureTimeoutId.current]);

  React.useEffect(() => {
    if (capture) {
      delay(100).then(() => {
        const newResult = [...result, count++];
        if (newResult.length > 5) {
          newResult.shift();
        }
        setResult(newResult);
      });
    }
  }, [capture, result]);

  const webcamRef = React.useRef(null);

  // const capture = React.useCallback(() => {
  //   if (webcamRef.current) {
  //     //@ts-ignore
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     console.log('imageSrc = ', imageSrc);
  //     setData(imageSrc && imageSrc.length);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [webcamRef?.current]);

  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          <div>{`result = ${JSON.stringify(result)}`}</div>
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
          <button
            onClick={() => {
              setCapture(!capture);
            }}
          >
            Capture photo
          </button>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
