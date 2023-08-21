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

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm imageUrl={imageUrl} setImageUrl={setImageUrl} setShowFaceRecognition={setShowFaceRecognition}/>
      { showFaceRecognition 
          && <FaceRecognition imageUrl={imageUrl}/>
      }
    </div>
  ); 
}

export default App;
