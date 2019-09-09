/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormEditProd from '../components/FormEditProd';
import axios from 'axios';
import Noautorizado from '../components/Noautorizado';
import ModalInfo from '../components/ModalInfo'

let arrCategorias = []

const AdminProd = (props) => {

  let [prodAEditar, setProdAEditar] = useState({})
  let [categoriasDisponibles, setcategoriasDisponibles] = useState([])
  let [Marca, setMarca] = useState()
  let [Modelo, setModelo] = useState()
  let [Stock, setStock] = useState()
  let [Precio, setPrecio] = useState()
  let [Imagen, setImagen] = useState()
  let [Descripcion, setDescripcion] = useState()
  let [Productos, setProductos] = useState([])
  let [Estado, setEstado] = useState(['Error/Producto creado', 'Razon'])

  useEffect(() => {

    axios.get(`/api/productos/${props.prodId}`)
      .then(producto => setProdAEditar(prodAEditar = producto.data))
    axios.get('/api/categorias/get')
      .then(categorias => setcategoriasDisponibles(categoriasDisponibles = categorias.data));
    axios.get(`/api/productos/`)
      .then(res => setProductos(Productos = res.data));

  }, [])


  const quitarCategorias = (arr, value) => {

    return arr.filter((ele) => {
      return ele != value;
    });

  }
  const addCat = (cadaCategoria) => {
    cadaCategoria = Number(cadaCategoria)

    if (!(arrCategorias.includes(cadaCategoria))) {
      arrCategorias.push(cadaCategoria)
    }
    else {
      arrCategorias = quitarCategorias(arrCategorias, cadaCategoria);
    }
  };

  const checkCat = (cat) => {
    cat = Number(cat)

    if (!(arrCategorias.includes(cat))) {
      arrCategorias.push(cat)

    }
  }

  const checked = (prodAEditar, categoria, e) => {

    var cat = prodAEditar.categorias

    for (let i = 0; i < cat.length; i++) {
      if (cat[i].name == categoria.name) {
        checkCat(cat[i].id)
        return true
      }
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'Marca': setMarca(Marca = e.target.value);
        break;
      case 'Modelo': setModelo(Modelo = e.target.value);
        break;
      case 'Stock': setStock(Stock = e.target.value);
        break;
      case 'Precio': setPrecio(Precio = e.target.value);
        break;
      case 'Imagen': setImagen(Imagen = e.target.value);
        break;
      case 'Descripcion': setDescripcion(Descripcion = e.target.value);
        break;
    }
  }

  const handleSubmit = (e, catsFinales) => {
    e.preventDefault();
    for (let i = 0; i < Productos.length; i += 1) {
      if (Productos[i].modelo == Modelo) {
        setEstado( Estado = ['Error','Ya existe ese modelo de telefono'] )
        return
      }
    }
    catsFinales = arrCategorias
    axios.put(`/api/productos/edit/${prodAEditar.id}`, {
      marca: Marca,
      modelo: Modelo,
      stock: Stock,
      precio: Precio,
      imagenes: Imagen && Imagen.split(','),
      descripcion: Descripcion,
      categorias: catsFinales
    })
      .then(() => {
        setEstado(Estado = ['Se editó el producto' + ' ' + prodAEditar.marca + ' ' + prodAEditar.modelo,null])
      });
  }

  return (
    <div>
      {props.isAdmin ?
        <div>
          <FormEditProd
            catDisponibles={categoriasDisponibles}
            prodAEditar={prodAEditar}
            marca={Marca}
            modelo={Modelo}
            onSubmit={handleSubmit}
            onChange={handleChange}
            history={props.history}
            checked={checked}
            arrCategorias={arrCategorias}
            addCat={addCat}
          />
        <div>
          <ModalInfo
            encabezado={Estado[0] == 'Error' ? Estado[0] : 'Producto editado'}
            accion={Estado[0] == 'Error' ? Estado[1] : Estado[0]}
            history={props.history}
            historypush={Estado[0] != 'Error' ? `/productos/${prodAEditar.id}` : `/productos/edit/${prodAEditar.id}`}
          />
        </div>
        </div>
         : <Noautorizado />}
    </div>
  );
}

export default AdminProd