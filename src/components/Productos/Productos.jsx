import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Carousel from 'react-bootstrap/Carousel'
// eslint-disable-next-line no-unused-vars
import style from './Productos.css'
import { getProductos } from '../../redux/action-creators/products-actions'

const Productos = (props) => {
  useEffect(() => {
    props.getProductos(props.search)
  }, [])

  const filtered = props.productos.filter((value) => {
    const concat = `${value.marca} ${value.modelo}`

    return ((concat.toLowerCase().includes(props.savedBusqueda)
      || concat.toUpperCase().includes(props.savedBusqueda)
      || concat.includes(props.savedBusqueda)))
  })


  return (
    <div className="container">
      <h1 className="text-center">PRODUCTOS</h1>
      <hr />
      <Row>
        <CardGroup>
          {(props.savedBusqueda ? filtered : props.productos).sort((a, b) => a.marca.localeCompare(b.marca)).map((producto, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <Link className="link" to={`/productos/${producto.id}`} key={producto.id}>
                <Card className="my-4 pt-4 px-4">
                  <Carousel
                    controls={false}
                    interval={2000}
                    keyboard={false}
                    indicators={false}
                    pause={false}
                    touch={false}
                  >
                    {producto.imagenes.map((tel, indice) => (
                      <Carousel.Item key={`Telefono ${indice}`}>
                        <img
                          className="carousel-productos-img d-block"
                          src={tel}
                          alt={`Slide ${indice}`}
                        />
                      </Carousel.Item>

                    ))}
                  </Carousel>
                  <Card.Body className="py-3">
                    <Card.Title className="modelo mb-0">
                      <h5 className="h5-transp">{`${producto.marca} ${producto.modelo}`}</h5>
                    </Card.Title>
                    <Card.Title className="my-2">
                      $
                      {producto.precio}
                    </Card.Title>
                    <Card.Text>
                      {producto.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </CardGroup>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  productos: state.productos,
  savedBusqueda: state.savedBusqueda,
})

const mapDispatchToProps = (dispatch) => ({
  getProductos: (searchProduct) => dispatch(getProductos(searchProduct)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Productos)
