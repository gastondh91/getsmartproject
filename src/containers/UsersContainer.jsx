/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/action-creators/user-actions';
import ModalConfirm from '../components/ModalConfirm';
import { deleteUser } from '../redux/action-creators/user-actions';
import { Redirect } from 'react-router-dom';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      userShow: false
    };
  }
  componentDidMount() {
    this.props.fetchUsers();
  }

  showUserSettings = (userId)=>{
    this.setState({ userId, userShow: true })
  }

  hideUserSettings = ()=>{
    this.setState({ userShow: false })
  }

  userSettings = (userId) => this.state.userId === userId && this.state.userShow

  render() {
    return (
      this.props.isAdmin ? <div>

        <ModalConfirm
          funcion={this.props.deleteUser}
          parametro={this.state.userId}
          encabezado={'¿Eliminar usuario?'}
          encabezadoInfo={'Usuario eliminado'}
          confirmacion={'¿Confirma que desea eliminar'}
          history={this.props.history}
          historypush={'/usuarios/all'}
          nombre={'"' + this.state.userName + '"'}
          accion={'Se eliminó '}
          item={'el usuario '}
        />
        <div className='usersContainer'>
          <ul className="list-group listedituser">
            <li id='listaUsuarios' className="list-group-item active titleListUsers">Usuarios:</li>
            {this.props.users.sort((a, b) => { return a.id - b.id; }).map((user, index) => {
              return (
                <li id={index} onMouseLeave={()=> this.hideUserSettings()} onMouseEnter={()=> this.showUserSettings(user.id)} style={{ marginBottom: '0px' }} className="list-group-item listItem" key={user.id}>
                  <div className='boxUsers' style={{ lineHeight: '175%' }}>
                    <strong className='titlesUsers'> Nombre:</strong> {user.nombre} <br />
                    <strong className='titlesUsers'> Apellido:</strong> {user.apellido} <br />
                    <strong className='titlesUsers'> E-mail:</strong> {user.email} <br />
                    <strong className='titlesUsers'> Creado:</strong> {user.createdAt.slice(8, 10) + '-' + user.createdAt.slice(5, 8) + user.createdAt.slice(0, 4) + '  -  ' + user.createdAt.slice(11, 16)} <br />
                    <strong className='titlesUsers'> Admin:</strong> {user.isAdmin ? <img style={{ maxWidth: '5%', marginBottom: '1.7%' }} className="ticks" src='/utils/checked.svg' /> : <img style={{ maxWidth: '4.1%', marginBottom: '0.8%' }} className="ticks" src='/utils/unchecked.svg' />} <br />

                  </div>
                  {this.userSettings(user.id) && <div className="containerUser">
                    <Link to={`/usuarios/edit/${user.id}`}><img id='editUser' src={user.genero == 'Femenino' ? "/utils/editfemale.svg" : "/utils/editmale.svg"}
                    ></img></Link>
                    <img data-toggle="modal" data-target="#definiteModal" id='deleteUser' src={user.genero == 'Femenino' ? "/utils/deletefemale.svg" : "/utils/deletemale.svg"} onClick={(e) => {
                      this.setState({ userId: user.id, userName: user.Nickname });
                    }}></img>
                  </div>}
                </li>
              );
            })}
          </ul>
        </div>
      </div> : <Redirect to='/unauthorized' />
    );
  }
}

const mapStateToProps = (state) => (
  {
    users: state.users
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
