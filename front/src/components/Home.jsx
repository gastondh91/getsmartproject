import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div className="bd-example">
    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" >
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="5"></li>
      </ol>
      <div className="carousel-inner">
      <div className="carousel-item active">
          <img id='carousel' src="/utils/Samsungs10+.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Samsung Galaxy S10+</h5>
            <p>La próxima generación de Galaxy ha llegado.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img id='carousel' src="/utils/iphonefinal.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>iPhone XR</h5>
            <p>Diseño todo pantalla, la mayor duración de batería en un iPhone, el rendimiento más rápido, fotos con calidad de estudio.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img id='carousel' src="/utils/G7.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block" >
            <h5>LG G7 ThinQ</h5>
            <p>El sucesor del LG G6 llega con una pantalla de 6.1 pulgadas a 1440 x 3120 pixels de resolución.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img id='carousel' src="/utils/Huaweip20pro.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Huawei P20 Pro</h5>
            <p>El primer smartphone de Huawei con cámara triple. </p>
          </div>
        </div>
        <div className="carousel-item">
          <img id='carousel' src="/utils/motorola.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Motorola One</h5>
            <p>Con una memoria RAM de 4 GB y un procesador octa-core Qualcomm® Snapdragon™.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img id='carousel' src="/utils/rn7.jpg" className="d-block w-100" alt="..." style={{ height: "77vh" }} />
          <div className="carousel-caption d-none d-md-block">
            <h5>Xiaomi Redmi Note 7</h5>
            <p>El Xiaomi Redmi Note 7 es el nuevo miembro de la serie Redmi Note, esta vez con una impresionante cámara dual de 48 MP + 5 MP.</p>
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