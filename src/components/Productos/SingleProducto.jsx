import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Rater from 'react-rater'
import axios from 'axios'
import ReadMoreAndLess from 'react-read-more-less'
import { fetchCarrito } from '../../redux/action-creators/carrito-actions'
import ModalConfirm from '../ModalConfirm'
import StarsRating from '../StarsRating'
import 'react-rater/lib/react-rater.css'
// eslint-disable-next-line no-unused-vars
import style from './SingleProducto.css'


const SingleProducto = ({
  producto, history, puntajes, adminInfo, borrarProd,
}) => {

  const showMoreRef = React.createRef()

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

  return (
    <div id="singleProd">
      { console.log(showMoreRef)}
      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <div className="display-4 text-center no-margin">
            {`${producto.marca} ${producto.modelo}`}
          </div>
          <div className="stars text-center">
            { producto.calificacion && (
            <span className="calif mr-2">
              {producto.calificacion.toFixed(2)}
            </span>
            )}
            <StarsRating ratings={producto.calificacion} userId={usuario.id} prodId={producto.id} />
          </div>
          <hr />

          <div className="row precio-unidades">
            <div className="col-md-6 xxl-text text-center">
              $
              {producto.precio}
            </div>
            {producto.stock < 10 && (
            <div className="col-md-6 ult-unid">
              {defUltimasUnidades(producto.stock)}
            </div>
            )}
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h3><strong>Descripción : </strong></h3>

              <ReadMoreAndLess
                ref={showMoreRef}
                charLimit={500}
                readMoreText="Leer más"
                readLessText="Leer menos"
              >
                {producto.descripcion}
              </ReadMoreAndLess>
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
              className="btn-agr-carr"
              data-toggle="modal"
              data-target="#cartModal"
              rel="nofollow noopener"
              id="cartbutton"
              type="button"
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
