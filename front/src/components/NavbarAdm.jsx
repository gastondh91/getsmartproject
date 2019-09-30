/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarUser extends Component {
  render() {
    return (
<div>
      <div className="navbar2">

        <ul>
          <li ><Link onClick={()=> (this.props.location.pathname == '/productos') && this.props.history.push('/productos')} to='/productos'>Productos</Link></li>
          <li style={{width: 'min-content'}}><Link  to='/productos/add' onClick = { this.handleClick }>Crear producto</Link></li>
          <li ><Link to='/ordenesdecompra' style={{width: '6rem'}} onClick={this.handleClick}>Órdenes de compra</Link></li>
          <li><Link to='/categorias/adm' style={{width: '7rem'}} onClick={this.handleClick}>Gestión de categorías</Link></li>
          <li ><Link to='/usuarios/all' style={{width: '7rem'}} onClick={this.handleClick}>Gestión de usuarios</Link></li>
        </ul>
        
      </div>
      </div>
    );
  }
}


export default NavbarUser;