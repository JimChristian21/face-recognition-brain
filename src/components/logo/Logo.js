import React from "react";
import Tilt from "react-parallax-tilt";
import './logo.css';
import brain from './brain.png';

const Logo = () => {

    return (
        <div className="ma4 mt0 ">
            <Tilt className="Tilt logo br2 shadow-2">
                <div>
                    <img id="logo" src={brain} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;