/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/action-creators/user-actions';
import Noautorizado from '../components/Noautorizado';
import ModalUsers from '../components/ModalUsers'

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
       this.props.isAdmin ? <div>

<ModalUsers 
location={this.props.location}
history={this.props.history}
userName={this.state.userName} 
users={this.props.users} 
userId={this.state.userId} />

        <div className='usersContainer'>
          <ul className="list-group listedituser">
            <li id='listaUsuarios' className="list-group-item active titleListUsers">Usuarios:</li>
            {this.props.users.sort((a, b) => { return a.id - b.id }).map(user => {
              return (
                <li style={{ marginBottom: '0px' }} className="list-group-item listItem" key={user.id}>
                  <div className='boxUsers' style={{ lineHeight: '175%' }}>
                    <strong className='titlesUsers'> Nombre:</strong> {user.nombre} <br />
                    <strong className='titlesUsers'> Apellido:</strong> {user.apellido} <br />
                    <strong className='titlesUsers'> E-mail:</strong> {user.email} <br />
                    <strong className='titlesUsers'> Creado:</strong> {user.createdAt.slice(8, 10) + '-' + user.createdAt.slice(5, 8) + user.createdAt.slice(0, 4) + '  -  ' + user.createdAt.slice(11, 16)} <br />
                    <strong className='titlesUsers'> Admin:</strong> {user.isAdmin ? <img style={{maxWidth:'5%', marginBottom: '1.7%'}} className="ticks" src='/utils/checked.svg' /> : <img style={{maxWidth:'4.1%', marginBottom: '0.8%'}} className="ticks" src='/utils/unchecked.svg' />} <br />

                  </div>
                  <div className="containerTrash">
                  <Link to={`/usuarios/edit/${user.id}`}><img id='editUser' src= { user.genero == 'Masculino' ? "/utils/editmale.svg" : "/utils/editfemale.svg"}
                  // onClick={(e) => this.props.history.push(`/usuarios/edit/${user.id}`)}
                  ></img></Link>
                    <img data-toggle="modal" data-target="#definiteModal" id='deleteUser' src={ user.genero == 'Masculino' ? "/utils/deletemale.svg" : "/utils/deletefemale.svg"} onClick={(e) => {
                      this.setState({ userId: user.id, userName: user.nombre + ' ' + user.apellido });
                      // .then(()=> this.props.fetchUsers())
                    }}></img>
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
      </div> : <Noautorizado/>
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
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
