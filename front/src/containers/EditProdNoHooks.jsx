/* eslint-disable no-unused-vars */
import React from 'react';
import FormEditProd from '../components/FormEditProd';
import axios from 'axios';

let arrCategorias = []

export default class AdminProd extends React.Component {
  constructor() {
    super();
    this.state = {
      prodAEditar: {},
      categoriasDisponibles: [],
    };
  }


  componentDidMount() {

    axios.get(`/api/productos/${this.props.prodId}`)
      .then(producto => this.setState({ prodAEditar: producto.data }))
    axios.get('/api/categorias/get')
      .then(categorias => this.setState({ categoriasDisponibles: categorias.data }));
  }


  quitarCategorias = (arr, value) => {

    return arr.filter((ele) => {
      return ele != value;
    });
  
  }

  addCat = (cadaCategoria) => {
    cadaCategoria = Number(cadaCategoria)

    if (!(arrCategorias.includes(cadaCategoria))) {
      arrCategorias.push(cadaCategoria)
    }
    else {
      arrCategorias = this.quitarCategorias(arrCategorias, cadaCategoria);
    }
  };

  checkCat(cat) {
    cat = Number(cat)

    if (!(arrCategorias.includes(cat))) {
      arrCategorias.push(cat)

    }
  }

  checked = (prodAEditar, categoria, e) => {

    var cat = prodAEditar.categorias

    for (let i = 0; i < cat.length; i++) {
      if (cat[i].name == categoria.name) {
        this.checkCat(cat[i].id)
        return true
      }
    }
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  }

  handleSubmit = (e, catsFinales) => {
    catsFinales = arrCategorias
    e.preventDefault();
    axios.put(`/api/productos/edit/${this.state.prodAEditar.id}`, {
      marca: this.state.Marca,
      modelo: this.state.Modelo,
      stock: this.state.Stock,
      precio: this.state.Precio,
      imagenes: this.state.Imagen && this.state.Imagen.split(','),
      descripcion: this.state.Descripcion,
      categorias: catsFinales
    })
      .then(() => {
        alert('Se edito el producto ' + this.state.prodAEditar.marca + ' ' + this.state.prodAEditar.modelo);
        this.props.history.push(`/productos/${this.props.prodId}`);
      });
  }

  render() {
    const { prodAEditar, Marca, Modelo } = this.state;
    return (
      <div>
        <FormEditProd
          catDisponibles={this.state.categoriasDisponibles}
          prodAEditar={prodAEditar}
          marca={Marca}
          modelo={Modelo}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          history={this.props.history}
          checked={this.checked}
          arrCategorias={arrCategorias}
          addCat={this.addCat}
        />
      </div>
    );
  }
}