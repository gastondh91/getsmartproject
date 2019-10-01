/* eslint-disable no-unused-vars */
import React from 'react';
import { checkUserLogin } from '../redux/action-creators/action-creator';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import ModalInfo from './ModalInfo'
import axios from 'axios'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkedUser: null,
      userGender: '',
      sessionCount:'',
      isOpen: false
    };
  }

setSessionUpdate = ()=>{
  axios.post(`/api/usuarios/updSessionCount/${this.state.userId}`)
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
          this.setState({ userId: data.usuario.id });
          this.setState({ sessionCount: data.usuario.sessionCount }, this.setSessionUpdate)
        }
      })
      .catch(err => { this.setState({ checkedUser: false }) })
  }

  render() {
    return (
      <div>
        <div className="login-contenedor">
          <div className='FRUsuarios'>
            <form onSubmit={this.handleSubmit} >
              <h1 className="FRUstitle">¡Hola! Por favor ingresa tus datos para contnuar</h1>
              <div className="form-row">
                <div style={{marginLeft: '1.7rem'}} className="form-group col-md-5">
                  <label htmlFor="email">E-mail</label>
                  <input name='email' onChange={this.handleChange} type="text" className="form-control contain" id="inputEmail4" placeholder="E-mail" />
                </div>
                <div style={{marginLeft:'1.7rem'}} className="form-group col-md-5">
                  <label htmlFor="inputPassword4">Password</label>
                  <input name='password' onChange={this.handleChange} type="password" className="form-control contain" id="inputPassword4" placeholder="Password" />
                </div>
              </div>
              <div className="form-row">
              </div>
              <div className="botones">
                <button style={{marginTop: '1px',padding: '8.4px', width: '5rem', textTransform:'none'}}type="submit" data-toggle="modal" data-target="#infoModal" onSubmit={this.handleSubmit} className="example_b general">Login</button>
                <a  className='faceLog' style={{cursor: 'pointer'}} href='http://localhost:8080/api/usuarios/auth/facebook'></a>
                <a className= "googlesign" data-width="300" data-height="200" data-longtitle="true" href='http://localhost:8080/api/usuarios/auth/google'>
                  Login with Google
              </a>
              </div>
            </form>
          </div>
        </div>
        <div>

          <ModalInfo
            show={this.state.isOpen}
            encabezado={this.state.checkedUser ? 'Usuario logueado' : 'Error'}
            accion={this.state.checkedUser ? `Bienvenid${this.state.userGender == 'Masculino' ? 'o' : 'a'} ${this.state.sessionCount != 0 ? 'de nuevo': 'a GetSmart'}, ` : 'La combinación de usuario y contraseña son incorrectos'}
            nombre={this.state.checkedUser ? this.state.checkedUser : ''}
            history={this.props.history}
            location={this.props.location}
            historypush={this.state.checkedUser ? this.props.currentLocation : '/usuarios/login'}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userCheck: state.userCheck,
  currentLocation: state.currentLocation
});
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (user) => dispatch((checkUserLogin(user)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
