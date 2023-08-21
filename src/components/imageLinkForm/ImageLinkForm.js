import React from "react";
import './imageLinkForm.css';

const ImageLinkForm = ({ imageUrl, setImageUrl, setShowFaceRecognition}) => {
 
    const handleSubmit = () => {

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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setShowFaceRecognition(true);
    }

    return (
        <div>
            <p className='f3'>
                This Magic Brain will detect faces in your pictures. Git it a try
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        className="f4 pa2 w-70" 
                        type="text" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button 
                        className="w-30 grow f4 link ph3 pv2 div white bg-light-purple"
                        onClick={handleSubmit}
                    >
                        Detect
                    </button>
                </div> 
            </div>
        </div>
    );
}

export default ImageLinkForm;