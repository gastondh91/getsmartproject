/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscarProducto } from '../redux/action-creators/products-actions';
import { addToCart } from '../redux/action-creators/carrito-actions'
import ModalConfirm from './ModalConfirm'
import StarsRating from '../components/StarsRating'


const SingleProdComp = (props) => {
  
  useEffect (()=>{
    buscarProducto(props.productoId)
  })
  
  
  const transfArray = ()=>{
    var arrImagenFinal = props.producto.imagenes

    if(props.producto.imagenes.includes('}')){
    arrImagenFinal = arrImagenFinal.substring(0,arrImagenFinal.length-1)
    arrImagenFinal = arrImagenFinal.slice(1)
    arrImagenFinal = arrImagenFinal.split(',')
    return arrImagenFinal
    }
    else return props.producto.imagenes
  }
  // useEffect(()=>{
  //   var coll = document.getElementsByClassName("collapsible");
  //   var i;

  //   for (i = 0; i < coll.length; i++) {
  //     coll[i].addEventListener("click", function() {
  //       this.classList.toggle("active");
  //       var content = this.nextElementSibling;
  //       if (content.style.display === "block") {
  //         content.style.display = "none";
  //       } else {
  //         content.style.display = "block";
  //       }
  //     });
  //   }
  // },[])


  const { borrarProd, categorias, onClick } = props;
  return (
    <div id="singleProd">
      {console.log(props.producto)}
      <div className="row">
        <div style={{height: 'fit-content'}}className="col-lg-6 col-xs-12">

          <h1 style={{ textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid black', paddingBottom: '7px' }}>{props.producto.marca} {props.producto.modelo}</h1>

          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-lg-6 col-xs-12"><h1 style={{ textAlign: 'center' }}>$ {props.producto.precio} </h1></div>
            <div style={{ textAlign: 'center', marginTop: '9px' }} className="col-lg-6 col-xs-12">{props.producto.stock > 5 ? <h4>Disponible</h4> : <h4>Últimas {props.producto.stock} unidades</h4>}</div>
          </div>

          <div id="puntuacion" className="row">
            <h3>Puntuación :  </h3>
            <h2 style={{ margin: '0 auto' }}> 
             <StarsRating ratings={props.producto.calificacion} userId={props.usuario.id} prodId={props.productoId} />
             </h2>
          </div>
          <div className="row">
        <div style={{minWidth: 'fit-content'}} className="col-lg-6 col-xs-12">
          <h3 style={{marginTop: '2rem'}}><strong>Descripción : </strong></h3>
          <h5 className='collapsible'>{props.producto.descripcion}</h5>
        </div>
      </div>
        </div>

        <div style={{marginTop: '15px'}} className="col-lg-6 col-xs-12">
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


          <button
            onClick={() => props.adminInfo ? props.history.push(`/productos/edit/${props.producto.id}`) : props.addToCart(props.props.producto.id, props.usuario.id)}
            className="example_c"
            rel="nofollow noopener"
            id='cartbutton'
            type="button"
            style={{ marginLeft: props.adminInfo ? '4.7rem' : '1.9rem', width: props.adminInfo &&'7.6rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
          >{!props.adminInfo ? 'Agregar al Carrito' : 'Editar' }
          </button>
          <button
            data-toggle={props.adminInfo && "modal"} 
            data-target={props.adminInfo && "#definiteModal"}
            className="example_b example_d"
            rel="nofollow noopener"
            id='cartbutton'
            type="button"
            style={{ marginLeft: '1rem', marginRight: 'auto', display: 'inline', color: 'black', borderColor: '#2B4F81', padding: '20px' }}
          >{!props.adminInfo ? 'Comprar' : 'Eliminar'}
            </button>
        </div>
      </div>


      <hr />
      <div className="row" >
        <div className="col-lg-6 col-xs-12">
          <h4><strong>Categorias :</strong></h4>
          <ul><h6>
            {categorias && categorias.map((obj) => {
              return <li key={obj.id}>{obj.name}</li>;
            })}
          </h6></ul>

        </div>
        <div className="col-lg-6 col-xs-12">
          <h4><strong>Reviews :</strong></h4>
          {(!!props.producto.puntajes.length && props.producto.puntajes[0].review) && <Carousel >
            {props.producto.puntajes.map((puntaje) => (
              <Carousel.Item 
                key={puntaje.review.id}
                >
                <p
                  className="d-block w-100"
                  
                  alt="reviews"
                  id="reviewsId"
                >
                {puntaje.review.Review}
                </p>

              </Carousel.Item>
             ))} 
          </Carousel>}
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
        item={'el producto'}
        accion={'Se eliminó'}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  categorias: state.categorias,
  usuario: state.usuario

});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (idProducto, idUsuario) => dispatch(addToCart(idProducto, idUsuario)),
  buscarProducto: (prodID) => dispatch(buscarProducto(prodID))
});


export default connect(mapStateToProps, mapDispatchToProps)(SingleProdComp);
