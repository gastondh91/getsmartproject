import axios from 'axios';
import { SET_CARRITO } from '../constants';

const setCarrito = (carrito) => ({
    type: SET_CARRITO,
    carrito
});


export const fetchCarrito = (id) => dispatch => {
  return axios.get(`/api/carrito/${id}`)
    .then(carrito => dispatch(setCarrito(carrito.data)));
};

export const updateCarrito = (id, cantidad, productos) => dispatch => {
  axios.post(`/api/carrito/update/${id}`, { cantidad, productos });
};

