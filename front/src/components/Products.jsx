// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Products = ({ products,savedBusqueda }) => {


  let filtered = products.filter( value =>{ 
    
    let concat = value.marca + ' ' + value.modelo

    value = concat

    return ((value.toLowerCase().includes(savedBusqueda) 
    || 
    value.toUpperCase().includes(savedBusqueda)
    || 
    value.includes(savedBusqueda)))
    
    })


  return (

    (savedBusqueda ? filtered : products).sort((a, b) => { return b.id - a.id }).map(product => (
      <Link to={`/productos/${product.id}`} key={product.id}>
        <div className="product" >
          <div className="card">
            <img style={{ objectFit: 'contain' }} src={`${product.imagenes[0]}`}
              className="card-img-top imgproduct" />
            <div className="card-body">
              <h5 className="card-title last"> {product.marca + ' ' + product.modelo} </h5>
              <strong><p className="card-text"> ${product.precio} </p></strong>
              <p className="card-text last"> {product.descripcion.slice(0, 90) + '...'} </p>
            </div>
          </div>
        </div>
      </Link>
    ))
  );
}

const mapStateToProps = (state) => ({
  savedBusqueda: state.savedBusqueda
});

export default connect(mapStateToProps)(Products);
