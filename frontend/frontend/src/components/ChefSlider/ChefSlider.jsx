import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ChefSlider.css';
import { slider } from '../../assets/assets';
import { errand } from '../../assets/assets';
import { doctor } from '../../assets/assets';

const ChefSlider = () => {
  const [flipped, setFlipped] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="Slider">
    <div className={`iphone-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="iphone">
        <div className="front">
          <div className="speaker"></div>
          <div className="slider-container">
            <Slider {...settings}>
              {slider.map((slide, index) => (
                <div key={index} className="slide">
                  <img src={slide.menu_image} alt={slide.chef} className="slider-image" />
                  
                  <div className="text-overlay">{slide.text}</div>
                     
                </div>
              ))}
            </Slider>
          </div>
            <div className="home-indicator"> <br /> <a href="">Contact Chef</a> </div>
        </div>
        <div className="back">
          <div className="camera"></div>
          <div className="camera second"></div>
          <div className="camera third"></div>
          <div className="back-text">iPhone 15 Pro Features and Specifications</div>
        </div>
      </div>
    </div>
    <div className={`iphone-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="iphone">
        <div className="front">
          <div className="speaker"></div>
          <div className="slider-container">
            <Slider {...settings}>
              {errand.map((slide, index) => (
                <div key={index} className="slide">
                  <img src={slide.image} alt={slide.chef} className="slider-image" />
                  <div className="text-overlay">{slide.text}</div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="home-indicator">  <br /> <a href="">Contact Now</a> </div>
        </div>
        <div className="back">
          <div className="camera"></div>
          <div className="camera second"></div>
          <div className="camera third"></div>
          <div className="back-text">iPhone 15 Pro Features and Specifications</div>
        </div>
      </div>
    </div>

    <div className={`iphone-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="iphone">
        <div className="front">
          <div className="speaker"></div>
          <div className="slider-container">
            <Slider {...settings}>
              {doctor.map((slide, index) => (
                <div key={index} className="slide">
                  <img src={slide.image_doc} alt={slide.chef} className="slider-image" />
                  <div className="text-overlay">{slide.text} </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="home-indicator"> <br /> <a href="">Contact Now</a></div>
        </div>
        <div className="back">
          <div className="camera"></div>
          <div className="camera second"></div>
          <div className="camera third"></div>
          <div className="back-text">iPhone 15 Pro Features and Specifications</div>
        </div>
      </div>
    </div>
    </div>
  );
};
  

export default ChefSlider;
