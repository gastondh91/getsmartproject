import React from 'react';
import { connect } from 'react-redux';
import NavbarUser from '../components/NavbarUser';
import NavbarAdm from '../components/NavbarAdm';
import { checkUserLogin } from '../redux/action-creators/action-creator';

class NavbarContainer extends React.Component {
  render () {
    return (
      <div>
        { this.props.isAdmin ? <NavbarAdm history={history} location={this.props.location} /> : <NavbarUser history={this.props.history} location={this.props.location} />}
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