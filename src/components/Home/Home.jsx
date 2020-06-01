import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import { telefonosCarrusel } from '../../assets/constants/telefonosCarrusel'
import style from './HomeStyles.css'

export default (props) => {
  const [Telefonos, setTelefonos] = useState(telefonosCarrusel)

  return (

    <div>
      <Carousel fade={true} interval={3500}>
        {Telefonos.map((tel, index) => {
          return (
            <Carousel.Item key={`Telefono ${index}`}>
              <img
                onClick={() => props.history.push(tel.ubicacion)}
                className="carousel-img d-block"
                src={tel.imagen}
                alt={`Slide ${index}`}
              />
              <Carousel.Caption>
                <h3>{tel.modelo}</h3>
                <p>{tel.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>

          )
        })}
      </Carousel>
    </div>
  )
}