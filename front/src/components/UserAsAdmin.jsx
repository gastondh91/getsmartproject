import React from 'react'
import { giveadmAccess, fetchOneUser } from '../redux/action-creators/action-creator'
import { connect } from 'react-redux'
import Noautorizado from '../components/Noautorizado';
import ModalConfirm from './ModalConfirm'
import { deleteUser } from '../redux/action-creators/user-actions';



class UserAsAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOneUser(this.props.userId)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.giveadmAccess(this.props.userId)
  }

  adminAvatar = (user) => {

    // console.log(user)
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
    return (

      this.props.isAdmin ? <div><form style={{ gridTemplateRows: '1fr 1fr 1fr' }} className='userAsAdm' onSubmit={this.handleSubmit}>
        <h1>Cambio de perfil de usuario</h1>
        <div className='griduser'>
          <div style={{ float: 'left' }} >
            <img className='editAvatar' src='https://i.ibb.co/cLFHB7d/Whats-App-Image-2019-05-16-at-13-30-39.jpg' />
          </div>
          <div style={{ float: 'right' }} className='boxUsers editbox'>
            <strong className='titlesUsers'> Nombre:</strong> {this.props.selectedUser.nombre} <br />
            <strong className='titlesUsers'> Apellido:</strong> {this.props.selectedUser.apellido} <br />
            <strong className='titlesUsers'> E-mail:</strong> {this.props.selectedUser.email} <br />
            <strong className='titlesUsers'> Creado:</strong> {this.props.selectedUser.createdAt && this.props.selectedUser.createdAt.slice(8, 10) + '-' + this.props.selectedUser.createdAt.slice(5, 8) + this.props.selectedUser.createdAt.slice(0, 4) + '  -  ' + this.props.selectedUser.createdAt.slice(11, 16)} <br />
            <strong className='titlesUsers'> Admin:</strong> {this.props.selectedUser.isAdmin ? <img style={{ maxWidth: '8%', marginBottom: '2.8%' }} className="ticks" src='/utils/checked.svg' /> : <img style={{ maxWidth: '7%', marginBottom: '0.2rem' }} className="ticks" src='/utils/unchecked.svg' />} <br />
          </div>
        </div>
        <div>
          <img className='adminIcons' src={`/utils/${this.adminAvatar(this.props.selectedUser)}`}></img>
          <button type='button' data-toggle="modal" data-target="#simpleModal" className='botonesAdm btn btn-success' onClick={this.handleSubmit} >{this.props.selectedUser.isAdmin ? 'Revocar Administrador' : 'Hacer Administrador'}</button>
          <img className='adminIcons' src={`/utils/${this.props.selectedUser.genero == 'Masculino' ? 'deletemale.svg' : 'deletefemale.svg'}`}></img>
          <button type='button' data-toggle="modal" data-target="#definiteModal" className='botonesAdm btn btn-danger'>Eliminar Usuario</button>
        </div>

      </form>
        <div>
          <div className="modal fade" id="simpleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{'Permisos de usuario modificados'}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{this.props.selectedUser.isAdmin ? 'El usuario fue revocado como administrador' : 'El usuario fue nombrado administrador'}</p>
                </div>
                <div className="modal-footer">
                  <button onClick={()=> location.reload()} type="button" className="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ModalConfirm
            funcion={this.props.deleteUser}
            encabezado={'¿Eliminar usuario?'}
            encabezadoInfo={'Usuario eliminado'}
            confirmacion={'¿Confirma que desea eliminar'}
            history={this.props.history}
            historypush={'/usuarios/all'}
            nombre={'"' + this.props.selectedUser.nombre + ' ' + this.props.selectedUser.apellido + '"'}
            parametro={this.props.selectedUser.id}
            item={'al usuario'}
            accion={'Se eliminó'}
          />
        </div>
      </div> : <Noautorizado />

    )
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