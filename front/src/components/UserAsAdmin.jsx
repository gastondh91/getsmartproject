import React from 'react'
import { giveadmAccess, fetchOneUser } from '../redux/action-creators/action-creator'
import { connect } from 'react-redux'
import Noautorizado from '../components/Noautorizado';
import { fetchUsers } from '../redux/action-creators/user-actions';
import ModalUsers from '../components/ModalUsers'


class UserAsAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOneUser(this.props.userId)
    this.props.fetchUsers()
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.giveadmAccess(this.props.userId)
    this.props.selectedUser.isAdmin ? alert('El usuario fue revocado como administrador') : alert('El usuario fue nombrado administrador')
    location.reload()
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

      this.props.isAdmin ? <form style={{ gridTemplateRows: '1fr 1fr 1fr' }} className='userAsAdm' onSubmit={this.handleSubmit}>
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
        <button className='botonesAdm btn btn-success' onSubmit={this.handleSubmit} >{this.props.selectedUser.isAdmin ? 'Revocar Administrador' : 'Hacer Administrador'}</button>
        <img className='adminIcons' src={`/utils/${this.props.selectedUser.genero == 'Masculino' ? 'deletemale.svg' : 'deletefemale.svg'}`}></img>
        <button type='button' data-toggle="modal" data-target="#definiteModal" className='botonesAdm btn btn-danger'>Eliminar Usuario</button>
      </div>
      <ModalUsers
        location={this.props.location}
        history={this.props.history}
        userName={this.props.selectedUser.nombre + ' '+ this.props.selectedUser.apellido }
        users={this.props.users}
        userId={this.props.selectedUser.id} />
    </form>  : <Noautorizado />
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedUser: state.selectedUser,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  giveadmAccess: (user) => dispatch((giveadmAccess(user))),
  fetchOneUser: (id) => dispatch(fetchOneUser(id)),
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAsAdmin);