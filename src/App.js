import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import SignIn from "./components/Signin/SignIn";
import Register from "./components/register/Register";
import './App.css';
import { useState } from "react";

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const loadUser = (user) => {

    setUser(user);
  }

  const calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * 500,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  const displayFaceBox = (box) => {
    setBox(box);
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
      .then(response => response.json())
      .then(result => {
        displayFaceBox(calculateFaceLocation(result))
          
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(res => res.json())
        .then(count => setUser({
          ...user,
          entries: ++user.entries
        }))
        .catch(err => err);
      })
      .catch(error => error);
      console.log(user);
    setShowFaceRecognition(true);
  }

  const onRouteChange = (name) => {

    if (name !== 'signin' 
      && name !== 'register') {

      !isSignedIn && setIsSignedIn(!isSignedIn);
    } else {

      isSignedIn && setIsSignedIn(!isSignedIn);
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      });
    }
    setRoute(name);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      { route === 'home'
          ? <>
          <Logo />
          <Rank user={user}/>
          <ImageLinkForm 
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleDetect={handleDetect}
            showFaceRecognition={showFaceRecognition}
            setShowFaceRecognition={setShowFaceRecognition}
          />
          { showFaceRecognition
              && <FaceRecognition imageUrl={imageUrl} box={box}/>
          }
        </>
          : 
            route === 'signin' 
              ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
              : <Register onRouteChange={onRouteChange} setUser={loadUser} />
      }
    </div>
  ); 
}

export default App;
