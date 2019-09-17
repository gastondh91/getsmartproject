import { SET_BUSQ, SET_CURRENTLOCATION ,GET_SELUSER, CHECK_USER, SET_ALLCAT, SET_SAVEDCATEGORIES, ADD_USER, ADM_ACCESS, RECEIVE_PRODUCT, GET_USER, SET_PRODUCTS, SET_CATEGORIAS, SEARCH_MARK, SET_ADDTOCART } from '../constants';

const initialState = {
  products: [],
  selectedProd: {},
  userCheck: {},
  user: {},
  access: '',
  usuario: {},
  users: [],
  carrito: [],
  marcas: [],
  allCategories: [],
  savedCategories: [],
  selectedUser: {},
  savedBusqueda: '',
  currentLocation: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSQ:
      return Object.assign({}, state, { savedBusqueda: action.busqueda });
    case GET_SELUSER:
      return Object.assign({}, state, { selectedUser: action.selectedUser });
      case SET_CURRENTLOCATION:
        return Object.assign({}, state, { currentLocation: action.currentLocation });
    case SET_ALLCAT:
      return Object.assign({}, state, { allCategories: action.allCategories });
    case SET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case SET_SAVEDCATEGORIES:
      return Object.assign({}, state, { savedCategories: action.savedCategories });
    case RECEIVE_PRODUCT:
      return Object.assign({}, state, { selectedProd: action.product });
    case CHECK_USER:
      return Object.assign({}, state, { userCheck: action.data });
    case ADD_USER:
      return Object.assign({}, state, { user: action.user });
    case ADM_ACCESS:
      return Object.assign({}, state, { access: action.qty });
    case SET_CATEGORIAS:
      return Object.assign({}, state, { categorias: action.categorias });
    case GET_USER:
      return Object.assign({}, state, { usuario: action.usuario });
    case 'SET_USERS':
      return Object.assign({}, state, { users: action.users });
    case 'SET_CARRITO':
      return Object.assign({}, state, { carrito: action.carrito });
    case SEARCH_MARK:
      return Object.assign({}, state, { marcas: action.marca });
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    case SET_ADDTOCART:
      return Object.assign({}, state, { carrito: [...state.carrito, action.productoCarrito] });
    default:
      return state;
  }
};
