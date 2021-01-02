import React from 'react';
import ReactWebcam from 'react-webcam';

import ErrorBoundaries from '../ErrorBoundaries';
import '../App.css';

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
    async function init() {
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      //@ts-ignore
      const newModel = await tmImage.load(modelURL, metadataURL);
      setModel(newModel);
      // maxPredictions = newModel.getTotalClasses();
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
          const imageSrcCanvas = webcamRef.current.getCanvas(videoConstraints);
          let prediction = [];
          //@ts-ignore
          if (imageSrcCanvas) {
            prediction = await model.predict(imageSrcCanvas);
          }
          await delay(50);
          setResult(prediction);
          console.log('prediction = ', imageSrcCanvas?.length);
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
            mirrored={false}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.92}
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
          />
          <div>
            {result.map((item, index) => (
              <div key={String(index)}>
                <span>{item.className}</span>
                <span>{' - '}</span>
                <span>{item.probability.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </header>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
