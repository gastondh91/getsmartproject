import React from 'react';

export default ({usuario}) => (
  <div>
    <div className="card">
      <div className="card-header">
        Datos del Cliente
        </div>
      <ul style={{maxWidth: '100%' }} className="list-group list-group-flush">
        <li className="list-group-item">Nombre y apellido: <input defaultValue={usuario.nombre + ' ' +usuario.apellido} type="text" name="fname" className='inputDetail' /></li>
        <li className="list-group-item"> Email: <input defaultValue={usuario.email} type="email" name="email" className='inputDetail' /></li>
        <li className="list-group-item">Dirección de Envío: <input defaultValue={usuario.domicilio ? usuario.domicilio : ''} type="text" name="address" className='inputDetail' /></li>
        <li className="list-group-item">Codigo Postal: <input type="text" name="cp" className='inputDetail' /></li>
        <li className="list-group-item">Localidad: <input type="text" name="localidad" className='inputDetail' /></li>
      </ul>
    </div>
  </div>
)