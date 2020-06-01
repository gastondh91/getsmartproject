/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBusqueda } from '../../redux/action-creators/action-creator'
import Nav from 'react-bootstrap/Nav'
import style from './NavbarUserStyles.css'

const tabs = ['Catálogo', 'iPhone', 'Samsung', 'Motorola', 'Xiaomi', 'Huawei', 'LG']

const NavbarContainer = (props) => (

  <div className='navbar-user'>
    <Nav onSelect={(selectedKey) => {
      if (selectedKey === 'Catálogo') selectedKey = ''
      props.setBusqueda(selectedKey)
      props.history.push(`/productos`);
    }} justify={true}>
      {tabs.map((tab, index) => {
        return (
          <Nav.Item key={index}>
            <Nav.Link eventKey={tab}
            >{tab}
            </Nav.Link>
          </Nav.Item>
        )
      })}
    </Nav>
  </div >
);

const mapStateToProps = (state) => ({
  savedBusqueda: state.savedBusqueda
});
const mapDispatchToProps = (dispatch) => ({
  setBusqueda: (busqueda) => dispatch(setBusqueda(busqueda))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
