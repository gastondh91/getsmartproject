import React from 'react';
import { fetchCarrito, comprarCarrito } from '../redux/action-creators/carrito-actions.js';
import { getProducts } from '../redux/action-creators/products-actions';
import { connect } from 'react-redux';

class CarritoContainer extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    // this.props.fetchUser()
    this.props.getCarrito(this.props.usuario.id);
    // this.props.getProducts('?modelo=');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.comprarCarrito(this.props.usuario.id, this.state, this.props.cartProducts);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render () {
    return (
      <div className='contenedorCarrito'>
        <h1>Carrito de compras:</h1>
        <hr />
        <form className='inputCarrito' onSubmit={this.handleSubmit}>
          <div className="carritoContainer">
            {this.props.cartProducts && this.props.cartProducts.map(producto => {
              return (
                <div className="media" key={producto.id}>
                  <img src={producto.imagenes[0]} className="mr-3 imgCarritoList" />
                  <div className="media-body">
                    <h5 className="mt-0">{producto.marca + ' ' + producto.modelo}</h5>
                    <p>{producto.descripcion.slice(0, 30) + '...'}</p>
                  </div>
                  <h5>${producto.precio}</h5>
                  <div>
                    <label>Cantidad:</label>
                    <input type="number" name={producto.id} id='cantidadProd' defaultValue={1} onChange={this.handleChange}/>
                  </div>
                  <div className="containerTrash">
                    <img id='trashUser' src="/utils/garbage.svg"></img>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <button className='pure-material-button-contained' type='submit' onSubmit={this.handleSubmit}>Comprar</button>
        </form>
      </div>
    );
  }
};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoContainer);
