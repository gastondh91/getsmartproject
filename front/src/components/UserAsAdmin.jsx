import React from 'react'
import { giveadmAccess, fetchOneUser } from '../redux/action-creators/action-creator'
import { connect } from 'react-redux'
import ModalConfirm from './ModalConfirm'
import { deleteUser } from '../redux/action-creators/user-actions';
import { Redirect } from 'react-router-dom'
import axios from 'axios'



class UserAsAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    }
  }

  componentDidMount() {
    this.props.fetchOneUser(this.props.userId)
  }

  adminTicks = () => {
    if (this.props.usuario.isAdmin) {
      return (<span>
        <strong className='titlesUsers'> Admin:</strong>{this.props.selectedUser.isAdmin ? <img style={{ maxWidth: '8%', marginBottom: '2.8%' }} className="ticks" src='/utils/checked.svg' /> : <img style={{ marginLeft: '2px' , maxWidth: '7%', marginBottom: '0.2rem' }} className="ticks" src='/utils/unchecked.svg' />} <br />
      </span>)
    }
  }

  setAvatar = () => {
    const formData = new FormData();
    formData.append('myImage', this.state.file, this.props.selectedUser.id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    axios.post('/api/imagenes/defRutaUsuarios',{
          email: this.props.selectedUser.email
    })
      .then(() => {
        console.log('hola')
        axios.post("/api/imagenes/upload", formData, config)
          .then(() => location.reload())
          .catch(() => {
            alert('El formato del archivo es incorrecto')
          });
      })

  }


  onImageChange = (e) => {
    this.setState({ file: e.target.files[0] }, this.setAvatar);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.giveadmAccess(this.props.userId)
  }

  adminAvatar = (user) => {

    var resultado

    switch (user.genero) {
      case 'Femenino': if (user.isAdmin) { resultado = 'adminrfemale.svg' } else resultado = 'adminfemale.svg'
        break;
      case 'Masculino': if (user.isAdmin) { resultado = 'adminrmale.svg' } else resultado = 'adminmale.svg'
        break;
    }
    return resultado
  }

  render() {
    if (Object.keys(this.props.selectedUser).length) return (
      this.props.usuario.isAdmin || (this.props.usuario.id == this.props.selectedUser.id) ? <div><form style={{ gridTemplateRows: '1fr 1fr 1fr' }} className='userAsAdm' onSubmit={this.handleSubmit}>
        <h1>{this.props.usuario.isAdmin ? 'Perfil del usuario' : 'Información sobre tu cuenta'}</h1>
        <div className='griduser'>
          <div style={{ float: 'left' }} >
            <img onClick={() => { this.props.selectedUser.id == this.props.usuario.id ? this.refs.fileUploader.click() : null }} title={this.props.selectedUser.id == this.props.usuario.id ? 'Cambiar avatar' : null} style={{ height: '8rem', objectFit: 'cover', cursor: this.props.selectedUser.id == this.props.usuario.id ? 'pointer' : 'auto' }} className='editAvatar' src={this.props.selectedUser.avatar} />
            {this.props.selectedUser.id == this.props.usuario.id && <input onChange={this.onImageChange} type="file" ref="fileUploader" id="FileUpload" style={{ display: 'none' }} />}
          </div>
          <div style={{ float: 'right' }} style={{ marginTop: `${this.props.usuario.isAdmin ? '1%' : '3%'}` }} className='boxUsers editbox'>
            <strong className='titlesUsers'> Nombre:</strong> {this.props.selectedUser.nombre} <br />
            <strong className='titlesUsers'> Apellido:</strong> {this.props.selectedUser.apellido} <br />
            <strong className='titlesUsers'> E-mail:</strong> {this.props.selectedUser.email} <br />
            <strong className='titlesUsers'> Creado:</strong> {this.props.selectedUser.createdAt && this.props.selectedUser.createdAt.slice(8, 10) + '-' + this.props.selectedUser.createdAt.slice(5, 8) + this.props.selectedUser.createdAt.slice(0, 4) + '  -  ' + this.props.selectedUser.createdAt.slice(11, 16)} <br />
            {this.adminTicks()}
          </div>
        </div>
        <div>
          {this.props.usuario.isAdmin && (this.props.selectedUser.id !== this.props.usuario.id) && <span>
            <img className='adminIcons' src={`/utils/${this.adminAvatar(this.props.selectedUser)}`}></img>
            <button
              // style={{ background: '#10ac84', borderColor: '#10ac84' }}
              type='button'
              data-toggle="modal"
              data-target="#simpleModal"
              className='example_c btnUserAdmin'
              id='cartbutton'
              onClick={this.handleSubmit}
            >{this.props.selectedUser.isAdmin ? 'Revocar Administrador' : 'Nombrar Administrador'}
            </button>
          </span>}
          {this.props.usuario.id == this.props.selectedUser.id && <span style={{ marginLeft: '15px' }}>
          <img className='adminIcons' src={`/utils/${this.props.selectedUser.genero == 'Masculino' ? 'editmale.svg' : 'editfemale.svg'}`}></img>
            <button
              type='button'
              onClick={() => this.props.history.push(`/usuarios/edit/${this.props.selectedUser.id}/editdata/${this.props.selectedUser.id}`)}
              className='example_b example_c btnUserAdmin'
              id='cartbutton'
            >
              {`Editar ${this.props.usuario.isAdmin ? 'Usuario' : 'datos'}`}
            </button>
          </span>}
          <span>
          <img style={{marginLeft: `${this.props.selectedUser.id == this.props.usuario.id ? '18px': '10px'}`}}className='adminIcons' src={`/utils/${this.props.selectedUser.genero == 'Masculino' ? 'deletemale.svg' : 'deletefemale.svg'}`}></img>
            <button
              type='button'
              data-toggle="modal"
              data-target="#definiteModal"
              className='example_b example_d btnUserAdmin'
              id='cartbutton'
            >
              {`Eliminar ${this.props.usuario.isAdmin ? 'Usuario' : 'cuenta'}`}
            </button>
          </span>
        </div>

      </form>
        <div>
          <div className="modal fade" id="simpleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div style={{ width: '24rem' }} className="modal-content modalBord2">
                <div className="modal-header borderModal">
                  <h5 className="modal-title" id="exampleModalLabel">{'Permisos de usuario modificados'}</h5>
                </div>
                <div className="modal-body">
                  <p style={{ fontWeight: '600' }}>{`El usuario ${'"'+this.props.selectedUser.Nickname+'"'} ` + `${this.props.selectedUser.isAdmin ? 'ahora solo posee permisos de usuario.' : 'ahora posee permisos de administrador.'}`}</p>
                </div>
                <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
                  <button style={{ textTransform: 'none', background: 'steelblue' }} className="example_b logBut" id='cartbutton' onClick={() => location.reload()} type="button" data-dismiss="modal">Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {console.log('props del comp', this.props)}
          <ModalConfirm
            funcion={this.props.deleteUser}
            encabezado={'¿Eliminar usuario?'}
            encabezadoInfo={'Usuario eliminado'}
            confirmacion={this.props.usuario.isAdmin ? '¿Confirma que desea eliminar' : '¿Estas seguro que deseas eliminar '}
            history={this.props.history}
            historypush={this.props.usuario.isAdmin ? '/usuarios/all' : '/redirect'}
            nombre={this.props.usuario.isAdmin ? '"' + this.props.selectedUser.nombre + ' ' + this.props.selectedUser.apellido + '"' : ''}
            parametro={this.props.selectedUser.id}
            item={this.props.usuario.isAdmin ? 'al usuario' : 'tu cuenta'}
            accion={'Se eliminó'}
          />
        </div>
      </div> : <Redirect to='/unauthorized' />
    )
    else return <div></div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedUser: state.selectedUser,
});

const mapDispatchToProps = (dispatch) => ({
  giveadmAccess: (user) => dispatch((giveadmAccess(user))),
  fetchOneUser: (id) => dispatch(fetchOneUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAsAdmin);