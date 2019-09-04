import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div className="bd-example">
    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" >
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/utils/iphone.jpg" className="d-block w-100" alt="..." style={{ height: "90vh" }} />
          <div className="carousel-caption d-none d-md-block" >
            <h5>iPhone X</h5>
            <p>Diseño todo pantalla, la mayor duración de batería en un iPhone, el rendimiento más rápido, fotos con calidad de estudio.</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/utils/motorola.jpg" className="d-block w-100" alt="..." style={{ height: "90vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Motorola One</h5>
            <p>Con una memoria RAM de 4 GB y un procesador octa-core Qualcomm® Snapdragon™.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/utils/samsung.jpg" className="d-block w-100 carrousel" alt="..." style={{ height: "90vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Samsung Galaxy Note 9</h5>
            <p>Haz posible lo imposible</p>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
)