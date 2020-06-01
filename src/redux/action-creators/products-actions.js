import axios from 'axios';
import {
    RECEIVE_PRODUCT,
    SET_PRODUCTOS,
    SET_CATEGORIAS,
    SET_ALLCAT,
    SEARCH_MARK,
    SET_PUNTAJES
} from '../constants';

export const setAllCat = (allCategories) => ({
    type: SET_ALLCAT,
    allCategories
})

export const setProductos = (productos) => ({
    type: SET_PRODUCTOS,
    productos
});

export const setPuntajes = (puntajes) => ({
    type: SET_PUNTAJES,
    puntajes
})

const recibirProducto = (product) => ({
    type: RECEIVE_PRODUCT,
    product
});

export const setCategorias = (categorias) => ({
    type: SET_CATEGORIAS,
    categorias
});

const buscarMarca = (marca) => ({
    type: SEARCH_MARK,
    marca
});

export const getProductos = searchProduct => dispatch => {
    return axios.get(`/api/productos/${searchProduct}`)
        .then(res => {
            dispatch(setProductos(res.data));
        });
};

export const buscarProducto = prodID => dispatch => {
    return axios.get(`/api/productos/${prodID}`)
        .then(res => res.data)
        .then(producto => dispatch(recibirProducto(producto)))
};

export const buscarMarcas = markProd => dispatch => {
    return axios.get(`/api/categorias/marcas/${markProd}`)
        .then(res => {
            dispatch(buscarMarca(res.data));
        });
};
export const buscarCategorias = prodId => dispatch => {
    axios.get(`/api/categorias/${prodId}`)
        .then(info => info.data)
        .then(categorias => dispatch(setCategorias(categorias)))
}

export const getAllCat = () => dispatch => {
    axios.get('/api/categorias/get')
        .then(categorias => dispatch(setAllCat(categorias.data)))
}

export const borrarProd = (prodID) =>
    axios.delete(`/api/productos/${prodID}`);

export const buscarPuntajes = (prodId) => dispatch => {
    axios.get(`/api/puntajes/getPuntajes/${prodId}`)
        .then(puntajes => dispatch(setPuntajes(puntajes.data)))
}