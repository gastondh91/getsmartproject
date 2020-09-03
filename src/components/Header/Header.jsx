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
      <div className="col-5 col-sm-5 col-md-6 col-lg-6 ingreso-registro">

        {login ? (

          <div className="d-flex justify-content-lg-around">
            <div
              role="presentation"
              onClick={async () => {
                await axios.get('/api/usuarios/logOut')
                dispatch(fetchUser())
                history.push(actualLocation)
              }}
              className="logout px-2"
            >
              {/* <img className="logout-icon" src="/utils/logout.png" alt="Logout" /> */}
            </div>

            <div className="px-0 text-center">

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
          <div className="panel-login">
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
      <div className="col-7 col-sm-7 col-md-5 col-lg-5 offset-md-1 offset-lg-1 busqueda-carrito">


        <form className="form-inline d-flex md-form form-sm active-cyan-2 mt-2">
          <input
            id="input"
            onChange={handleChange}
            className="form-control form-control-sm mr-2 search-bar"
            type="text"
            placeholder="Buscar productos"
            aria-label="Buscar productos"
          />
          <i className="fas fa-search" aria-hidden="true" />
        </form>
        <Link to="/cart" title="Ver carrito">
          <img className="carrito img-responsive" src="/utils/carrito.svg" alt="Carrito" />
        </Link>
      </div>
    </header>
  )
}

export default Header
