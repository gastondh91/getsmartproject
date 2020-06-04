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
    !login
      ? (
        <header className="row align-items-center">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 ingreso-registro">
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

            <div className="ml-3">
              <Link to="/"><img className="logo img-responsive" title="Inicio" src="/utils/logoBlanco3.jpg" alt="Logo" /></Link>
            </div>

          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 offset-md-2 busqueda-carrito">

            <div className="col-xs-6 col-sm-6 col-md-10 col-lg-10">


              <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
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
            <Link to="/cart" title="Ver carrito">
              <img className="carrito img-responsive" src="/utils/carrito.svg" alt="Carrito" />
            </Link>
          </div>
        </header>
      )
      : (
        <header className="header row apart">
          <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">

            <span
              role="presentation"
              onClick={async () => {
                await axios.get('/api/usuarios/logOut')
                dispatch(fetchUser())
                history.push(actualLocation)
              }}
              className="botonLogout"
            >
              <img className="logoutIcon" src="/utils/logout.png" alt="Logout" />
              <div className="cerrar-sesion">
                <span htmlFor="logoutIcon">
                  <span className="letraHead" style={{ fontSize: 'small' }}>Cerrar</span>
                  <div className="letraHead" style={{ marginLeft: '2.5px', fontSize: 'small' }}>Sesión</div>
                </span>
              </div>
            </span>
            <span>

              <img
                role="presentation"
                style={{
                  cursor: 'pointer', objectFit: 'cover', width: '4rem', height: '3.9rem', borderRadius: '2rem',
                }}
                onClick={() => history.push(`/usuarios/edit/${usuario.id}`)}
                src={usuario.avatar}
                title="Perfil"
                id="avatar"
                alt="Avatar"
                className="avatar"
              />
            </span>
            <span>

              <Link to="/" id="linkLogo"><img id="logo" title="Inicio" src="/utils/logoBlanco3.jpg" alt="Logo" /></Link>
            </span>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6 col-center">

            <div className="busquedas">

              <input onChange={handleChange} name="modelo" placeholder="  Buscar producto 🔎" id="input" />
            </div>
            <span className="add-carrito">

              <span className="carrito-count">
                {carrito.length}
              </span>
              <FiberManualRecordIcon style={{
                fontSize: '1.8rem', position: 'absolute', left: '1315px', top: '2.6px', color: '#2B4F81',
              }}
              />
              <Link to="/cart" title="Ver carrito" id="linkCart"><img id="carrito" src="/utils/carrito.svg" alt="Carrito" /></Link>
            </span>
          </div>
        </header>
      )
  )
}

export default Header
