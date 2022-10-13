import React from "react";

import img1 from "../../assets/pintoreditada.jpg";
import img2 from "../../assets/costuraEditada.jpg";
import img3 from "../../assets/soldadura.jpg";

import style from "./LandingSlider.module.css";

const DemoCarousel = () => {
  return (
    <div className={style.container}>
      <div
        id="carouselB5"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselB5"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselB5"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselB5"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={img1} alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img2} alt="..." />
          </div>
          <div class="carousel-item">
            <img src={img3} alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DemoCarousel;
