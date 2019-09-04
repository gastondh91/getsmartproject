import axios from 'axios';
import { GET_SELUSER, CHECK_USER, ADD_USER, ADM_ACCESS, GET_USER } from '../constants';

export const addUser = (user) => ({
  type: ADD_USER,
  user
});

export const checkUser = (data) => ({
  type: CHECK_USER,
  data
});

export const admAccess = (qty) => ({
  type: ADM_ACCESS,
  qty
});

export const getUser = (usuario) => ({
  type: GET_USER,
  usuario
});

export const getSelUser = (selectedUser) =>({
  type: GET_SELUSER,
  selectedUser
})

export const giveadmAccess = (id) => dispatch =>
  axios.post(`/api/usuarios/esAdm/${id}`)
    .then(res => {
      return res;
    });

export const registerUser = (user) => dispatch =>
  axios.post('/api/usuarios/crea', { user })
    .then(res => res.data)
    .then(user => dispatch(addUser(user)));

export const checkUserLogin = (data) => dispatch =>
  axios.post('/api/usuarios/login', data)
    .then(res => {
      return res.data;
    })
    .then(data => dispatch(getUser(data)));

export const fetchUser = () => dispatch =>
  axios.get('/api/usuarios/user')
    .then(res => res.data)
    .then(usuario => dispatch(getUser(usuario)));

export const fetchOneUser = (id) => dispatch =>
  axios.get(`/api/usuarios/user/${id}`)
    .then(res => res.data)
    .then(usuario => dispatch(getSelUser(usuario)));
