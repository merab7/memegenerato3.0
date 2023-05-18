import React, {useState, useEffect} from 'react';
import logo from './images/troll-face.png'
export default function Header() {
    return (

        <header className="header">
            <div>
            <img 
                src={logo} 
                className="header--image"
            />
            </div>
           <div>
            <h2 className="header--title">Meme Generator</h2>
           </div>
        </header>
    )
}