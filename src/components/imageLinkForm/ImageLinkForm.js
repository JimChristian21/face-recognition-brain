import React from "react";
import './imageLinkForm.css';

const ImageLinkForm = ({ 
    imageUrl, 
    setImageUrl,
    handleDetect
}) => {

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
                        onClick={handleDetect}
                    >
                        Detect
                    </button>
                </div> 
            </div>
        </div>
    );
}

export default ImageLinkForm;