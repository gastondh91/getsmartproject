import React,{ useEffect } from 'react';
import DatosDelCliente from './DatosDelCliente';
import DetalleDeCompra from './DetalleDeCompra';
import { connect } from 'react-redux'
import { fetchCarrito } from '../redux/action-creators/carrito-actions'


const Checkout = (props) => {
  
  useEffect(()=>{
    props.fetchCarrito(props.usuario.id)
  },[])

  return (<div className='checkoutview datosgrid'>
    <div><DatosDelCliente usuario={props.usuario} /></div>
    <div><DetalleDeCompra history={props.history} carrito={props.carrito}/></div>
  </div>);
};


const mapStateToProps = (state) => ({
  usuario: state.usuario,
  carrito: state.carrito
});

const mapDispatchToProps = (dispatch) => ({
  fetchCarrito: (id) => dispatch(fetchCarrito(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);