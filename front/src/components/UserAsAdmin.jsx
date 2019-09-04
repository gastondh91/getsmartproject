import React from 'react'
import { giveadmAccess, fetchOneUser } from '../redux/action-creators/action-creator'
import { connect } from 'react-redux'
import store from '../redux/store'

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
    this.props.selectedUser.isAdmin ? alert('El usuario fue revocado como administrador') : alert('El usuario fue nombrado administrador')
    location.reload()
  }

  render() {
    return (

      <form style={{ gridTemplateRows: '1fr 1fr 1fr'}} className='userAsAdm' onSubmit={this.handleSubmit}>
        <h1>Cambio de perfil de usuario</h1>
        <div className='boxUsers'>
          <strong className='titlesUsers'> Nombre:</strong> {this.props.selectedUser.nombre} <br />
          <strong className='titlesUsers'> Apellido:</strong> {this.props.selectedUser.apellido} <br />
          <strong className='titlesUsers'> E-mail:</strong> {this.props.selectedUser.email} <br />
          <strong className='titlesUsers'> Creado:</strong> {this.props.selectedUser.createdAt && this.props.selectedUser.createdAt.slice(8, 10) + '-' + this.props.selectedUser.createdAt.slice(5, 8) + this.props.selectedUser.createdAt.slice(0, 4) + '  -  ' + this.props.selectedUser.createdAt.slice(11, 16)} <br />
          <strong className='titlesUsers'> Admin?:</strong> {this.props.selectedUser.isAdmin ? <img className="ticks" src='/utils/checked.svg' /> : <img className="ticks" src='/utils/unchecked.svg' />} <br />
        </div>
        <div>
          <img className='adminIcons' src="/utils/user1.svg"></img>
          <button className='botonesAdm btn btn-success' onSubmit={this.handleSubmit} >{this.props.selectedUser.isAdmin ? 'Revocar Administrador' : 'Hacer Administrador'}</button>
          <img className='adminIcons' src="/utils/userdelete.svg"></img>
          <button className='botonesAdm btn btn-danger'>Eliminar Usuario</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedUser: state.selectedUser
});

const mapDispatchToProps = (dispatch) => ({
  giveadmAccess: (user) => dispatch((giveadmAccess(user))),
  fetchOneUser: (id) => dispatch(fetchOneUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAsAdmin);