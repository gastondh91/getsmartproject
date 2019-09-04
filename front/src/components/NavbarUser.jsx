/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default class NavbarContainer extends Component {
  render () {
    return (
      <div className="navbar-light" id= 'navbar-light'>
        <div className="row">
          <div className="col-sm-2 nav-link marg ">
            <div className='col-lg-12 '>
              <Link to = '/categorias/marcas/iPhone' > iPhone </Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link marg">
            <div className='col-lg-12'>
              <Link to = '/categorias/marcas/Samsung' > Samsung </Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link marg">
            <div className='col-lg-12 '>
              <Link to = '/categorias/marcas/Motorola' > Motorola </Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link marg">
            <div className='col-lg-12 '>
              <Link to = '/categorias/marcas/Xiaomi' > Xiaomi </Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link marg">
            <div className='col-lg-12 '>
              <Link to = '/categorias/marcas/LG' > LG </Link>
            </div>
          </div>
          <div className="col-sm-2 nav-link marg">
            <div className='col-lg-12'>
              <Link to = '/categorias/marcas/Huawei' > Huawei </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
