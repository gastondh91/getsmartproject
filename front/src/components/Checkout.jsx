import React from 'react';
import DatosDelCliente from './DatosDelCliente';
import DetalleDelCliente from './DetalleDeCompra';

const Checkout = () => {
  return (<div className='checkoutview'>
    <div className='datosgrid'><DatosDelCliente /></div>
    <div className='datosgrid'><DetalleDelCliente /></div>
  </div>);
};

export default Checkout
;
