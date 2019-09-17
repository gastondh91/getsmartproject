/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormEditProd from '../components/FormEditProd';
import axios from 'axios';
import ModalInfo from '../components/ModalInfo'
import { Redirect } from 'react-router-dom'

let arrCategorias = []

const AdminProd = (props) => {

  let [prodAEditar, setProdAEditar] = useState({})
  let [categoriasDisponibles, setcategoriasDisponibles] = useState([])
  let [Marca, setMarca] = useState()
  let [Modelo, setModelo] = useState()
  let [Stock, setStock] = useState()
  var [files, setFiles] = useState(null)
  let [Precio, setPrecio] = useState()
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


  const onImageChange = (e) => {
    setFiles(files = e.target.files);
  }

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
      case 'Descripcion': setDescripcion(Descripcion = e.target.value);
        break;
    }
  }

  const handleSubmit = (e, catsFinales) => {
    e.preventDefault();
    if ( Marca == '' || Modelo == '' || Precio == '' || Stock == '' || Descripcion == '') {
      setEstado(Estado = ['Error', 'Debes completar los campos obligatorios (*)'])
      return
    }

    for (let i = 0; i < Productos.length; i += 1) {
      if (Productos[i].modelo == Modelo) {
        setEstado(Estado = ['Error', 'Ya existe ese modelo de telefono'])
        return
      }
    }
    catsFinales = arrCategorias
    axios.put(`/api/usuarios/edit/${userId}`, {
      marca: Marca,
      modelo: Modelo,
      stock: Stock,
      precio: Precio,
      descripcion: Descripcion,
      categorias: catsFinales
    })
      .then(() => {
        axios.post('/api/imagenes/defRuta', {
          marca: prodAEditar.marca,
          modelo: prodAEditar.modelo,
          producto: prodAEditar.id
        })
      })
      .then(() => {
        if (files) {
          const formData = new FormData();
          for (var x = 0; x < files.length; x++) {
            formData.append('myImage', files[x], prodAEditar.id)
          }
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            }
          };
          axios.post("/api/imagenes/prodImage", formData, config)
        }
      })

      .then(() => {
        setEstado(Estado = ['Se editó el producto' + ' ' + prodAEditar.marca + ' ' + prodAEditar.modelo, null])
      });
  }

  return (
    <div>
      {props.isAdmin ?
        <div>
          <FormEditProd
            onImageChange={onImageChange}
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
        : <Redirect to='/unauthorized' />}
    </div>
  );
}

export default AdminProd