import React from 'react';

export default () => (
  <div>
    <div className="card">
      <div className="card-header">
        Datos del Cliente
        </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Nombre y apellido: <input type="text" name="fname" className='inputDetail' id='fullnameInput' /></li>
        <li className="list-group-item"> Email: <input type="email" name="email" className='inputDetail' id='emailInput' /></li>
        <li className="list-group-item">Dirección de Envío: <input type="text" name="address" className='inputDetail' id='addressInput' /></li>
        <li className="list-group-item">Codigo Postal: <input type="text" name="cp" className='inputDetail' id='cpInput' /></li>
        <li className="list-group-item">Localidad: <input type="text" name="localidad" className='inputDetail' id='localidadInput' /></li>
      </ul>
    </div>
  </div>
)

