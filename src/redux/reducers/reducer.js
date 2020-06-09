import {
  GET_OC, SET_PUNTAJES, SET_BUSQ, SET_CURRENTLOCATION, GET_SELUSER, CHECK_USER, SET_ALLCAT, SET_SAVEDCATEGORIES, ADD_USER, ADM_ACCESS, RECEIVE_PRODUCT, GET_USER, SET_PRODUCTOS, SET_CATEGORIAS, SEARCH_MARK, SET_CARRITO,
} from '../constants'

const initialState = {
  productos: [],
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
  currentLocation: '',
  puntajes: [],
  ordComp: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSQ:
      return { ...state, savedBusqueda: action.busqueda }
    case GET_OC:
      return { ...state, ordComp: action.ordComp }
    case SET_PUNTAJES:
      return { ...state, puntajes: action.puntajes }
    case GET_SELUSER:
      return { ...state, selectedUser: action.selectedUser }
    case SET_CURRENTLOCATION:
      return { ...state, currentLocation: action.currentLocation }
    case SET_ALLCAT:
      return { ...state, allCategories: action.allCategories }
    case SET_PRODUCTOS:
      return { ...state, productos: action.productos }
    case SET_SAVEDCATEGORIES:
      return { ...state, savedCategories: action.savedCategories }
    case RECEIVE_PRODUCT:
      return { ...state, selectedProd: action.product }
    case CHECK_USER:
      return { ...state, userCheck: action.data }
    case ADD_USER:
      return { ...state, user: action.user }
    case ADM_ACCESS:
      return { ...state, access: action.qty }
    case SET_CATEGORIAS:
      return { ...state, categorias: action.categorias }
    case GET_USER:
      return { ...state, usuario: action.usuario }
    case 'SET_USERS':
      return { ...state, users: action.users }
    case SET_CARRITO:
      return { ...state, carrito: action.carrito }
    case SEARCH_MARK:
      return { ...state, marcas: action.marca }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      }
    default:
      return state
  }
}
