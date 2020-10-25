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
    <header className="d-flex">
      <div className="container">
        <nav className="login-panel">
          <ol className="nav-list">
            <li>
              <Link to="/usuarios/registro">
                <figure className="nav-imageContainer">
                  <img className="img-registrarse" src="/utils/signupiconlg.gif" alt="Registrarse" />
                </figure>
                <span className="text-registrarse">Registrarse</span>
              </Link>
            </li>
            <li>
              <Link to="/usuarios/login">
                <figure className="nav-imageContainer">
                  <img className="img-ingresar" src="/utils/log.svg" alt="Login" />
                </figure>
                <span className="text-ingresar">Ingresar</span>
              </Link>
            </li>
          </ol>
        </nav>

        <Link class="logoContainer" to="/">
          <figure className="logoImgContainer">
            <img className="logo" title="Inicio" src="/utils/logoBlanco3.jpg" alt="Logo" />
          </figure>
        </Link>


        <form className="search-bar">
          <input
            id="input"
            onChange={handleChange}
            className="form-control form-control-sm"
            type="text"
            placeholder="Buscar productos"
            aria-label="Buscar productos"
          />
          <i className="fas fa-search" aria-hidden="true" />
        </form>
        <Link to="/cart" title="Ver carrito">
          <img style={{ maxWidth: '5%' }} src="/utils/carrito.svg" alt="Carrito" />
        </Link>
      </div>

    </header>
  /* { login ? (

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
              <img className="logout-icon" src="/utils/logout.png" alt="Logout" />
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
        ) : ( } */

  )
}

export default Header
