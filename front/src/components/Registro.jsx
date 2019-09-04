/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../redux/action-creators/action-creator';
import { fetchUsers } from '../redux/action-creators/user-actions';
import { Link } from 'react-router-dom';

class Registro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      apellido: '',
      domicilio: '',
      email: '',
      password: '',
      secondPassword: '',
      isAdmin: false
    };

  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.nombre || !this.state.apellido || !this.state.email || !this.state.domicilio) {
      alert('Debes completar todos los campos')
    } else if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.com') === -1) {
      alert('Formato de E-mail invalido');
    } else if (this.state.password !== this.state.secondPassword) {
      alert('Las contraseñas ingresadas no coinciden');
    } else if (this.state.secondPassword.length < 6) {
      alert('La contraseña debe tener como minimo 6 caracteres')
    } else {
      for (let i = 0; i < this.props.users.length; i += 1) {
        if (this.props.users[i].email === this.state.email) {
          alert('El E-mail ingresado ya se encuentra en uso');
          return;
        }
        if (this.props.users[i].nombre === this.state.nombre && this.props.users[i].apellido === this.state.apellido) {
          alert('La combinacion de nombre y apellido del usuario ya existen en la base de datos')
          return
        }
      }
        this.props.registerUser(this.state);
        return this.props.history.push('/usuarios/login');
      }
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} >
          <div className="registro-contenedor">
            <h3 className="FRUstitle"> Completa tus datos... </h3>
            <div className='FRUsuarios'>
              <div className="form-row">
                <div className="form-group col-md-6">
                  {/* <label htmlFor="inputName">Nombre</label> */}
                  <input name='nombre' onChange={this.handleChange} type="text" className="form-control" placeholder="Nombre" />
                </div>
                <div className="form-group col-md-6">
                  {/* <label htmlFor="email">E-mail</label> */}
                  <input name='email' onChange={this.handleChange} type="text" className="form-control" id="inputEmail4" placeholder="E-mail" />
                </div>
                <div className="form-group col-md-6">
                  {/* <label htmlFor="inputSurname">Apellido</label> */}
                  <input name='apellido' onChange={this.handleChange} type="text" className="form-control" placeholder="Apellido" />
                </div>
                <div className="form-group col-md-6">
                  {/* <label htmlFor="inputAddress">Domicilio</label> */}
                  <input name='domicilio' onChange={this.handleChange} type="text" className="form-control" id="inputAddress" placeholder="Domicilio" />
                </div>
                <div className="form-group col-md-6">
                  {/* <label htmlFor="inputPassword4">Contraseña</label> */}
                  <input name='secondPassword' onChange={this.handleChange} type="password" className="form-control" id="inputPassword5" placeholder="Contraseña" />
                </div>
                <div className="form-group col-md-6">
                  {/* <label htmlFor="inputPassword4">Confirmar contraseña</label> */}
                  <input name='password' onChange={this.handleChange} type="password" className="form-control" id="inputPassword4" placeholder="Confirmar contraseña" />
                </div>
              </div>
              <div className="form-row">
              </div>
              <div className="botones">
                <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit} >Registrarse</button>
                <a className="loginBtn loginBtn--facebook" href='/api/auth/facebook'>
                  Login with Facebook
              </a>

                <a className="loginBtn loginBtn--google" href='/api/auth/google'>
                  Login with Google
              </a>
              </div>
            </div>
          </div>
        </form>);
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users
  });
  const mapDispatchToProps = (dispatch) => ({
    registerUser: (user) => dispatch((registerUser(user))),
    fetchUsers: () => dispatch(fetchUsers())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Registro);
