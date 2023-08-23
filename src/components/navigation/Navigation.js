import React from "react";

const Navigation = ({ route, handleSignOut }) => {

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            { route !== 'sign' && route !== 'register' &&
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick={handleSignOut}
                >Sign Out</p>
            }
        </nav>
    );
}

export default Navigation;