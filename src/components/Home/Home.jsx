import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { telefonosCarrusel } from '../../assets/constants/telefonosCarrusel'
// eslint-disable-next-line no-unused-vars
import style from './HomeStyles.css'

export default ({ history }) => {
  const [Telefonos] = useState(telefonosCarrusel)

  return (

    <div>
      <Carousel fade interval={3500}>
        {Telefonos.map((tel, index) => (
          <Carousel.Item key={`Telefono ${index}`}>
            <img
              role="presentation"
              onClick={() => history.push(tel.ubicacion)}
              className="carousel-img d-block"
              src={tel.imagen}
              alt={`Slide ${index}`}
            />
            <Carousel.Caption>
              <h3>{tel.modelo}</h3>
              <p>{tel.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>

        ))}
      </Carousel>
    </div>
  )
}
