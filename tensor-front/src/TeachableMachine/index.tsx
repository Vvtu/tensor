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
      captureTimeoutId.current = setTimeout(() => resolve(true), t);
    });

  const id = captureTimeoutId.current;
  React.useEffect(() => {
    return () => id && clearTimeout(id);
  }, [id]);

  React.useEffect(() => {
    console.log('capture = ', capture);
    if (capture) {
      // More API functions here:
      // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

      // the link to your model provided by Teachable Machine export panel

      // Load the image model and setup the webcam
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
          requestAnimationFrame(loop);
          document?.getElementById(WEBCAM_CONTAINER_ID)?.appendChild(webcam?.canvas);
        } catch (e) {
          console.log('error = ', e);
          setResult(['error = ' + e]);
          setCapture(false);
        }

        // append elements to the DOM
        // labelContainer = document.getElementById('label-container');
        // for (let i = 0; i < maxPredictions; i++) {
        //   // and class labels
        //   labelContainer.appendChild(document.createElement('div'));
        // }
      }

      async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        await delay(50);
        if (capture) {
          requestAnimationFrame(loop);
        }
      }

      // run the webcam image through the image model
      async function predict() {
        // predict can take in an image, video or canvas html element
        //@ts-ignore
        const prediction = await model.predict(webcam.canvas);
        console.log('prediction = ', prediction);
        // setResult(prediction);
      }
      init();
      // delay(100).then(() => {
      //   const newResult = [...result, count++];
      //   if (newResult.length > 5) {
      //     newResult.shift();
      //   }
      //   setResult(newResult);
      // });
    } else {
      webcam?.stop?.();
      let element = document.getElementById(WEBCAM_CONTAINER_ID);
      while (element?.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }, [capture, result]);

  // const webcamRef = React.useRef(null);

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
          <div id={WEBCAM_CONTAINER_ID}>webcam-container</div>
          {/* <ReactWebcam
            audio={false}
            mirrored={true}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.92}
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
          /> */}
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
