import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { buscarMarcas } from '../redux/action-creators/products-actions';

class MarkProductsContainer extends Component {
  componentDidMount () {
    this.props.buscarMarcas(this.props.marca);
  }

  componentDidUpdate (prevProps) {
    if (this.props.marca !== prevProps.marca) {
      this.props.buscarMarcas(this.props.marca)
    }
  }

  render() {
    return (
      <div className='row'>
        {this.props.marcas.map(mark => (
          <Link to={`/productos/${mark.id}`} key={mark.id}>
            <div className="mark" >
              <div className="card">
                <img src={`${mark.imagenes[0]}`} className="card-img-top imgproduct" />
                <div className="card-body">
                  <h5 className="card-title"> {mark.marca + ' ' + mark.modelo} </h5>
                  <strong><p className="card-text"> ${mark.precio} </p></strong>
                  <p className="card-text"> {mark.descripcion} </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  marcas: state.marcas
});
const mapDispatchToProps = (dispatch) => ({
  buscarMarcas: (marca) => dispatch(buscarMarcas(marca))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkProductsContainer);
