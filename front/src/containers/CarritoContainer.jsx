import React, { useEffect, useState } from 'react';
import { fetchCarrito, updateCarrito } from '../redux/action-creators/carrito-actions.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios'

const CarritoContainer = (props) => {

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    // props.fetchUser()
    if (props.usuario) props.getCarrito(props.usuario.id);

  }, [])

  const CartPromise = (usuario, input, producto) => {
    new Promise((resolve, reject) => {
      props.updateCarrito(usuario, input, producto)
      resolve('ok')
    })
    .then(() => props.history.push('/pagos'))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(inputs).length) CartPromise(props.usuario.id, inputs, props.carrito)
    else props.history.push('/pagos')
  }

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [event.target.name]: Number(event.target.value) }));
  }

  const deleteProd = (params) => {
    axios.post(`/api/carrito/delete/${params}`)
      .then(() => props.getCarrito(props.usuario.id))
  }


  return (
    <div className='contenedorCarrito'>
      {console.log('inputs', props.carrito)}
      <h1>Carrito de compras:</h1>
      <hr />
      <form className='inputCarrito' onSubmit={handleSubmit}>
        <div className="carritoContainer">
          {props.carrito.map(producto => {
            return (
              <div className="media" key={producto.id}>
                <img src={producto.imagenes[0]} className="mr-3 imgCarritoList" />
                <div className="media-body">
                  <Link style={{ color: 'navy' }} to={`/productos/${producto.id}`}><h5 className="mt-0">{producto.marca + ' ' + producto.modelo}</h5></Link>
                  <p>{producto.descripcion.slice(0, 30) + '...'}</p>
                </div>
                <h5>${producto.precio}</h5>
                <div>
                  <label>Cantidad:</label>
                  <input type="number" name={producto.id} id='cantidadProd' min='1' max={producto.stock} defaultValue={producto.carrito.cantidad ? producto.carrito.cantidad : 1} onChange={handleChange} />
                </div>
                {console.log('props', props)}
                <div className="containerUser">
                  <img onClick={() => deleteProd(producto.id)} value={producto.id} id='trashUser' src="/utils/garbage.svg"></img>
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
    carrito: state.carrito,
    productos: state.products,
    usuario: state.usuario
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrito: (id) => dispatch(fetchCarrito(id)),
    updateCarrito: (id, cantidad, productos) => dispatch(updateCarrito(id, cantidad, productos)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarritoContainer);
