/* eslint-disable no-unused-vars */
import React from 'react'
import EditProd from './EditProd'
import CreateCat from './CreateCat'

// eslint-disable-next-line no-unused-vars
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import Productos from '../components/Productos/Productos'
import CrearProd from './CrearProd'
import HomeRL from './HomeRL'
import Registro from '../components/Registro'
import Login from '../components/Login'
import Home from '../components/Home/Home'
import UserAsAdmin from '../components/UserAsAdmin'
import Header from '../components/Header/Header'
import SingleProd from '../containers/SingleProductCont'
import NavbarContainer from '../containers/NavbarContainer'
import { getUser, checkUserLogin, fetchUser } from '../redux/action-creators/action-creator'
import OrdenesDeCompra from '../components/OrdenesDeCompra'
import OrdenDeCompra from '../components/OrdenDeCompra'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Checkout from '../components/Checkout'
import UserEdit from '../components/UserEdit'
import TarjetaDeCredito from '../components/TarjetaDeCredito'
import Noautorizado from '../components/Noautorizado'
import UsersContainer from './UsersContainer'
import CarritoContainer from './CarritoContainer'
import Subirimg from '../components/Subirimg'

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		this.props.fetchUser()
			.then(() =>
				this.setState({
					loading: false
				}))
	}

	render() {
		return (
			this.state.loading
				? <div>
					<div className='cssload-loader'>
						<div className='cssload-inner cssload-one' />
						<div className='cssload-inner cssload-two' />
						<div className='cssload-inner cssload-three' />
					</div>
					<div style={{ color: '#2B4F81', textAlign: 'center', fontSize: 'xx-large', fontFamily: 'serif' }}>Cargando...</div>
				</div>
				: <div id='main' className='container-fluid'>
					<Route render={({ history, location, match }) => (<Header usuario={this.props.usuario} location={location} match={match} login={this.props.usuario.id} history={history} fetchUser={this.props.fetchUser} />)} />
					<NavbarContainer location={location} history={this.props.history} isAdmin={this.props.usuario.isAdmin} />
					<Switch>
						<Route exact path='/unauthorized' render={() => <Noautorizado usuario={this.props.usuario} />} />
						<Route exact path='/usuarios/edit/:id/editdata/:id' render={({ history, match }) => <UserEdit history={history} userId={match.params.id} usuario={this.props.usuario} />} />
						<Route exact path='/usuarios' render={() => (<HomeRL />)} />
						<Route exact path='/redirect' render={() => (<Redirect to='/' />)} />
						<Route exact path='/subirimagen' render={() => (<Subirimg usuario={this.props.usuario} />)} />
						<Route exact path='/usuarios/all' render={({ history, location }) => (<UsersContainer location={location} isAdmin={this.props.usuario.isAdmin} history={history} />)} />
						<Route exact path='/usuarios/registro' render={({ history }) => (<Registro history={history} />)} />
						<Route exact path='/usuarios/login' render={({ history, location }) => (<Login login={this.props.usuario.id} history={history} location={location} />)} />
						<Route exact path='/' component={Home} />
						<Route exact path='/categorias/adm' render={({ history }) => (<CreateCat isAdmin={this.props.usuario.isAdmin} history={history} />)} />
						<Route exact path='/productos' render={({ location }) => <Productos search={location.search} />} />
						<Route exact path='/usuarios/edit/:id' render={({ history, match, location }) => (<UserAsAdmin usuario={this.props.usuario} location={this.props.location} isAdmin={this.props.usuario.isAdmin} history={history} userId={match.params.id} />)} />
						<Route exact path='/productos/add' render={({ history }) => (<CrearProd isAdmin={this.props.usuario.isAdmin} history={history} />)} />
						<Route exact path='/productos/edit/:id' render={({ match, history }) => (<EditProd isAdmin={this.props.usuario.isAdmin} history={history} prodId={match.params.id} />)} />
						<Route exact path='/productos/:id' render={({ match, history }) => <SingleProd history={history} prodId={match.params.id} isAdmin={this.props.usuario.isAdmin} />} />
						<Route exact path='/pagos' component={Checkout} />
						<Route exact path='/tarjeta' render={({ history }) => <TarjetaDeCredito history={history} />} />
						<Route exact path='/cart' component={CarritoContainer} />
						<Route exact path='/ordenesdecompra' render={({ history }) => <OrdenesDeCompra history={history} />} />
						<Route exact path='/ordenesdecompra/:id' render={({ history, match }) => <OrdenDeCompra ordenId={match.params.id} history={history} />} />
					</Switch>
				</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userCheck: state.userCheck,
	usuario: state.usuario
})
const mapDispatchToProps = (dispatch) => ({
	fetchUser: () => dispatch(fetchUser()),
	checkUser: () => dispatch(checkUserLogin())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
