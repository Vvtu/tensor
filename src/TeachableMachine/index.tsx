import React from 'react';

import ErrorBoundaries from '../ErrorBoundaries';

import '../App.css';

const WEBCAM_CONTAINER_ID = 'webcam-container-id';
//@ts-ignore
const { tf, tfvis, tmImage } = window;
console.log('tf = ', tf);
console.log('tfvis = ', tfvis);

const URL = 'https://teachablemachine.withgoogle.com/models/G9cPc7f35/';
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

let model: any;
let webcam: any;
let maxPredictions: number;

function App() {
  const captureTimeoutId = React.useRef<NodeJS.Timeout>();
  const [capture, setCapture] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any[]>([]);

  const delay = (t: number) =>
    new Promise((resolve, reject) => {
      captureTimeoutId.current = setTimeout(
        () => { resolve(true); captureTimeoutId.current = undefined;}, t);
    });

  React.useEffect(() => {
    async function init() {
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      //@ts-ignore
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      console.log('maxPredictions = ', maxPredictions);
      try {
        // Convenience function to setup a webcam
        const flip = false; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        document?.getElementById(WEBCAM_CONTAINER_ID)?.appendChild(webcam?.canvas);
      } catch (e) {
        console.log('error = ', e);
        setResult(['error = ' + e]);
      }
    }
init();
    return () => captureTimeoutId.current && clearTimeout(captureTimeoutId.current);
  }, []);

  React.useEffect(() => {
    console.log('capture = ', capture);
    if (capture) {
      async function processOnePicture() {
        webcam.update(); // update the webcam frame
        const prediction = await model.predict(webcam.canvas);
        setResult(prediction);
        console.log('prediction = ', prediction);
        await delay(50);
      }
      processOnePicture();
    } else {
      webcam?.stop?.();
    }
  }, [capture, result]);


  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
          <div>{`result = ${JSON.stringify(result)}`}</div>
          <div id={WEBCAM_CONTAINER_ID}>webcam-container</div>

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
