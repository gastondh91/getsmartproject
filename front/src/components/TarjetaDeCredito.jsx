import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCarrito } from '../redux/action-creators/carrito-actions'
import axios from 'axios'

const TarjetaDeCredito = (props) => {

  useEffect(()=>{
    props.fetchCarrito(props.usuario.id)
  },[])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/api/carrito/deletecart/${props.usuario.id}`)
  }

  return (
    <div >
      <form className='tarjeta container-fluid'>
        <h1 id='metodo' >Método de Pago</h1>
        <div>
          <label htmlFor="inputEmail3">Numero de Tarjeta: </label>
          <input maxLength='16' className='numerodetarjeta' type="text" />
        </div>
        <div className='datosTarjeta'>
          <div>
            <label>Fecha de Vencimiento: </label>
            <input className='fecha' min='2019-10' defaultValue='2020-01' type="month" id="vencimiento" />
          </div>
          <div>
            <label htmlFor="inputPassword5">Codigo de Seguridad: </label>
            <input maxLength={3} className='fecha' type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
            <small id="passwordHelpBlock" className="form-text text-muted note">
              Ultimos 3 digitos en el dorso de la tarjeta
            </small>
          </div>
          <img id='dorsoTarjeta' src='/utils/dorsoTarjeta.svg'></img>
        </div>
        <h1 id='datos'>Datos Titular de la Tarjeta</h1>
        <div>
          <label htmlFor="inputEmail3">Nombre Completo:</label>
          <input className='numerodetarjeta' type="text" />
        </div>
        <div>
          <label htmlFor="inputEmail3">DNI Titular:</label>
          <input id='dni' type="text" />
        </div>
        <button onClick={handleSubmit} type="button" className="btn btn-success finCompra">FINALIZAR COMPRA</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  usuario: state.usuario,
  carrito: state.carrito
});

const MapDispatchToProps = (dispatch)=>({
  fetchCarrito: (id) => dispatch(fetchCarrito(id))
})

export default connect(mapStateToProps,MapDispatchToProps)(TarjetaDeCredito)