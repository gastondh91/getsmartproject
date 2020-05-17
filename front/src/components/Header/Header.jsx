/* eslint-disable no-unused-vars */
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBusqueda, setCurrentLocation } from '../../redux/action-creators/action-creator';
import { Redirect } from 'react-router-dom';
import { fetchCarrito } from '../../redux/action-creators/carrito-actions.js';
import style from './HeaderStyles.css'

const Header = (props) => {

  useEffect(() => {
    {
      props.location.pathname != '/productos' && cancelCourse();
      (props.location.pathname != '/usuarios/login' && props.location.pathname != '/unauthorized') && props.setCurrentLocation(props.location.pathname);
    }
  }, [props.location.pathname]);

  useEffect(() => {
    props.usuario && props.getCarrito(props.usuario.id)
  }, []);

  const handleChange = (e) => {
    props.setBusqueda(e.target.value);
    props.history.push('/productos');
  };

  const cancelCourse = () => {
    document.getElementById("input").value = '';
    props.setBusqueda('');
  };

  return (
    !props.login
      ? <header className='row align-items-center'>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 header-col">
          <div className="col-4 ingreso-registro">

            <div>
              <Link to='/usuarios/registro'>
                <div>
                  <img className='registro img-responsive' src="/utils/signupiconlg.gif" />
                </div>
                <span className='registrarse'>Registrarse</span>
              </Link>
            </div>
            <div>
              <Link to='/usuarios/login'>
                <div className='text-center'>
                  <img className='ingreso img-responsive' src="/utils/log.svg" />
                </div>
                <span className='ingresar'>Ingresar</span></Link>
            </div>
            <div>
            </div>

            <Link to='/' ><img className='logo img-responsive' title='Inicio' src="/utils/logoBlanco3.jpg" /></Link>
          </div>
          <div className='col-4' />
          <div className="col-4 busqueda-carrito">

            <div>

              <Route render={({ history }) => {
                return (

                  <input onChange={handleChange} className='busqueda' name='modelo' placeholder='  Buscar producto 🔎' id='input' />

                );
              }
              } />

            </div>
            <Link to='/cart' title='Ver carrito'>
              <img className='carrito img-responsive' src="/utils/carrito.svg" />
            </Link>
          </div>
        </div>

      </header >
      : <header className='header row apart'>
        <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">

          <span onClick={() => {
            axios.get('/api/usuarios/logOut')
              .then(data => props.fetchUser(data.data));
            return <Redirect to={location.pathname} />;
          }} className='botonLogout'>
            <img className='logoutIcon' src='/utils/logout.png'>
            </img>
            <div className='cerrar-sesion'>
              <span htmlFor='logoutIcon'>
                <span className='letraHead' style={{ fontSize: 'small' }}>Cerrar</span>
                <div className='letraHead' style={{ marginLeft: '2.5px', fontSize: 'small' }}>Sesión</div>
              </span>
            </div>
          </span>
          <span>

            <img style={{ cursor: 'pointer', objectFit: 'cover', width: '4rem', height: '3.9rem', borderRadius: '2rem' }} onClick={() => props.history.push(`/usuarios/edit/${props.usuario.id}`)} src={props.usuario.avatar} title='Perfil' id='avatar' alt="Avatar" className="avatar"></img>
          </span>
          <span>

            <Link to='/' id='linkLogo' ><img id='logo' title='Inicio' src="/utils/logoBlanco3.jpg"></img></Link>
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6 col-center">

          <div className='busquedas'>

            <Route render={({ history }) => {
              return (
                <input onChange={handleChange} name='modelo' placeholder='  Buscar producto 🔎' id='input' />
              );
            }
            } />
          </div>
          <span className='add-carrito'>

            <span className='carrito-count'>
              {props.carrito.length}
            </span>
            <FiberManualRecordIcon style={{
              fontSize: '1.8rem', position: 'absolute', left: '1315px', top: '2.6px', color: '#2B4F81'
            }} />
            <Link to='/cart' title='Ver carrito' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>
          </span>
        </div>
      </header>
  );
};

const mapStateToProps = (state) => ({
  savedBusqueda: state.savedBusqueda,
  carrito: state.carrito
});

const mapDispatchToProps = (dispatch) => ({
  setBusqueda: (busqueda) => dispatch(setBusqueda(busqueda)),
  setCurrentLocation: (currentLocation) => dispatch(setCurrentLocation(currentLocation)),
  getCarrito: (id) => dispatch(fetchCarrito(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);