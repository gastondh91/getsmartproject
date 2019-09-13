/* eslint-disable no-unused-vars */
import React from 'react';
import { checkUserLogin } from '../redux/action-creators/action-creator';
import { connect } from 'react-redux';
import store from '../redux/store';
import { withRouter, Link, Redirect } from 'react-router-dom';
import ModalInfo from './ModalInfo'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkedUser: null,
      userGender: ''
    };
  }

  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = this.state;
    this.props.checkUserLogin(user)
      .then((data) => {
        if (data.usuario) {
          this.setState({ checkedUser: data.usuario.nombre });
          this.setState({ userGender: data.usuario.genero })
        }
      })
      .catch(err => { this.setState({ checkedUser: false }) })
      ;
  }

  render() {
    return (
      <div>
        <div className="login-contenedor">
          <div className='FRUsuarios'>
            <form onSubmit={this.handleSubmit} >
              <h1 className="FRUstitle">¡Hola! Por favor ingresa tus datos para contnuar</h1>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">E-mail</label>
                  <input name='email' onChange={this.handleChange} type="text" className="form-control" id="inputEmail4" placeholder="E-mail" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input name='password' onChange={this.handleChange} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                </div>  
              </div>
              <div className="form-row">
              </div>
              <div className="botones">
                <button type="submit" data-toggle="modal" data-target="#infoModal" onSubmit={this.handleSubmit} className="btn btn-primary">Login</button>
                <a className="loginBtn loginBtn--facebook" href='/api/auth/facebook'>
                  Login with Facebook
              </a>

                <a className="loginBtn loginBtn--google" href='/api/auth/google'>
                  Login with Google
              </a>
              </div>
            </form>
          </div>
        </div>
        <div>
          <ModalInfo
            encabezado={this.state.checkedUser ? 'Usuario logueado' : 'Error'}
            accion={this.state.checkedUser ? `Bienvenid${this.state.userGender == 'Masculino' ? 'o' : 'a'} de nuevo, `: 'La combinación de usuario y contraseña son incorrectos'}
            nombre={this.state.checkedUser ? this.state.checkedUser : ''}
            history={this.props.history}
            historypush={this.state.checkedUser ? '/' : '/usuarios/login'}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userCheck: state.userCheck
});
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (user) => dispatch((checkUserLogin(user)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
