import React, { useState } from "react";

const Register = ({onRouteChange, setUser}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {

        e.preventDefault();

        fetch('https://face-recognition-app-api-6kwt.onrender.com/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {

            if (user.id) {

                onRouteChange('home');
                setUser(user);
            }
        });
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  id="name" 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </fieldset>
                    <div className="lh-copy mt3 pointer">
                        <p
                            className="f6 link dim black db"
                            onClick={handleRegister}
                        >
                            Register
                        </p>
                    </div>
                </form>
            </main>
        </article>
    );
}

export default Register;