import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { buscarProducto } from '../redux/action-creators/products-actions';


const ModalTextarea = (props) => {
  
  var [Comentarios, setComentarios] = useState()


  const handleText = (e) => {
    setComentarios(Comentarios = e.target.value)
  }

  const handleSubmitText = () => {
    axios.post(`/api/puntajes/getPuntaje/${props.prodId}`,{
      userId: props.userId
    })
    .then(puntaje =>{
      axios.post(`/api/puntajes/reviews`, {
        Comentarios,
        PuntajeId: puntaje.data.id
      })
      .then(()=> props.buscarProducto(props.prodId))
    })
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
            <button style={{ fontSize: '1.15rem', textTransform: 'none' }} className="example_b logBut general" onClick={handleSubmitText} type="button" data-dismiss="modal">Guardar</button>
          </div>
        </div>
      </div>
    </div>)

}

const mapStateToProps = (state) => ({
  producto: state.selectedProd
});

const mapDispatchToProps = (dispatch) => ({
  buscarProducto: (prodId) => dispatch(buscarProducto(prodId))
});


export default connect(mapStateToProps, mapDispatchToProps)(ModalTextarea);