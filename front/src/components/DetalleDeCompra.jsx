import React from 'react'

export default () => (
  <div className='pagos'>
    <div className='Detalle'><h1>Detalle de Compra</h1></div>
    <div className='TitOC'><h2>Orden de Compra #123456</h2></div>
    <div className='imgCompra'>
      <span >Foto</span>
      <span >Prod. Nro</span>
      <span >Cantidad</span>
      <span >Precio x Unid.</span>
      <span >SUBTOTAL</span>
      </div>
    <div className='textosOC'>
      <img className='OCimage'src= "/utils/iphone.jpg"></img>
      <h2 className='texto'>Producto</h2>
      <input className='inputOC'type='number'/>
      <h2 className='textoPrecio'> $130 </h2>
      <h2 className='textoPrecio'> $130 </h2>
    </div>
    <div className='preciofinal'>
      <h2>PRECIO FINAL</h2>
      <h2> $360 </h2>
    </div>
  </div>
)