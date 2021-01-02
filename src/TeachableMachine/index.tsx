import React from 'react';
import ReactWebcam from 'react-webcam';

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

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: 'environment',
};

let maxPredictions: number;

function App() {
  const webcamRef = React.useRef(null);
  const captureTimeoutId = React.useRef<NodeJS.Timeout>();
  const [result, setResult] = React.useState<any[]>([]);
  const [model, setModel] = React.useState<any>(null);

  const delay = (t: number) =>
    new Promise((resolve, reject) => {
      captureTimeoutId.current = setTimeout(() => {
        resolve(true);
        captureTimeoutId.current = undefined;
      }, t);
    });

  React.useEffect(() => {
    maxPredictions = 0;
    async function init() {
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      //@ts-ignore
      const newModel = await tmImage.load(modelURL, metadataURL);
      setModel(newModel);
      maxPredictions = newModel.getTotalClasses();
      console.log('maxPredictions = ', maxPredictions);
    }
    init();
    return () => {
      if (captureTimeoutId.current) {
        clearTimeout(captureTimeoutId.current);
        captureTimeoutId.current = undefined;
      }
    };
  }, []);

  React.useEffect(() => {
    console.log('React.useEffect webcamRef.current = ', webcamRef.current);
    console.log('React.useEffect model = ', model);
    async function processOnePicture() {
      if (webcamRef.current && model) {
        try {
          //@ts-ignore
          const imageSrc = webcamRef.current.getScreenshot();
          //@ts-ignore
          // const prediction = await model.predict(imageSrc);
          await delay(1000);
          setResult([imageSrc?.length]);
          console.log('prediction = ', imageSrc?.length);
        } catch (e) {
          console.error('processOnePicture error = ', e);
        }
      } else {
        if (captureTimeoutId.current) {
          clearTimeout(captureTimeoutId.current);
          captureTimeoutId.current = undefined;
        }
      }
    }
    processOnePicture();
  }, [result, model]);

  return (
    <div className="App">
      <ErrorBoundaries>
        <header className="App-header">
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
          <div>{`result = ${JSON.stringify(result)}`}</div>
          <div id={WEBCAM_CONTAINER_ID}>webcam-container</div>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
