/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { buscarProducto, buscarPuntajes } from '../redux/action-creators/products-actions';
import SingleProdComp from '../components/singleProdComp';
import axios from 'axios';

class SingleProd extends React.Component {
  constructor() {
    super();
  }

  borrarProd = (id) => {
    axios.delete(`/api/productos/${id}`)
  }

  componentDidMount() {
    this.props.buscarProd(this.props.prodId);
    this.props.buscarPuntajes(this.props.prodId)
  }

  render() {
    const producto = this.props.producto;
    return (
      <div className="container" >
        {producto.id && <SingleProdComp
          history={this.props.history}
          borrarProd={this.borrarProd}
          producto={producto}
          adminInfo={this.props.isAdmin}
          categorias={producto.categorias}
          puntajes={this.props.puntajes}

        />}
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
