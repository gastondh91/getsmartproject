import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getOrdenes } from '../redux/action-creators/action-creator'
import { fetchCarrito } from '../redux/action-creators/carrito-actions'
import axios from 'axios'
import ModalInfo from './ModalInfo'
import { Link } from 'react-router-dom'

const Checkout = (props) => {

  var [inputs, setInputs] = useState({})
  var [cantidades, setCantidades] = useState({})
  var [modal, setModal] = useState(false)

  const numberToString = (numero)=>{
    let string = numero.toString()
    if(string.length == 4) return string[0] + '.' + string.slice(1)
    if(string.length == 5) return string.slice(0,2) + '.' + string.slice(2)
    if(string.length == 6) return string.slice(0,3) + '.' + string.slice(3)
    if(string.length == 7) return string.slice(0,4) + '.' + string.slice(4)
  }

  const priceToNumber = (numero) => {
    var splited = numero.split('.')
    var number = Number(splited.join(''))
    return number
  }

  var total = 0
  var cantidadTotal = 0
  var SumaTotal = 0

  const cantidades = (cantidad)=>{
    cantidadTotal+= cantidad
    return cantidad
  } 

  const subtotal = (precio, cantidad) => {
    var sumatoria = priceToNumber(precio) * cantidad
    total += sumatoria
    return sumatoria
  }

  const Totales= (precio, cantidad)=> {
    let subTotal = priceToNumber(precio) * cantidad
    SumaTotal += subtotal(precio, cantidad)
    return numberToString(subTotal)
  }

  const separarCantidades = (productos) => {
    let cantidad = {}
    for (let i = 0; i < productos.length; i += 1) {
      cantidad[productos[i].id] = productos[i].carrito.cantidad
    }
    setCantidades(cantidades = cantidad)
  }


  useEffect(() => {

    props.getOrdenes(props.usuario.id)

    props.fetchCarrito(props.usuario.id)

    setInputs({ nombreyapellido: props.usuario.nombre + ' ' + props.usuario.apellido, email: props.usuario.email, direccion: props.usuario.domicilio })
  }, [])

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  const handleSubmit = () => {

    console.log(SumaTotal)

    if (!inputs.nombreyapellido || !inputs.email || !inputs.direccion || !inputs.cp || !inputs.localidad) {
      setModal(modal = ['Error', 'Debes completar todos los campos'])
      return
    }
    else {
      let ordenes = props.ordComp
      let repetido
      for (let i = 0; i < ordenes.length; i += 1) {
        if ((ordenes[i].usuarioId == props.usuario.id) && ordenes[i].status == 'CREADO') {
          repetido = true
        }
      }
      if (repetido) {
        setModal(modal = ['Datos cargados', 'Se cargaron los datos'])
      }
      else {
        separarCantidades(props.carrito);

        axios.post(`/api/ordencompra/crear`, {
          datos: inputs,
          usuario: props.usuario.id,
          productos: props.carrito.map(producto => producto.id),
          total: numberToString(SumaTotal),
          cantidades
        })
          .then(() => setModal(modal = ['Datos cargados', 'Se cargaron los datos']))
      }
    }
  }

  return (
    <div>
      {console.log(SumaTotal)}
      <div className='checkoutview datosgrid'>
        <div>
          <div style={{textAlign: 'center'}} className="cardcheck cardCheckout">
            <div style={{fontWeight: '600', fontSize: '1.2rem'}} className="card-header">
              Datos del Cliente
        </div>
            <ul style={{ maxWidth: '100%' }} className="list-group list-group-flush">
              <li className="list-group-item "><p className='pCheckout' >Nombre y apellido:</p> <input style={{textAlign: 'center'}} onChange={handleChange} defaultValue={props.usuario.nombre + ' ' + props.usuario.apellido} type="text" name="nombreyapellido" className='inputDetail' /></li>
              <li className="list-group-item"><p className='pCheckout' >Email:</p> <input style={{textAlign: 'center'}} onChange={handleChange} defaultValue={props.usuario.email} type="email" name="email" className='inputDetail' /></li>
              <li className="list-group-item"><p className='pCheckout' >Dirección de envío:</p> <input style={{textAlign: 'center'}} onChange={handleChange} defaultValue={props.usuario.domicilio ? props.usuario.domicilio : ''} type="text" name="direccion" className='inputDetail' /></li>
              <li className="list-group-item"><p className='pCheckout' >Código Postal:</p> <input style={{textAlign: 'center'}} onChange={handleChange} type="text" name="cp" className='inputDetail' /></li>
              <li className="list-group-item"><p className='pCheckout' >Localidad:</p> <input style={{textAlign: 'center'}} onChange={handleChange} type="text" name="localidad" className='inputDetail' /></li>
            </ul>
          </div>
        </div>
        {<ModalInfo
          encabezado={modal ? modal[0] : ''}
          accion={modal ? modal[1] : ''}
          history={props.history}
          historypush={modal[0] == 'Error' ? '/pagos' : '/tarjeta'}
        />}
        <div>

          <div>
            <h2 style={{ textAlign: 'center', marginTop: '1.30rem' }}> Detalles de la compra:</h2>
            <table className='tabla'>
              <tbody>
                <tr className='tr'>
                  <th>Imagenes</th>
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
                {props.carrito.map(producto => {
                  return (
                    <tr key={producto.id}>
                      <td><img style={{ width: '5rem', height: '5rem', objectFit: 'contain' }} src={producto.imagenes[0]} /></td>
                      <td><Link className='LinkCheckout' to={`/productos/${producto.id}`}>{producto.marca + ' ' + producto.modelo}</Link></td>
                      <td>{cantidades(producto.carrito.cantidad)}</td>
                      <td>${producto.precio}</td>
                      <td>${Totales(producto.precio, producto.carrito.cantidad)}</td>
                    </tr>)
                })}
                <tr style={{ borderTop: 'solid thin darkslategrey' }}><td /><td /><td style={{ fontWeight: '600' }}>{cantidadTotal}</td><td /><td style={{ fontWeight: '600' }}>${numberToString(total)}</td></tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSubmit}
            data-toggle='modal'
            data-target='#infoModal'
            style={{ marginBottom: '2rem' }} className='example_b general' id='checkoutButton' >Proceder al pago</button>
          <button onClick={() => props.history.push('/cart')} className='example_c general' id='goBack'>Volver al carrito</button>
        </div>
      </div>
    </div>);
};


const mapStateToProps = (state) => ({
  usuario: state.usuario,
  carrito: state.carrito,
  ordComp: state.ordComp
});

const mapDispatchToProps = (dispatch) => ({
  fetchCarrito: (id) => dispatch(fetchCarrito(id)),
  getOrdenes: (id) => dispatch(getOrdenes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);