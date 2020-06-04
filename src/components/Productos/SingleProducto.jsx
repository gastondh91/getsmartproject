import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Rater from 'react-rater'
import axios from 'axios'
import { fetchCarrito } from '../../redux/action-creators/carrito-actions'
import ModalConfirm from '../ModalConfirm'
import StarsRating from '../StarsRating'
import 'react-rater/lib/react-rater.css'
// eslint-disable-next-line no-unused-vars
import style from './SingleProducto.css'


const SingleProducto = ({
  producto, history, puntajes, adminInfo, borrarProd,
}) => {

  useEffect(() => {
    if (usuario.id) dispatch(fetchCarrito)
  }, [])

  const dispatch = useDispatch()
  const usuario = useSelector((store) => store.usuario, shallowEqual)
  const carrito = useSelector((store) => store.carrito, shallowEqual)

  const [Modal, setModal] = useState(['Estado', 'Mensaje'])
  const agregarAlCarrito = () => {
    for (let i = 0; i < carrito.length; i += 1) {
      if (carrito[i].id === producto.id) {
        setModal(Modal = ['Producto agregado', 'Ya agregaste este producto al carrito'])
        return
      }
    }

    axios.post('/api/carrito/add', {
      idProducto: producto.id,
      idUsuario: usuario.id,
    })
      .then(() => {
        setModal(Modal = ['Producto agregado', 'Producto agregado al carrito'])
      })
  }

  const defUltimasUnidades = (stock) => {
    let ultimas = 'Últimas'; let numero = ''; let
      unidades = 'unidades'

    if (stock === 1) {
      ultimas = 'Última'
      unidades = 'unidad'
    }
    if (stock > 1) numero = stock

    return `${ultimas} ${numero} ${unidades}`
  }


  const transfArray = () => {
    let arrImagenFinal = producto.imagenes

    if (producto.imagenes.includes('}')) {
      arrImagenFinal = arrImagenFinal.substring(0, arrImagenFinal.length - 1)
      arrImagenFinal = arrImagenFinal.slice(1)
      arrImagenFinal = arrImagenFinal.split(',')
      return arrImagenFinal
    }
    return producto.imagenes
  }

  const califExist = (calificacion) => {
    if (calificacion.toString().length > 3) return calificacion.toString().slice(0, 3)
    return calificacion.toString()
  }


  return (
    <div id="singleProd">
      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <h1 className="display-4 text-center">
            {`${producto.marca} ${producto.modelo}`}
          </h1>
          <hr />

          <div>
            { producto.stock > 10
              ? (
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1>
                      $
                      {producto.precio}
                    </h1>
                  </div>
                </div>
              )

              : (
                <div className="row precio-unidades">
                  <div className="col-md-5">
                    <h1>
                      $
                      {producto.precio}
                    </h1>
                  </div>
                  <div className="col-md-7 ult-unid">
                    {defUltimasUnidades(producto.stock)}
                  </div>
                </div>
              )}
          </div>
          <div id="puntuacion" className="row">
            <h3>Puntuación :  </h3>
            <h2 style={{ margin: '0 auto' }}>
              <StarsRating ratings={producto.calificacion} userId={usuario.id} prodId={producto.id} />
              { producto.calificacion && (
              <span style={{ marginLeft: '1rem' }}>
                {califExist(producto.calificacion)}
              </span>
              )}
            </h2>
          </div>
          <div className="row">
            <div style={{ minWidth: 'fit-content' }} className="col-lg-6 col-xs-12">
              <h3 style={{ marginTop: '2rem' }}><strong>Descripción : </strong></h3>
              <h5 className="collapsible">{producto.descripcion}</h5>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div style={{ width: '21rem' }} className="modal-content modalBord2">
              <div className="modal-header borderModal">
                <h5 className="modal-title" id="exampleModalLabel">{Modal[0]}</h5>
              </div>
              <div style={{ fontSize: '1rem', height: 'fit-content' }} id="pModal" className="modal-body">
                <p style={{ textAlign: 'center', fontWeight: '600' }} className="pMargin">{Modal[1]}</p>
              </div>
              <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
                <button style={{ fontSize: '1rem', textTransform: 'none' }} className="example_b logBut general" type="button" data-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL */}

        <div style={{ marginTop: '15px' }} className="col-lg-6 col-xs-12">
          <Carousel>
            {transfArray().map((imagen, index) => (
              <Carousel.Item
                key={index}
              >
                <img
                  className="d-block w-100"
                  src={imagen}
                  alt="photos"
                  id="imgProdCarr"
                />

              </Carousel.Item>
            ))}
          </Carousel>


          {!adminInfo && producto.stock > 1 ? (
            <button
              onClick={() => agregarAlCarrito()}
              className="example_c"
              data-toggle="modal"
              data-target="#cartModal"
              rel="nofollow noopener"
              id="cartbutton"
              type="button"
              style={{
                marginLeft: 'auto', marginRight: 'auto', display: 'block', color: 'black', borderColor: '#2B4F81', padding: '20px',
              }}
            >
              Agregar al Carrito
            </button>
          ) : null}
          {adminInfo ? (
            <button
              onClick={() => history.push(`/productos/edit/${producto.id}`)}
              className="example_c"
              rel="nofollow noopener"
              id="cartbutton"
              type="button"
              style={{
                marginLeft: '4.7rem', width: '7.6rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px',
              }}
            >
              Editar
            </button>
          ) : null}
          {/* {!adminInfo && producto.stock > 1 ? <button
          className="example_b example_d"
          rel="nofollow noopener"
          id='cartbutton'
          type="button"
          style={{ marginLeft: '1rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
        >Comprar
        </button>: null} */}
          {adminInfo ? (
            <button
              data-toggle="modal"
              data-target="#definiteModal"
              className="example_b example_d"
              rel="nofollow noopener"
              id="cartbutton"
              type="button"
              style={{
                marginLeft: '1rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px',
              }}
            >
              Eliminar
            </button>
          ) : null}
        </div>
      </div>


      <hr />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <h4><strong>Categorias :</strong></h4>
          <ul style={{ listStylePosition: 'inside' }}>
            <h6>
              {producto.categorias.map((obj) => <li key={obj.id}>{obj.name}</li>)}
            </h6>
          </ul>
        </div>
        <div>
          <h4 style={{ textAlign: 'center' }}><strong>Reviews :</strong></h4>
          <div className="Stars">
            {puntajes && (
            <Carousel>
              {puntajes.map((puntaje) => (
                <Carousel.Item
                  key={puntaje.id}
                >
                  <Link style={{ color: 'royalblue', fontWeight: '600' }} to={`/usuarios/edit/${puntaje.usuario.id}`}>
                    <div style={{ fontSize: '1.5rem' }}>
                      {puntaje.usuario.Nickname}
                    </div>
                  </Link>
                  <div><Rater total={5} interactive={false} rating={puntaje.Puntaje} /></div>
                  <div style={{ fontFamily: 'sans-serif' }}>
                    {puntaje.Puntaje}
                    {' '}
                    / 5
                  </div>
                  <p
                    className="revCarrousel"

                    alt="reviews"
                    id="reviewsId"
                  >
                    {puntaje.review && `" ${puntaje.review.Review} "`}
                  </p>

                </Carousel.Item>
              ))}
            </Carousel>
            )}
          </div>
        </div>
      </div>
      <ModalConfirm
        funcion={borrarProd}
        parametro={producto.id}
        encabezado="¿Eliminar producto?"
        encabezadoInfo="Producto eliminado"
        confirmacion="¿Confirma que desea eliminar"
        history={history}
        historypush="/productos"
        nombre={`"${producto.marca} ${producto.modelo}"`}
        item="el producto "
        accion="Se eliminó "
      />
    </div>
  )
}

export default SingleProducto
