import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const OrdenDeCompra = (props) => {

  var [Orden, setOrden] = useState()

  useEffect(() => {
    axios.get(`/api/ordencompra/getOrden/${props.ordenId}`)
      .then(orden => setOrden(Orden = orden.data))
  }, [])

  const stringToNumber = (string) => {
    let numero = string.split('.')
    numero = Number(numero.join(''))
    return numero
  }

  const numberToString = (numero) => {
    let string = numero.toString()
    if (string.length == 4) return string[0] + '.' + string.slice(1)
    if (string.length == 5) return string.slice(0, 2) + '.' + string.slice(2)
    if (string.length == 6) return string.slice(0, 3) + '.' + string.slice(3)
  }

  const cantidadProd = (cantidades) => {
    let suma = 0
    for (let i in cantidades) {
      suma += cantidades[i]
    }
    return suma
  }


  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>{`Orden de compra #${props.ordenId}:`}</h1>
        <hr style={{width: '65rem'}}/>
      </div>
      {Orden && <div className='checkoutview datosgrid'>
        <div>
          <div className="cardcheck" id='cardCheckout'>
            <div style={{fontWeight: '600', fontSize: '1.2rem'}} className="card-header">
              Datos del Cliente
        </div>
            <ul style={{ maxWidth: '100%' }} className="list-group list-group-flush">
            <li className="list-group-item">
                <p className='pCheckout' >Usuario:</p>
                <Link id='ordLink' to={`/usuarios/edit/${Orden.usuario.id}`}><p style={{display: 'contents', fontSize: '18px'}} className='italic'>{Orden.usuario.Nickname}</p></Link>
                </li>
                <li className="list-group-item">
              <p className='pCheckout' >Estado:</p>
                <p style={{ fontWeight: 600, color: `${Orden.status == 'CANCELADO' ? 'red' : 'green'}`}} className='italic'>{Orden.status}</p>
                </li>
                {Orden.tarjeta ? <li className="list-group-item">
                <p className='pCheckout' >Pagado con:</p>
                <p className='italic'>Tarjeta {Orden.tarjeta['brand'] ? (Orden.tarjeta['brand']).toUpperCase() : ''} terminada en {Orden.tarjeta['lastnum']}</p> 
                </li> : ''}
              <li className="list-group-item">
                <p className='pCheckout' >Nombre y apellido:</p>
                <p className='italic'>{Orden.datos['nombreyapellido']}</p> 
                </li>
              <li className="list-group-item">
              <p className='pCheckout' >Email:</p>
                <p className='italic'>{Orden.datos['email']}</p>
                </li>
                <li className="list-group-item">
              <p className='pCheckout' >Dirección de envío:</p>
                <p className='italic'>{Orden.datos['direccion']}</p>
                </li>
                <li className="list-group-item">
              <p className='pCheckout' >Código postal:</p>
                <p className='italic'>{Orden.datos['cp']}</p>
                </li>
                <li id='lastChild' className="list-group-item">
              <p className='pCheckout' >Localidad:</p>
                <p className='italic'>{Orden.datos['localidad']}</p>
                </li>
            </ul>
          </div>
        </div>
        <div className='contenedorCarrito'>
          {console.log(Orden)}
            <div style={{marginLeft : '1rem'}}>
              <table className='tabla'>
                <tbody>
                  <tr className='tr'>
                    <th>Imagenes</th>
                    <th>Productos</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                  </tr>
                  {
                    Orden.productos.map(prod => {
                      return (
                        <tr key={prod.id} >
                          <td>{<img style={{ width: '5rem', height: '5rem', objectFit: 'contain' }} src={prod.imagenes[0]} />}</td>
                          <td ><Link className='LinkCheckout' to={`/productos/${prod.id}`}>{prod.marca + ' ' + prod.modelo}</Link></td>
                          <td>{Orden.cantidades[prod.id]}</td>
                          <td>${prod.precio}</td>
                          <td>${numberToString(stringToNumber(prod.precio) * Orden.cantidades[prod.id])}</td>
                        </tr>

                      )
                    })
                  }
                  <tr style={{ borderTop: 'solid thin darkslategrey' }}><td /><td /><td style={{ fontWeight: '600' }}> {cantidadProd(Orden.cantidades)}</td><td /><td style={{ fontWeight: '600' }}>${Orden.total}</td></tr>
                </tbody>
              </table>
            </div>
        <button style={{display: 'block',float: 'none', marginLeft: 'auto', marginRight: 'auto'}} className='example_b botonCarrito general' type='button' onClick={()=> props.history.push('/ordenesdecompra')}>Volver atras</button>
        </div>
      </div>}
    </div>
  );
}

export default OrdenDeCompra