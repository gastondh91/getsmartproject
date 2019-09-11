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
                <li ><Link onClick={()=> (this.props.location.pathname == '/productos') && this.props.history.push('/productos')} to='/productos'>iPhone</Link></li>
                <li style={{width: 'min-content'}}><Link  to='/productos/add' onClick = { this.handleClick }>Samsung</Link></li>
                <li ><Link to='/adm/purchaseOrders' style={{width: '6rem'}} onClick={this.handleClick}>Motorola</Link></li>
                <li><Link to='/categorias/adm' style={{width: '7rem'}} onClick={this.handleClick}>LG</Link></li>
                <li ><Link to='/usuarios/all' style={{width: '7rem'}} onClick={this.handleClick}>Huawei</Link></li>
                <li ><Link to='/usuarios/all' style={{width: '7rem'}} onClick={this.handleClick}>Xiaomi</Link></li>
              </ul>
            </div>
            </div> 
    );
  }
};
