/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { setBusqueda } from '../redux/action-creators/action-creator'
import { Redirect } from 'react-router-dom'

const Header = (props) => {

  useEffect(() => {
    { props.location.pathname != '/productos' && cancelCourse() }
  }, [props.location.pathname])

  const handleChange = (e) => {
    props.setBusqueda(e.target.value)
    props.history.push('/productos')
  }

  const cancelCourse = () => {
    document.getElementById("input").value = ''
    props.setBusqueda('')
  }

  return (
    !props.login
      ? <header className='header'>
        <div className='hoverLog' style={{ marginTop: '9.3px' }}>
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
        <Link to='/' id='linkLogo' ><img id='logo' src="/utils/logoBlanco3.jpg"></img></Link>
        <Route render={({ history }) => {
          return (

            <form >
              <input onChange={handleChange} name='modelo' placeholder='  Busca tu producto 🔎' id='input' />
            </form>

          );
        }
        } />
        <Link to='/cart' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>

      </header>
      : <header className='header apart'>
        {console.log(props)}
        <div onClick={() => {
          axios.get('/api/usuarios/logOut')
            .then(data => props.fetchUser(data.data));
          return <Redirect to={location.pathname} />;
        }} className='botonLogout'>
          <img className='logoutIcon' src='/utils/logout.png'>
          </img>
          <div style={{ marginRight: '14px', lineHeight: '15px', marginTop: '3.2px', float: 'right' }}>
            <span htmlFor='logoutIcon'>
              <span className='letraHead' style={{ fontSize: 'small' }}>Cerrar</span>
              <div className='letraHead' style={{ marginLeft: '2.5px', fontSize: 'small' }}>Sesión</div>
            </span>
          </div>
        </div>
        <img style={{ cursor: 'pointer', objectFit: 'cover', width: '4rem', height: '3.9rem', borderRadius: '2rem' }} onClick={() => props.history.push(`/usuarios/edit/${props.usuario.id}`)} src={props.usuario.avatar} title='Perfil' id='avatar' alt="Avatar" className="avatar"></img>
        <Link to='/' id='linkLogo' ><img id='logo' title='Inicio' src="/utils/logoBlanco3.jpg"></img></Link>
        <Route render={({ history }) => {
          return (
            <div>
            <form>
              <input onChange={handleChange} name='modelo' placeholder='  Busca tu producto 🔎' id='input' />
            </form>
            </div>
          );
        }
        } />
        <Link to='/cart' title='Ver carrito' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>
      </header>
  );
};

const mapStateToProps = (state) => ({
  savedBusqueda: state.savedBusqueda
});

const mapDispatchToProps = (dispatch) => ({
  setBusqueda: (busqueda) => dispatch(setBusqueda(busqueda))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);