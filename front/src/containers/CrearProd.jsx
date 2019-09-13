/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormCrearProd from '../components/FormCrearProd';
import axios from 'axios';
import ModalInfo from '../components/ModalInfo'
import { Redirect } from 'react-router-dom'

const AdminProd = (props) => {
  let [Marca, setMarca] = useState()
  let [Modelo, setModelo] = useState()
  let [Stock, setStock] = useState()
  let [Precio, setPrecio] = useState()
  var [files, setFiles] = useState(null)
  let [Categorias, setCategorias] = useState([])
  let [Descripcion, setDescripcion] = useState()
  let [Productos, setProductos] = useState([])
  let [Estado, setEstado] = useState(['Error/Producto creado', 'Razon'])
  let [Producto, setProducto] = useState()
  let [ProductoId, setProductoId] = useState(null)


  useEffect(() => {
    axios.get('/api/categorias/get')
      .then(categorias => setCategorias(Categorias = categorias.data))
    axios.get(`/api/productos/`)
      .then(res => setProductos(Productos = res.data));
  }, [])



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

  const onImageChange = (e) => {
    setFiles(files = e.target.files);
  }

  const handleSubmit = (e, categorias) => {
    e.preventDefault();
    if (!Marca || !Modelo || !Precio || !Stock || !Descripcion) {
      setEstado(Estado = ['Error', 'Debes completar los campos obligatorios (*)'])
      return
    }

    for (let i = 0; i < Productos.length; i += 1) {
      if (Productos[i].modelo == Modelo) {
        setEstado(Estado = ['Error', 'Ya existe ese modelo de telefono'])
        return
      }
    }
    axios.post('/api/productos/add', {
      marca: Marca,
      modelo: Modelo,
      stock: Stock,
      precio: Precio,
      imagenes: null,
      descripcion: Descripcion,
      categorias
    })
      .then(producto => {
        setProducto(Producto = producto.data)
        setProductoId(ProductoId = producto.data.id)
      })
      .then(() => {
        axios.post('/api/imagenes/defRuta', {
          marca: Producto.marca,
          modelo: Producto.modelo,
          producto: Producto.id
        })
      })
      .then(() => {

        const formData = new FormData();
        for(var x = 0; x<files.length; x++) {
          formData.append('myImage', files[x], ProductoId)
        }
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          }
        };
        axios.post("/api/imagenes/prodImage", formData, config)
      })
      .then(() => {
        setEstado(Estado = ['Se creo el producto' + ' ' + Marca + ' ' + Modelo, null])
      });
  }

  return (
    <div>
      {props.isAdmin ?
        <div>
          <FormCrearProd
            onImageChange={onImageChange}
            array={Categorias}
            onSubmit={handleSubmit}
            onChange={handleChange}
            history={props.history}
          />
          <div>
            <ModalInfo
              encabezado={Estado[0] == 'Error' ? Estado[0] : 'Producto creado'}
              accion={Estado[0] == 'Error' ? Estado[1] : Estado[0]}
              history={props.history}
              historypush={Estado[0] != 'Error' ? `/productos/${ProductoId}` : `/productos/add`}
            />
          </div>
        </div>
        : <Redirect to='/unauthorized' />}
    </div>
  );
}







export default AdminProd