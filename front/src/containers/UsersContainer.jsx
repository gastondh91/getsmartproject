/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/action-creators/user-actions';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: ''
    }
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  // componentDidUpdate (prevProps) {
  //   if (prevProps.users.length !== this.props.usershis.length) this.props.fetchUsers();
  // }
  render() {
    return (
      <div>

        <div className="modal fade" id="definiteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">¿Eliminar Usuario?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{`¿Confirma que desea eliminar al usuario "${this.state.userName}" ?`}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.users.length > 1 ? this.props.deleteUser(this.state.userId)
                  .then(location.reload()) : alert('No se puede eliminar el unico usuario existente')}>Si</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>

        <div className='usersContainer'>
          <ul className="list-group">
            <li id='listaUsuarios' className="list-group-item active titleListUsers">Usuarios:</li>
            {this.props.users.sort((a, b) => { return a.id - b.id }).map(user => {
              return (
                <li style={{ marginBottom: '0px' }} className="list-group-item listItem" key={user.id}>
                  <div className='boxUsers' style={{ lineHeight: '175%' }}>
                    <strong className='titlesUsers'> Nombre:</strong> {user.nombre} <br />
                    <strong className='titlesUsers'> Apellido:</strong> {user.apellido} <br />
                    <strong className='titlesUsers'> E-mail:</strong> {user.email} <br />
                    <strong className='titlesUsers'> Creado:</strong> {user.createdAt.slice(8, 10) + '-' + user.createdAt.slice(5, 8) + user.createdAt.slice(0, 4) + '  -  ' + user.createdAt.slice(11, 16)} <br />
                    <strong className='titlesUsers'> Admin?:</strong> {user.isAdmin ? <img style={{maxWidth:'4%', marginBottom: '2.2%'}} className="ticks" src='/utils/checked.svg' /> : <img style={{maxWidth:'4%', marginBottom: '2.2%'}} className="ticks" src='/utils/unchecked.svg' />} <br />

                  </div>
                  <div className="containerTrash">
                  <Link to={`/usuarios/edit/${user.id}`}><img id='editUser' src="/utils/edit.svg"
                  // onClick={(e) => this.props.history.push(`/usuarios/edit/${user.id}`)}
                  ></img></Link>
                    <img data-toggle="modal" data-target="#definiteModal" id='trashUser' src="/utils/garbage.svg" onClick={(e) => {
                      this.setState({ userId: user.id, userName: user.nombre + ' ' + user.apellido });
                      // .then(()=> this.props.fetchUsers())
                    }}></img>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
};

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
