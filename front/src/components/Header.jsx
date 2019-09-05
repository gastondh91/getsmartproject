/* eslint-disable no-unused-vars */
import React,{ useState} from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

export default (props) => {

  let [Busqueda, setBusqueda] = useState('')

  const handleSubmit = (e, red) => {
    e.preventDefault();
    // red.push(`/productos?modelo=${e.target.input.value}`);
  };

  const handleChange = (e) => {
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
            <form method='GET' onSubmit={(e) => handleSubmit(e, history)}>
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
        <Link to='/' id='linkLogOut'><img id='userLogOut' src="/utils/logout.svg"></img></Link>
        <Link to='/' id='linkLogo' ><img id='logo' src="/utils/logoBlanco.jpg"></img></Link>
        <Route render={({ history }) => {
          return (
            <form method='GET' onSubmit={(e) => handleSubmit(e, history)}>
              <input name='modelo' placeholder='  Busca tu producto 🔎' id='input' />
            </form>
          );
        }
        } />
        <Link to='/cart' id='linkCart'><img id='carrito' src="/utils/carrito.svg"></img></Link>

      </header>
  );
};
