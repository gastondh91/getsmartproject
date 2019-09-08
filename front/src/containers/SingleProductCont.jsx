/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { buscarProducto, buscarCategorias } from '../redux/action-creators/products-actions';
import SingleProdComp from '../components/singleProdComp';
import axios from 'axios';

class SingleProd extends React.Component {
  constructor () {
    super();
  }

  borrarProd = () => {
    axios.delete(`/api/productos/${this.props.producto.id}`)
    .then(()=>{
      alert('Se elimino ' + this.props.producto.marca + ' ' + this.props.producto.modelo);
      this.props.history.push('/productos');
    })

  }

  componentDidMount () {
    this.props.buscarProd(this.props.prodId);
    this.props.buscarCat(this.props.prodId);
  }

  render () {
    const product = this.props.producto;
    return (
      <div className="container" >
        {product.id ? <SingleProdComp onClick={this.borrarProd} producto={product} adminInfo={this.props.isAdmin} categorias={this.props.categorias} /> : <h1>Este producto no existe</h1>}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  rating: state.ratingProd,
  categorias: state.categorias

});

const mapDispatchToProps = (dispatch) => ({
  buscarProd: (prodID) => dispatch(buscarProducto(prodID)),
  buscarCat: (artId) => dispatch(buscarCategorias(artId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProd);
