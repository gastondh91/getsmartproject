import React, { useEffect, useState, useRef } from 'react'
import { fetchUsers } from '../redux/action-creators/user-actions';
import { connect } from 'react-redux'
import ModalInfo from './ModalInfo'
import axios from 'axios'


const UserAsAdmin = (props) => {

  const inputRef = useRef(null)
  var [Nombre, setNombre] = useState()
  var [Apellido, setApellido] = useState()
  var [Domicilio, setDomicilio] = useState()
  var [Email, setEmail] = useState()
  var [file, setFile] = useState(null)
  var [Password, setPassword] = useState()
  var [SecondPassword, setSecondPassword] = useState()
  var [Genero, setGenero] = useState()
  var [Estado, setEstado] = useState(['Usuario editado / Error', 'Razon'])


  useEffect(() => {
    props.fetchUsers()
  }, [])

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'nombre': setNombre(Nombre = e.target.value);
        break;
      case 'apellido': setApellido(Apellido = e.target.value);
        break;
      case 'domicilio': setDomicilio(Domicilio = e.target.value);
        break;
      case 'password': setPassword(Password = e.target.value);
        break;
      case 'secondPassword': setSecondPassword(SecondPassword = e.target.value);
        break;
      case 'genero': setGenero(Genero = e.target.value);
        break;
      case 'email': setEmail(Email = e.target.value);
        break;
    }
  }

  const setAvatar = () => {
    const formData = new FormData();
    formData.append('myImage', file, props.usuario.id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    axios.post('/api/imagenes/defRutaUsuarios', {
      email: props.usuario.email
    })
      .then(() => {
        axios.post("/api/imagenes/upload", formData, config)
          .then(() => location.reload())
          .catch(() => {
            alert('El formato del archivo es incorrecto')
          });
      })

  }


  var promise = (e) => {
    return new Promise((resolve, reject) => {
      setFile(file = e.target.files[0])
      resolve('ok')
    })
  }

  const onImageChange = (e) => {
    promise(e)
      .then(() => setAvatar())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Nombre', Nombre)
    if (Nombre == '' || Apellido == '' || Genero == '' || Password == '' || Email == '' || Domicilio == '') {
      setEstado(Estado = ['Error', 'Debes completar todos los campos'])
    } else if (Email && (Email.indexOf('@') === -1 || Email.indexOf('.com') === -1)) {
      setEstado(Estado = ['Error', 'Formato de E-mail invalido'])
    } else if (Password && (Password !== SecondPassword)) {
      setEstado(Estado = ['Error', 'Las contraseñas ingresadas no coinciden'])
    } else if (SecondPassword.length < 6) {
      setEstado(Estado = ['Error', 'La contraseña debe tener como minimo 6 caracteres'])
    } else {

      if (Email) {
        for (let i = 0; i < props.users.length; i += 1) {
          if (props.users[i].email === Email) {
            setEstado(Estado = ['Error', 'El E-mail ingresado ya se encuentra en uso'])
            return;
          }
        }
      }
      axios.put(`/api/usuarios/edit/${props.usuario.id}`, {
        nombre: Nombre,
        apellido: Apellido,
        domicilio: Domicilio,
        genero: Genero,
        password: Password,
        email: Email,
      })
        .then(() => {
          setEstado(Estado[0] = ['Usuario editado', 'Se editó el usuario' + ' ' + props.usuario.nombre + ' ' + props.usuario.apellido])
        });
    }
  }


  return (
    <div><form className='registro-contenedor' onSubmit={handleSubmit} >
      <h1 style={{ textAlign: 'center' }}>{'Editar datos de usuario'}</h1>
      {console.log('Password', Password)}
      {console.log('secondPassword', SecondPassword)}
      {console.log('Email', Email)}
      <div className='griduser'>
        <div >
          <img onClick={() => { props.usuario.id == props.usuario.id ? inputRef.current.click() : null }} title={props.usuario.id == props.usuario.id ? 'Cambiar avatar' : null} style={{ height: '8rem', objectFit: 'cover', cursor: props.usuario.id == props.usuario.id ? 'pointer' : 'auto' }} className='editAvatar avatarInEdit' src={props.usuario.avatar} />
          {props.usuario.id == props.usuario.id && <input onChange={onImageChange} type="file" ref={inputRef} id="FileUpload" style={{ display: 'none' }} />}
          <input onChange={onImageChange} type="file" ref={inputRef} style={{ display: 'none' }} />
        </div>
        <div style={{ marginLeft: '18rem', marginRight: '16rem' }} className="form-check form-check-inline">
          <input defaultChecked={props.usuario.genero == 'Masculino'} id='Masculino' name='genero' onChange={handleChange} type='radio' className="form-check-input" value='Masculino' />
          <label className="form-check-label generoLabel" htmlFor="Masculino">Masculino</label>
          <span className='generoIn'>
            <input id='Femenino' defaultChecked={props.usuario.genero == 'Femenino'} name='genero' onChange={handleChange} type='radio' className="form-check-input" value='Femenino' />
            <label className="form-check-label generoLabel" htmlFor="Femenino">Femenino</label>
          </span>
        </div>
        <div className='FRUsuarios'>
          <div className="form-row">
            <div className="form-group col-md-6">
              {/* <label htmlFor="inputName">Nombre</label> */}
              <input name='nombre' onChange={handleChange} defaultValue={props.usuario.nombre} type="text" className="form-control" placeholder="Nombre" />
            </div>
            <div className="form-group col-md-6">
              {/* <label htmlFor="email">E-mail</label> */}
              <input name='email' onChange={handleChange} defaultValue={props.usuario.email} type="text" className="form-control" id="inputEmail4" placeholder="E-mail" />
            </div>
            <div className="form-group col-md-6">
              {/* <label htmlFor="inputSurname">Apellido</label> */}
              <input name='apellido' onChange={handleChange} defaultValue={props.usuario.apellido} type="text" className="form-control" placeholder="Apellido" />
            </div>
            <div className="form-group col-md-6">
              {/* <label htmlFor="inputAddress">Domicilio</label> */}
              <input name='domicilio' onChange={handleChange} defaultValue={props.usuario.domicilio} type="text" className="form-control" id="inputAddress" placeholder="Domicilio" />
            </div>
            <div className="form-group col-md-6">
              {/* <label htmlFor="inputPassword4">Contraseña</label> */}
              <input name='password' onChange={handleChange} type="password" className="form-control" id="inputPassword5" placeholder="Nueva contraseña" />
            </div>
            <div className="form-group col-md-6">
              {/* <label htmlFor="inputPassword4">Confirmar contraseña</label> */}
              <input name='secondPassword' onChange={handleChange} type="password" className="form-control" id="inputPassword4" placeholder="Confirmar contraseña" />
            </div>
          </div>
        </div>
      </div>
      <button
        type='submit'
        data-toggle="modal"
        onSubmit={handleSubmit}
        data-target="#infoModal"
        id='cardButInEdit'
        className='example_b btnUserAdmin general'
      >Guardar</button>
    </form>
      <ModalInfo
        encabezado={Estado[0]}
        accion={Estado[1]}
        history={props.history}
        historypush={Estado[0] == 'Error' ? `/usuarios/edit/${props.usuario.id}/editdata/${props.usuario.id}` : `/usuarios/edit/${props.usuario.id}`}
      />
    </div>

  )
}

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAsAdmin);