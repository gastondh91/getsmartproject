/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBusqueda } from '../redux/action-creators/action-creator'

var productos = ['iPhone', 'Samsung', 'Motorola', 'Xiaomi', 'Huawei', 'LG']

class NavbarContainer extends Component {
  render() {


    return (
      <div>
        <div id='navbar3' className="navbar2">

          <ul>
            {productos.map((producto, index) => {
              return (<li key={index++} onClick={() => {
                this.props.setBusqueda(producto)
                this.props.history.push('/productos')
              }} ><a style={{ cursor: 'pointer', color: 'white' }}>{producto}</a></li>
              )}
            )}
          </ul>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  savedBusqueda: state.savedBusqueda
});
const mapDispatchToProps = (dispatch) => ({
  setBusqueda: (busqueda) => dispatch(setBusqueda(busqueda))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
