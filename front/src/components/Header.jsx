/* eslint-disable no-unused-vars */
import React,{ useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { setBusqueda } from '../redux/action-creators/action-creator'


 const Header = (props) => {

  useEffect(()=>{
    {props.location.pathname != '/productos' && cancelCourse()}
  },[props.location.pathname])

  const handleChange = (e) => {
    props.setBusqueda(e.target.value)
    props.history.push('/productos')
  }

  const cancelCourse = () => {
    document.getElementById("input").value=''
    props.setBusqueda('')
  }

  return (
    !props.login
    ? <header className='header'>
        <div>
          <Link to='/usuarios/registro' id='linkLogIn'><img id='userLogIn' src="/utils/user.svg"></img>
            <span className='caption'>Registrate</span>
          </Link>
        </div>
        <Link to='/usuarios/login' id='linkLogOut'><img id='userLogOut' src="/utils/logout.svg"></img>
          <span className='caption2'>Ingresa</span></Link>
        <Link to='/' id='linkLogo' ><img id='logo' src="/utils/logoBlanco.jpg"></img></Link>
        <Route render={({ history }) => {
          return (
            <form >
              <input onChange={handleChange} name='modelo' placeholder='Busca tu producto 🔎' id='input' />
            </form>
          );
        }
        } />
        <Link to='/cart' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>

      </header>
      : <header className='header'>
        <Link to="/">
          <button className="btn btn-outline-primary"
            onClick={(e) => {
              e.preventDefault();
              axios.get('/api/usuarios/logOut')
              .then(data => props.fetchUser(data.data));
              return props.history.push('/');
            }}>
            LOG OUT
          </button>
        </Link>
        {console.log('Props del header', !!props.usuario)}
        <img style={{ cursor: 'pointer', objectFit: 'cover', width:'4rem', height:'3.9rem', marginLeft:'2rem',borderRadius:'2rem'}} onClick={()=> props.history.push(`/usuarios/edit/${props.usuario.id}`)} src={props.usuario.avatar} id='userLogOut' alt="Avatar" className="avatar"></img>
        <Link to='/' id='linkLogo' ><img id='logo' src="/utils/logoBlanco.jpg"></img></Link>
        <Route render={({ history }) => {
          return (
            <form>
              <input onChange={handleChange} name='modelo' placeholder='  Busca tu producto 🔎' id='input' />
            </form>
          );
        }
        } />
        <Link to='/cart' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>
      </header>
  );
};

const mapStateToProps = (state) => ({
  savedBusqueda : state.savedBusqueda
});

const mapDispatchToProps = (dispatch) => ({
  setBusqueda: (busqueda) => dispatch(setBusqueda(busqueda))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);