/* eslint-disable no-unused-vars */
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBusqueda, setCurrentLocation } from '../redux/action-creators/action-creator';
import { Redirect } from 'react-router-dom';
import { fetchCarrito } from '../redux/action-creators/carrito-actions.js';

const Header = (props) => {

  useEffect(() => {
    { props.location.pathname != '/productos' && cancelCourse();
    (props.location.pathname!= '/usuarios/login' && props.location.pathname!= '/unauthorized') && props.setCurrentLocation(props.location.pathname); }
  }, [props.location.pathname]);

  useEffect(()=> {
    props.getCarrito(props.usuario.id)
    .then(()=>     console.log('PROPSSSSSSSSSSSSSs', props));
  },[]);

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
      ? <header className='header row'>
        <div className='hoverLog' style={{ marginTop: '10px' }}>
          <span>
            <Link to='/usuarios/registro' id='linkLogIn'><img id='userLogIn' src="/utils/signupiconlg.gif"></img>
              <span className='caption'>Registrarse</span>
            </Link>
          </span>
        </div>
        <span className='hoverLog'>
          <Link to='/usuarios/login' id='linkLogOut'><img id='userLogOut' src="/utils/log.svg"></img>
            <div className='caption2'>Ingresar</div></Link>
        </span>
        <Link to='/' id='linkLogo' ><img id='logo' title='Inicio' src="/utils/logoBlanco3.jpg"></img></Link>
        <Route render={({ history }) => {
          return (

            <form >
              <input onChange={handleChange} name='modelo' placeholder='  Buscar producto 🔎' id='input' />
            </form>

          );
        }
        } />

        <Link to='/cart' title='Ver carrito' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>

      </header>
      : <header className='header row apart'>
        <div className="col-md-6">

        <span onClick={() => {
          axios.get('/api/usuarios/logOut')
            .then(data => props.fetchUser(data.data));
          return <Redirect to={location.pathname} />;
        }} className='botonLogout'>
          <img className='logoutIcon' src='/utils/logout.png'>
          </img>
          <div class='cerrar-sesion'>
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
        <div className="col-md-6 col-center">

        <div class='busquedas'>

        <Route render={({ history }) => {
          return (
            <form>
              <input onChange={handleChange} name='modelo' placeholder='  Buscar producto 🔎' id='input' />
            </form>
          );
        }
        } />
        </div>
        <span class='add-carrito'>

        <span class='carrito-count'>
          {props.carrito.length}
          </span>
        <FiberManualRecordIcon style={{ fontSize: '1.8rem', position: 'absolute', left: '1315px', top: '2.6px', color: '#2B4F81'
}}/>
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