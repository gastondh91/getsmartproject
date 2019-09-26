import React from 'react'
import { Link } from 'react-router-dom'

export default ({ carrito, history }) => {

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
            <td><Link className='LinkCheckout' to={`/productos/${producto.id}`}>{producto.marca + ' '+ producto.modelo}</Link></td>
            <td>{cantidades(producto.carrito.cantidad)}</td>
            <td>${producto.precio}</td>
            <td>${numberToString(subtotal(producto.precio,producto.carrito.cantidad))}</td>
          </tr>)
          })}
          <tr style={{ borderTop: 'solid thin darkslategrey'}}><td/><td/><td  style={{fontWeight : '600'}}>{cantidadTotal}</td><td/><td style={{fontWeight : '600'}}>${numberToString(total)}</td></tr>
        </tbody>
      </table>
      <button onClick={()=> history.push('/tarjeta')} style={{marginBottom: '2rem'}} className='example_b general' id='checkoutButton' >Proceder al pago</button>
      <button onClick={()=> history.push('/cart')}  className='example_c general' id='goBack'>Volver al carrito</button>
    </div>
  )
}