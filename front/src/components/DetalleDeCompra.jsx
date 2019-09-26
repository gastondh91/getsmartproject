import React, { useState } from 'react'

export default ({ carrito, history }) => {

  const priceToNumber = (numero) => {
    var splited = numero.split('.')
    var number = Number(splited.join(''))
    return number
  }

  var total = 0
  var cantidadTotal = 0

  const cantidades = (cantidad)=>{
    cantidadTotal+= cantidad
    return cantidad
  } 

  const subtotal = (precio, cantidad) => {
    var sumatoria = priceToNumber(precio) * cantidad
    total += sumatoria
    return sumatoria
  }


  return (
    <div>
      <h2 style={{textAlign: 'center', marginTop: '1.30rem'}}> Detalles de la compra:</h2>
      <table className='tabla'>
        <tbody>
          <tr className='tr'>
            <th>Imagenes</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
          </tr>
          {carrito.map( producto=>{
            return(
          <tr key={producto.id}>
            <td><img style={{width: '5rem', height: '5rem', objectFit:'contain'}} src={producto.imagenes[0]}/></td>
            <td>{producto.marca + ' '+ producto.modelo}</td>
            <td>{cantidades(producto.carrito.cantidad)}</td>
            <td>${producto.precio}</td>
            <td>${subtotal(producto.precio,producto.carrito.cantidad)}</td>
          </tr>)
          })}
          <tr style={{ borderTop: 'solid thin darkslategrey'}}><td/><td/><td>{cantidadTotal}</td><td/><td>${total}</td></tr>
        </tbody>
      </table>
      <button onClick={()=> history.push('/tarjeta')} style={{marginBottom: '2rem'}} className='example_b' id='checkoutButton' >Proceder al pago</button>
      <button onClick={()=> history.push('/cart')} className='example_c' id='goBack' >Volver al carrito</button>
    </div>
  )
}