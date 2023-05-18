import React, { useState, useEffect } from 'react';
import { BlockPicker } from 'react-color';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState([]);
  const [currentFontColor, setCurrentFontColor] = useState('#FFFFFF');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleDownload() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      context.fillStyle = currentFontColor;
      const fontSize = canvas.height * 0.08;
      context.font = `bold ${fontSize}px sans-serif`;
      context.textAlign = 'center';

      const topText = meme.topText.toUpperCase();
      const bottomText = meme.bottomText.toUpperCase();

      const textHeight = canvas.height * 0.12;

      const x = canvas.width / 2;
      const y = textHeight;

      context.fillText(topText, x, y);
      context.fillText(bottomText, x, canvas.height - y);

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'meme.png';

      if ('download' in link) {
        link.click();
      } else {
        window.open(dataURL, '_blank');
      }
    };

    image.src = meme.randomImage;
  }

  function ColorPicker() {
    const [blockPickerColor, setBlockPickerColor] = useState('#37d67a');
    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
      setIsShown(!isShown);
    };

    return (
      <div>
        <button className="colorpickerbutton" onClick={handleClick}>
          Font color
        </button>
        <div className="blockpicker" id="colorblock" style={{ display: isShown ? 'flex' : 'none' }}>
          <BlockPicker
            color={blockPickerColor}
            onChange={(color) => {
              setBlockPickerColor(color.hex);
              setCurrentFontColor(color.hex);
            }}
          />
        </div>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="Meme" />
          <h2 className="meme--text top" style={{ color: currentFontColor }}>
            {meme.topText}
          </h2>
          <h2 className="meme--text bottom" style={{ color: currentFontColor}}>
              {meme.bottomText}
              </h2>
            </div>
          </div>
        );
      }
    
      return (
        <main>
          <div className="form">
            <input
              type="text"
              placeholder="Top text"
              className="form--input"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Bottom text"
              className="form--input"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
           
            <button className="form--button" onClick={getMemeImage}>
              Get a new meme image 🖼
            </button>
            <button className="form--button downloadbtn" onClick={handleDownload}>
              Download Meme
            </button>
          </div>
          <ColorPicker/>
        </main>
      );
    }

