import React from 'react';
import { connect } from 'react-redux';
import NavbarUser from '../components/NavbarUser';
import NavbarAdm from '../components/NavbarAdm';
import axios from 'axios';
import { checkUserLogin } from '../redux/action-creators/action-creator';

class NavbarContainer extends React.Component {
  render () {
    return (
      <div>
        { this.props.isAdmin ? <NavbarAdm /> : <NavbarUser />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userCheck: state.userCheck
});
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (user) => dispatch((checkUserLogin(user)))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);