/* eslint-disable no-unused-vars */
import React from 'react';
import EditProd from './EditProd';
import CreateCat from './CreateCat';

// eslint-disable-next-line no-unused-vars
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import ProductsContainer from './ProductsContainer';
import CrearProd from './CrearProd';
import HomeRL from './HomeRL';
import MarkProductsContainer from './MarkProductsContainer';
import Registro from '../components/Registro';
import Login from '../components/Login';
import Home from '../components/Home';
import UserAsAdmin from '../components/UserAsAdmin';
import Header from '../components/Header';
import SingleProd from '../containers/SingleProductCont';
import NavbarContainer from '../containers/NavbarContainer';
import { getUser, checkUserLogin, fetchUser } from '../redux/action-creators/action-creator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Checkout from '../components/Checkout';
import TarjetaDeCredito from '../components/TarjetaDeCredito';
import Noautorizado from '../components/Noautorizado';
import UsersContainer from './UsersContainer';
import CarritoContainer from './CarritoContainer';
import Subirimg from '../components/Subirimg'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.fetchUser()
      .then(() =>
        this.setState({
          loading: false
        }));
  }

  render() {
    return (
      this.state.loading ? <div><div className="cssload-loader">
        <div className="cssload-inner cssload-one"></div>
        <div className="cssload-inner cssload-two"></div>
        <div className="cssload-inner cssload-three"></div>
      </div>
        <div style={{ color: '#192a56', textAlign: 'center', fontSize: 'xx-large', fontFamily: 'serif' }}>Loading...</div></div>
        : <div id='main' className='container-fluid'>
          <Route render={({ history, location, match }) => (<Header usuario={this.props.usuario} location={location} match={match} login={this.props.usuario.id} history={history} fetchUser={this.props.fetchUser} />)} />
          <NavbarContainer location={location} history={history} isAdmin={this.props.usuario.isAdmin} />
          <Switch>
            <Route exact path='/unauthorized' render={() => < Noautorizado usuario={this.props.usuario} />} />
            <Route exact path="/usuarios" render={() => (<HomeRL />)} />
            <Route exact path="/redirect" render={() => (<Redirect to='/' />)} />
            <Route exact path="/subirimagen" render={() => (<Subirimg usuario={this.props.usuario} />)} />
            <Route exact path="/usuarios/all" render={({ history,location }) => (<UsersContainer location={location} isAdmin={this.props.usuario.isAdmin} history={history} />)} />
            <Route exact path="/usuarios/registro" render={({ history }) => (<Registro history={history} />)} />
            <Route exact path="/usuarios/login" render={({ history, location }) => (<Login login={this.props.usuario.id} history={history} location={location} />)} />
            <Route exact path='/' component={Home} />
            <Route exact path='/categorias/adm' render={({ history }) => (<CreateCat isAdmin={this.props.usuario.isAdmin} history={history} />)} />
            <Route exact path='/categorias/marcas/:marca' render={({ match }) => <MarkProductsContainer marca={match.params.marca} />} />
            <Route exact path='/productos' render={({ location }) => <ProductsContainer search={location.search} />} />
            <Route exact path='/usuarios/edit/:id' render={({ history, match, location }) => (<UserAsAdmin usuario={this.props.usuario} location={this.props.location} isAdmin={this.props.usuario.isAdmin} history={history} userId={match.params.id} />)} />
            <Route exact path='/productos/add' render={({ history }) => (<CrearProd isAdmin={this.props.usuario.isAdmin} history={history} />)} />
            <Route exact path='/productos/edit/:id' render={({ match, history }) => (<EditProd  isAdmin={this.props.usuario.isAdmin} history={history} prodId={match.params.id} />)} />
            <Route exact path="/productos/:id" render={({ match, history }) => <SingleProd history={history} prodId={match.params.id} isAdmin={this.props.usuario.isAdmin} />} />
            <Route exact path="/pagos/" component={Checkout} />} />
            <Route exact path='/tarjeta' component={TarjetaDeCredito} />
            <Route exact path='/cart' component={CarritoContainer} />
          </Switch>
        </div >
    );
  }
};

const mapStateToProps = (state) => ({
  userCheck: state.userCheck,
  usuario: state.usuario
});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  checkUser: () => dispatch(checkUserLogin())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
