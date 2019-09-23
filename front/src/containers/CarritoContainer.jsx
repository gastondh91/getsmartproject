import React, { useEffect, useState } from 'react';
import { fetchCarrito, comprarCarrito } from '../redux/action-creators/carrito-actions.js';
import { getProducts } from '../redux/action-creators/products-actions';
import { connect } from 'react-redux';

const CarritoContainer = (props) => {

  const [inputs, setInputs] = useState({});

  useEffect(()=>{
    // props.fetchUser()
    props.getCarrito(props.usuario.id);
    // props.getProducts('?modelo=');
    
  },[])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.comprarCarrito(props.usuario.id, state, props.cartProducts);
  }
  const handleChange = (e) => {
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }


    return (
      <div className='contenedorCarrito'>
        {console.log('inputs',inputs)}
        <h1>Carrito de compras:</h1>
        <hr />
        <form className='inputCarrito' onSubmit={handleSubmit}>
          <div className="carritoContainer">
            {props.cartProducts.map(producto => {
              return (
                <div className="media" key={producto.id}>
                  <img src={producto.imagenes && producto.imagenes[0]} className="mr-3 imgCarritoList" />
                  <div className="media-body">
                    <h5 className="mt-0">{producto.marca + ' ' + producto.modelo}</h5>
                    <p>{producto.descripcion && producto.descripcion.slice(0, 30) + '...'}</p>
                  </div>
                  <h5>${producto.precio}</h5>
                  <div>
                    <label>Cantidad:</label>
                    <input type="number" name={producto.id} id='cantidadProd' defaultValue={1} onChange={handleChange}/>
                  </div>
                  {/* {console.log('Cantidad acum',Cantidad)} */}
                  <div className="containerUser">
                    <img id='trashUser' src="/utils/garbage.svg"></img>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <button className='pure-material-button-contained' type='submit' onSubmit={handleSubmit}>Comprar</button>
        </form>
      </div>
    );
  }

const mapStateToProps = state => {
  return {
    cartProducts: state.carrito,
    productos: state.products,
    usuario: state.usuario
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrito: (id) => dispatch(fetchCarrito(id)),
    getProducts: (searchProduct) => dispatch(getProducts(searchProduct)),
    comprarCarrito: (id, cantidad, productos) => dispatch(comprarCarrito(id, cantidad, productos)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarritoContainer);
