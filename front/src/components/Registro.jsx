/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../redux/action-creators/action-creator';
import { fetchUsers } from '../redux/action-creators/user-actions';
import ModalInfo from './ModalInfo'
import axios from 'axios'

class Registro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      Nickname: '',
      apellido: '',
      domicilio: '',
      email: '',
      password: '',
      secondPassword: '',
      isAdmin: false,
      avatar: null,
      file: null,
      fileName: '',
      genero: '',
      estado: ['Usuario registrado / Error', 'razon']
    };

  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  setAvatar = () => {
    const formData = new FormData();
    formData.append('myImage', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    axios.post("/api/imagenes/tempUpload", formData, config)
      .then(path => this.setState({ fileName: path.data.slice(11) }))
      .catch(() => {
        alert('El formato del archivo es incorrecto')
      });
  }

  onImageChange = (e) => {
    this.setState({ file: e.target.files[0] }, this.setAvatar);
  }


  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.nombre || !this.state.apellido || !this.state.genero || !this.state.email || !this.state.domicilio) {
      this.setState({ estado: ['Error', 'Debes completar todos los campos'] })
    } else if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.com') === -1) {
      this.setState({ estado: ['Error', 'Formato de E-mail invalido'] })
    } else if (this.state.password !== this.state.secondPassword) {
      this.setState({ estado: ['Error', 'Las contraseñas ingresadas no coinciden'] })
    } else if (this.state.secondPassword.length < 6) {
      this.setState({ estado: ['Error', 'La contraseña debe tener como minimo 6 caracteres'] })
    } else {
      for (let i = 0; i < this.props.users.length; i += 1) {
        if (this.props.users[i].email === this.state.email) {
          this.setState({ estado: ['Error', 'El E-mail ingresado ya se encuentra en uso'] })
          return;
        }
      }

      this.NicknamePromise()
        .then(() => {
          this.props.registerUser(this.state)
            .then(() => this.setState({ estado: ['Usuario registrado', null] }))
            .then(() => {
              axios.post('/api/imagenes/defRutaUsuarios', {
                email: this.state.email,
              })
            })
            .then(() => {

              const formData = new FormData();
              formData.append('myImage', this.state.file, this.props.user.id);
              const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                }
              };

              axios.post("/api/imagenes/upload", formData, config)
            }).catch((error) => {
            });
        })

    }
  }

  NicknamePromise = () => {
    return new Promise((resolve, reject) => {
      this.setState({ Nickname: '@' + this.state.email.split('@')[0] })
      resolve('ok')
    })
  }

  format() {
    var archivo = this.state.file.name

    if (archivo.includes('.jpg')) return '.jpg'
    if (archivo.includes('.png')) return '.png'
    if (archivo.includes('.jpeg')) return '.jpeg'
    if (archivo.includes('.gif')) return '.gif'
    if (archivo.includes('.tiff')) return '.tiff'
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} >
            <div className="registro-contenedor">
              <h3 className="FRUstitle"> Completa tus datos... </h3>
              <img title='Subir foto de perfil' style={{ cursor: 'pointer', borderStyle: 'initial', height: '10rem' }} onClick={() => this.refs.fileUploader.click()} className='emptyavatar ' id='avatarVacio' src={!this.state.file ? '/utils/avatar.svg' : this.state.fileName} />
              <input onChange={this.onImageChange} type="file" ref="fileUploader" style={{ display: 'none' }} />
              <div style={{ marginLeft: '18rem', marginRight: '16rem' }} className="form-check form-check-inline">
                <input id='Masculino' name='genero' onChange={this.handleChange} type='radio' className="form-check-input" value='Masculino' />
                <label className="form-check-label generoLabel" htmlFor="Masculino">Masculino</label>
                <span className='generoIn'>
                  <input id='Femenino' name='genero' onChange={this.handleChange} type='radio' className="form-check-input" value='Femenino' />
                  <label className="form-check-label generoLabel" htmlFor="Femenino">Femenino</label>
                </span>
              </div>
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
                  <div className="form-group col-md-6">
                    {/* <label htmlFor="inputPassword4">Confirmar contraseña</label> */}
                  </div>
                </div>
                <div className="form-row">
                </div>
                  <button type="submit" className="example_b general" id='registerButton' data-toggle="modal" data-target="#infoModal" onSubmit={this.handleSubmit} >Registrarse</button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <ModalInfo
            encabezado={this.state.estado[0]}
            accion={this.state.estado[0] == 'Error' ? this.state.estado[1] : 'Usuario registrado exitosamente'}
            history={this.props.history}
            historypush={this.state.estado[0] == 'Error' ? '/usuarios/registro' : '/usuarios/login'}
          />
        </div>
      </div>
    );
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
