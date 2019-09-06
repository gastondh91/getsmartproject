/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarUser extends Component {
  render () {
    return (
      <div className="navbar-light" id='navbar-light'>
        <div className="row">
          <div style={{paddingTop: '1.4%'}} className="col-sm-2 nav-link">
            <div className='col-lg-10 '>
              <Link onClick={()=> (this.props.location.pathname == '/productos') && this.props.history.push('/productos')} to='/productos'>Productos</Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link">
            <div className='col-lg-10 '>
              <Link to='/productos/add' onClick = { this.handleClick }>Crear <br/> producto</Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link">
            <div className='col-lg-10 '>
              <Link to='/adm/purchaseOrders' onClick={this.handleClick}>Órdenes de <br/> compra</Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link">
            <div className='col-lg-10 '>
              <Link to='/categorias/add' onClick={this.handleClick}>Gestión de <br/> categorías</Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link">
            <div className='col-lg-10 '>
              <Link to='/usuarios/all' onClick={this.handleClick}>Gestión de <br/> usuarios</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default NavbarUser;