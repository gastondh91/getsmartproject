/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCarrito } from '../redux/action-creators/carrito-actions'
import ModalConfirm from './ModalConfirm'
import StarsRating from '../components/StarsRating'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios'


const SingleProdComp = (props) => {

  useEffect(() => {
    props.fetchCarrito(props.usuario.id)
  }, [])

  var [Modal, setModal] = useState(['Estado', 'Mensaje'])

  const agregarAlCarrito = () => {
      let carrito = props.carrito
      for (let i = 0; i < carrito.length; i += 1) {
        if (carrito[i].id == props.producto.id) {
        setModal(Modal = ['Producto agregado', 'Ya agregaste este producto al carrito'])
        console.log(props.producto.id)
        console.log(carrito[i])
        return;}
      }

      axios.post('/api/carrito/add', {
        idProducto: props.producto.id,
        idUsuario: props.usuario.id
      })
        .then(() => setModal(Modal = ['Producto agregado', 'Producto agregado al carrito']))
  }


const transfArray = () => {
  var arrImagenFinal = props.producto.imagenes

  if (props.producto.imagenes.includes('}')) {
    arrImagenFinal = arrImagenFinal.substring(0, arrImagenFinal.length - 1)
    arrImagenFinal = arrImagenFinal.slice(1)
    arrImagenFinal = arrImagenFinal.split(',')
    return arrImagenFinal
  }
  else return props.producto.imagenes
}

const califExist = (calificacion) => {
  if (calificacion) {
    if (calificacion.toString().length > 3) return calificacion.toString().slice(0, 3)
    else return calificacion.toString()
  }
}


const { borrarProd, onClick } = props;
return (
  <div id="singleProd">
    {console.log('PROPS', props)}
    <div className="row">
      <div style={{ height: 'fit-content' }} className="col-lg-6 col-xs-12">
        <h1 style={{ textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid black', paddingBottom: '7px' }}>{props.producto.marca} {props.producto.modelo}</h1>

        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-lg-6 col-xs-12"><h1 style={{ textAlign: 'center' }}>$ {props.producto.precio} </h1></div>
<div style={{ textAlign: 'center', marginTop: '9px' }} className="col-lg-6 col-xs-12">{props.producto.stock > 5 ? <h5 >{props.producto.stock} Unidades disponibles</h5> : props.producto.stock > 0 ? <h5 style={{fontWeight: (props.producto.stock == 1 || props.producto.stock < 5) ? '600' : '100'  ? '600' : '100' }}>Última{props.producto.stock == 1 ? '' : 's'} {props.producto.stock != 1 && props.producto.stock} {(props.producto.stock == 1 || props.producto.stock < 6) && <br/>}Unidad{props.producto.stock == 1 ? '' : 'es'}</h5> : <h5>Actualmente sin stock</h5>}</div>
        </div>

        <div id="puntuacion" className="row">
          <h3>Puntuación :  </h3>
          <h2 style={{ margin: '0 auto' }}>
            <StarsRating ratings={props.producto.calificacion} userId={props.usuario.id} prodId={props.producto.id} />
            < span style={{ marginLeft: '1rem' }}>
              {califExist(props.producto.calificacion)}
            </span>
          </h2>
        </div>
        <div className="row">
          <div style={{ minWidth: 'fit-content' }} className="col-lg-6 col-xs-12">
            <h3 style={{ marginTop: '2rem' }}><strong>Descripción : </strong></h3>
            <h5 className='collapsible'>{props.producto.descripcion}</h5>
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
            <div style={{ fontSize: '1rem', height: 'fit-content' }} id='pModal' className="modal-body">
              <p style={{ textAlign: 'center', fontWeight: '600' }} className='pMargin'>{Modal[1]}</p>
            </div>
            <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
              <button style={{ fontSize: '1rem', textTransform: 'none' }} className="example_b logBut general" type="button" data-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}

      <div style={{ marginTop: '15px' }} className="col-lg-6 col-xs-12">
        <Carousel >
          {transfArray().map((imagen, index = 0) => (
            <Carousel.Item
              key={index++}
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


        { !props.adminInfo && props.producto.stock > 1 ? <button
          onClick={() => agregarAlCarrito()}
          className="example_c"
          data-toggle='modal'
          data-target='#cartModal'
          rel="nofollow noopener"
          id='cartbutton'
          type="button"
          style={{ marginLeft: '1.9rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
        >Agregar al Carrito
        </button> : null}
        {props.adminInfo ? <button
          onClick={() => props.history.push(`/productos/edit/${props.producto.id}`)}
          className="example_c"
          rel="nofollow noopener"
          id='cartbutton'
          type="button"
          style={{ marginLeft: '4.7rem', width: '7.6rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
        >Editar
        </button> : null}
        {!props.adminInfo && props.producto.stock > 1 ? <button
          className="example_b example_d"
          rel="nofollow noopener"
          id='cartbutton'
          type="button"
          style={{ marginLeft: '1rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
        >Comprar
        </button>: null}
        {props.adminInfo ? <button
          data-toggle='modal'
          data-target='#definiteModal'
          className="example_b example_d"
          rel="nofollow noopener"
          id='cartbutton'
          type="button"
          style={{ marginLeft: '1rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
        >Eliminar
        </button> : null}
      </div>
    </div>


    <hr />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} >
      <div><h4><strong>Categorias :</strong></h4>
        <ul style={{ listStylePosition: 'inside' }}><h6>
          {props.producto.categorias.map((obj) => {
            return <li key={obj.id}>{obj.name}</li>;
          })}
        </h6></ul>
      </div>
      <div>
        <h4 style={{ textAlign: 'center' }}><strong>Reviews :</strong></h4>
        <div className='Stars'>
          {props.puntajes && <Carousel >
            {props.puntajes.map((puntaje) => (
              <Carousel.Item
                key={puntaje.id}
              >
                <Link style={{ color: 'royalblue', fontWeight: '600' }} to={`/usuarios/edit/${puntaje.usuario.id}`}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {puntaje.usuario.Nickname}
                  </div>
                </Link>
                <div ><Rater total={5} interactive={false} rating={puntaje.Puntaje} /></div>
                <div style={{ fontFamily: 'sans-serif' }} >{puntaje.Puntaje} / 5</div>
                <p
                  className="revCarrousel"

                  alt="reviews"
                  id="reviewsId"
                >
                  {puntaje.review && `" ${puntaje.review.Review} "`}
                </p>

              </Carousel.Item>
            ))}
          </Carousel>}
        </div>
      </div>
    </div>
    <ModalConfirm
      funcion={borrarProd}
      parametro={props.producto.id}
      encabezado={'¿Eliminar producto?'}
      encabezadoInfo={'Producto eliminado'}
      confirmacion={'¿Confirma que desea eliminar'}
      history={props.history}
      historypush={'/productos'}
      nombre={'"' + props.producto.marca + ' ' + props.producto.modelo + '"'}
      item={'el producto '}
      accion={'Se eliminó '}
    />
  </div>
);
};

const mapStateToProps = (state) => ({
  usuario: state.usuario,
  carrito: state.carrito
});

const mapDispatchToProps = (dispatch) => ({
  fetchCarrito: (id) => dispatch(fetchCarrito(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProdComp);
