import axios from 'axios';

const setCarrito = (carrito) => {
  return {
    type: 'SET_CARRITO',
    carrito
  };
};

// const setAddToCart = (productoCarrito) => {
//   return {
//     type: 'SET_ADDTOCART',
//     productoCarrito
//   };
// };

export const fetchCarrito = (id) => dispatch => {
  axios.get(`/api/carrito/${id}`)
    .then(carrito => {
      dispatch(setCarrito(carrito.data));
    });
};

export const updateCarrito = (id, cantidad, productos) => dispatch => {
  axios.post(`/api/carrito/update/${id}`, { cantidad, productos })
};

export const addToCart = (idProducto, idUsuario) => dispatch => {
  alert('Producto agregado al carrito')
  return axios.post('/api/carrito/add', { idProducto, idUsuario })
};

