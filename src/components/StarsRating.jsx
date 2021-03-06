import React, { useState, useEffect } from 'react';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import axios from 'axios';
import './AnimatedRater.scss'
import { connect } from 'react-redux'
import { buscarProducto, buscarPuntajes } from '../redux/action-creators/products-actions';
import ModalTextarea from './ModalTextarea'

const StarsRating = (props) => {

  var [ModalState, setModalState] = useState([])

  const checkUserCalification = (puntajes) => {
    if (puntajes.length) {
      for (let i = 0; i < puntajes.length; i += 1) {
        if (puntajes[i].usuarioId == props.userId) {
          setModalState(ModalState = 'Ya calificaste este producto. ¿Te gustaria borrar tu calificación?')
          return true
        }
      }
      return false
    }
  }


  useEffect(() => {
  }, [props.producto])

  const postPuntaje = (puntaje) => {
    axios.post(`/api/puntajes/setPuntaje/${props.prodId}`, {
      puntaje,
      userId: props.userId
    })
      .then(() => {
        props.buscarPuntajes(props.prodId)
        setModalState(ModalState = '¿Deseas agregar una reseña?')
      })
  }

  return (
    <span> 
      <ModalTextarea  
      estado={ModalState}
      textBody={ModalState}
      userId={props.userId}
      prodId={props.prodId}
      />
      <Rater
        interactive={props.userId ? true : false }
        data-toggle={props.userId ? 'modal' : null}
        data-target={props.userId ? '#modalTextarea' : null}
        total={5}
        rating={props.ratings}
        onRate={({ rating }) => !checkUserCalification(props.puntajes) && postPuntaje(rating)} 
        />
    </span>)
}


const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  puntajes: state.puntajes
});

const mapDispatchToProps = (dispatch) => ({
  buscarProducto: (prodId) => dispatch(buscarProducto(prodId)),
  buscarPuntajes: (prodId) => dispatch(buscarPuntajes(prodId))
});


export default connect(mapStateToProps, mapDispatchToProps)(StarsRating);