/* eslint-disable no-unused-vars */
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, setBusqueda, setCurrentLocation } from '../../redux/action-creators/action-creator'
import { fetchCarrito } from '../../redux/action-creators/carrito-actions'
import style from './HeaderStyles.css'

const Header = ({
  usuario, login,
}) => {

  const location = useLocation()
  const actualLocation = location.pathname
  const history = useHistory()
  const carrito = useSelector(store => store.carrito)
  const dispatch = useDispatch()

  useEffect(() => {
    if (actualLocation !== '/productos') cancelCourse()
    if (actualLocation !== '/usuarios/login' && actualLocation !== '/unauthorized') dispatch(setCurrentLocation(actualLocation))
  }, [actualLocation])

  useEffect(() => {
    if (usuario) dispatch(fetchCarrito(usuario.id))
  }, [])

  const handleChange = (e) => {
    dispatch(setBusqueda(e.target.value))
    history.push('/productos')
  }

  const cancelCourse = () => {
    document.getElementById('input').value = ''
    dispatch(setBusqueda(''))
  }

  return (
    <header className="row align-items-center">
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 ingreso-registro">

        {login ? (

          <div className="d-flex justify-content-lg-around">
            <div
              role="presentation"
              onClick={async () => {
                await axios.get('/api/usuarios/logOut')
                dispatch(fetchUser())
                history.push(actualLocation)
              }}
              className="logout col-3 px-2"
            >
              <img className="logout-icon" src="/utils/logout.png" alt="Logout" />
              <div className="logout-text text-center pl-1">Cerrar Sesión</div>
            </div>

            <div className="col-2 px-0 text-center">

              <img
                role="presentation"
                onClick={() => history.push(`/usuarios/edit/${usuario.id}`)}
                src={usuario.avatar}
                title="Perfil"
                alt="Avatar"
                className="avatar"
              />
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div className="ml-4">
              <Link to="/usuarios/registro">
                <div>
                  <img className="img-registro img-responsive" src="/utils/signupiconlg.gif" alt="Registrarse" />
                </div>
                <span className="registrarse">Registrarse</span>
              </Link>
            </div>


            <div className="ml-3">
              <Link to="/usuarios/login">
                <div className="text-center">
                  <img className="img-ingreso img-responsive" src="/utils/log.svg" alt="Login" />
                </div>
                <span className="ingresar">Ingresar</span>
              </Link>
            </div>
          </div>
        )}

        <div className="ml-3">
          <Link to="/"><img className="logo img-responsive" title="Inicio" src="/utils/logoBlanco3.jpg" alt="Logo" /></Link>
        </div>

      </div>
      <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 offset-md-3 busqueda-carrito">

        <div className="col-7">

          <form className="form-inline d-flex md-form form-sm active-cyan-2 mt-2">
            <input
              id="input"
              onChange={handleChange}
              className="form-control form-control-sm mr-3 w-75 search-bar"
              type="text"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
            />
            <i className="fas fa-search" aria-hidden="true" />
          </form>
        </div>
        <div className="col-2 pl-3 pr-1">
          <Link to="/cart" title="Ver carrito">
            <img className="carrito img-responsive" src="/utils/carrito.svg" alt="Carrito" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
