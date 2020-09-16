import React from 'react';
import './Login.css';
import { loginUrl } from './spotify.js';

function Login(){
    return (
        <div className="login">
            <h4 className="signature">Mi Spotify</h4>
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""/>

            {/* Login with spotify button */}
            <a href={loginUrl}>Login via Spotify</a>
            
        </div>
    )
}

export default Login;