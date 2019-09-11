/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default class NavbarContainer extends Component {
  render () {

    
    return (
       <div>
            <div id='navbar3' className="navbar2">
      
              <ul>
                <li ><Link to='/categorias/marcas/iPhone' >iPhone</Link></li>
                <li ><Link  to='/categorias/marcas/Samsung'>Samsung</Link></li>
                <li ><Link to='/categorias/marcas/Motorola' >Motorola</Link></li>
                <li><Link to='/categorias/marcas/Lg'>LG</Link></li>
                <li ><Link to='/categorias/marcas/Huawei'>Huawei</Link></li>
                <li ><Link to='/categorias/marcas/Xiaomi'>Xiaomi</Link></li>
              </ul>
            </div>
            </div> 
    );
  }
};
