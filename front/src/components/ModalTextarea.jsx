import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { buscarProducto, buscarPuntajes } from '../redux/action-creators/products-actions';
import ModalAccept from './ModalAccept'

const ModalTextarea = (props) => {

  var [Comentarios, setComentarios] = useState()

  const handleText = (e) => {
    setComentarios(Comentarios = e.target.value)
  }


  const borrarPuntaje = (puntajes) => {
    var miPuntaje
    puntajes.forEach((puntaje) => {
      if (puntaje.usuarioId == props.userId) miPuntaje = puntaje
    });
    axios.get(`/api/puntajes/borrarPuntaje/${miPuntaje.id}/${miPuntaje.review ? miPuntaje.review.id : 'null'}`)
      .then(() => {
        props.buscarPuntajes(props.prodId)
      })
      .then(() => {
        axios.get(`/api/puntajes/updateCalification/${props.prodId}`)
        .then(() => {
          props.buscarProducto(props.prodId)
        })
      })
  }

  const showButtons = (estado) => {
    if (estado == 'Ya calificaste este producto. ¿Te gustaria borrar tu calificación?') {
      return (
        <span>
          <button
            type="button"
            data-toggle="modal"
            data-target="#acceptModal"
            className="example_b general yesnobutton"
            // data-dismiss="modal"
            onClick={() => borrarPuntaje(props.puntajes)}
          >
            Si
          </button>
          <button
            style={{ marginLeft: '5px' }}
            type="button"
            className="example_b greyButton general yesnobutton"
            data-dismiss="modal"
          >No
          </button>
        </span>
      )
    }

    return (
      <button
        style={{ fontSize: '1.15rem', textTransform: 'none' }}
        className="example_b logBut general"
        onClick={handleSubmitText}
        type="button"
        data-dismiss="modal">{props.estado == 'Ya calificaste este producto.' ? 'Aceptar' : Comentarios ? 'Guardar' : 'Omitir'}
      </button>
    )

  }

  const handleSubmitText = () => {
    if (Comentarios) {
      axios.get(`/api/puntajes/getPuntaje/${props.prodId}/${props.userId}`, {
      })
        .then(puntaje => {
          axios.post(`/api/puntajes/reviews`, {
            Comentarios,
            PuntajeId: puntaje.data.id
          })
            .then(() => {
              props.buscarProducto(props.prodId)
              props.buscarPuntajes(props.prodId)
            })
        })
    }
  }

  return (
    <div style={{ all: 'revert' }} className="modal fade" id="modalTextarea" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div style={{ width: '21rem' }} className="modal-content modalBord2">
          <div className="modal-header borderModal">
            <h5 className="modal-title" id="exampleModalLabel">{'Comentrios'}</h5>
          </div>
          <div style={{ all: 'revert', fontSize: '1rem', height: 'fit-content' }} id='pModal' className="modal-body">
            <p style={{ textAlign: 'center', fontWeight: '600' }} className='pMargin'>{`${props.textBody}`} {props.textBody == '¿Deseas agregar una reseña?' && <textarea onChange={handleText} className='modalTextarea' name="Review" id="" cols="28" rows="5"></textarea>}</p>
          </div>
          <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
            {showButtons(props.estado)}
          </div>
        </div>
      </div>
      <ModalAccept
      />
    </div>)

}

const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  puntajes: state.puntajes
});

const mapDispatchToProps = (dispatch) => ({
  buscarProducto: (prodId) => dispatch(buscarProducto(prodId)),
  buscarPuntajes: (prodId) => dispatch(buscarPuntajes(prodId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ModalTextarea);