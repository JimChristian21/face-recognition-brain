import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import './App.css';
import { useState } from "react";

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [box, setBox] = useState([]);

  const calculateFaceLocation = (data) => {

    console.log(data);
  }

  const handleDetect = () => {
    const PAT = 'ea86c3ad3aaf469eae8ee0ba8f74c9cf';
    const USER_ID = 'jim_christian';       
    const APP_ID = 'Teset';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => calculateFaceLocation(result))
        .catch(error => console.log('error', error));

    setShowFaceRecognition(true);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        handleDetect={handleDetect}
      />
      { showFaceRecognition
          && <FaceRecognition imageUrl={imageUrl}/>
      }
    </div>
  ); 
}

export default App;
