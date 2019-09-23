/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { buscarProducto, buscarPuntajes } from '../redux/action-creators/products-actions';
import SingleProdComp from '../components/singleProdComp';
import axios from 'axios';

class SingleProd extends React.Component {
  constructor () {
    super();
  }

  borrarProd = (id) => {
    axios.delete(`/api/productos/${id}`)
  }

  componentDidMount () {
    this.props.buscarProd(this.props.prodId);
    this.props.buscarPuntajes(this.props.prodId)
  }

  render () {
    const product = this.props.producto;
    return (
      <div className="container" >
        {product.id ? <SingleProdComp
         history={this.props.history}
        borrarProd={this.borrarProd} 
        producto={product}
        adminInfo={this.props.isAdmin} 
        categorias={product.categorias} 
        puntajes={this.props.puntajes}

        /> : <h1>Este producto no existe</h1>}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  puntajes: state.puntajes
});

const mapDispatchToProps = (dispatch) => ({
  buscarProd: (prodID) => dispatch(buscarProducto(prodID)),
  buscarPuntajes: (prodId) => dispatch(buscarPuntajes(prodId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProd);
