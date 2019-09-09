/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormCrearProd from '../components/FormCrearProd';
import axios from 'axios';
import Noautorizado from '../components/Noautorizado';
import ModalInfo from '../components/ModalInfo'

const AdminProd = (props) =>{
      let [Marca, setMarca] = useState()
      let [Modelo, setModelo] = useState()
      let [Stock, setStock] = useState()
      let [Precio, setPrecio] = useState()
      let [Imagen, setImagen] = useState()
      let [Categorias, setCategorias] = useState([])
      let [Descripcion, setDescripcion] = useState()
      let [Productos, setProductos] = useState([])
      let [Estado , setEstado] = useState(['Error/Producto creado', 'Razon'])
      let [ProductoId , setProductoId] = useState('')

      useEffect(() => {
        axios.get('/api/categorias/get')
          .then(categorias => setCategorias(Categorias = categorias.data))
        axios.get(`/api/productos/`)
          .then(res => setProductos(Productos = res.data));
        },[])
    


   const handleChange = (e) => {
     switch(e.target.name){
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

    const handleSubmit = (e, categorias) => {
      e.preventDefault();
      
      for(let i=0 ; i<Productos.length ; i+=1){
        if(Productos[i].modelo == Modelo) {
          setEstado( Estado = ['Error','Ya existe ese modelo de telefono'] )
          return
        }
      }
      axios.post('/api/productos/add', {
        marca: Marca,
        modelo: Modelo,
        stock: Stock,
        precio: Precio,
        imagenes: Imagen.split(','),
        descripcion: Descripcion,
        categorias
      })
        .then(producto => setProductoId( ProductoId = producto.data.id))
        .then(() => {
        setEstado(Estado = ['Se creo el producto' + ' ' + Marca + ' ' + Modelo,null])
        });
    }

    return (
      <div>
        {props.isAdmin ?
        <div>
        <FormCrearProd
          array={Categorias}
          onSubmit={handleSubmit}
          onChange={handleChange}
          history={props.history}
          />
          <div>
          <ModalInfo
            encabezado={Estado[0] == 'Error' ? Estado[0] : 'Producto creado' }
            accion={Estado[0] == 'Error' ? Estado[1] : Estado[0]}
            history={props.history}
            historypush={Estado[0] != 'Error' ? `/productos/${ProductoId}` : `/productos/add` }
          />
          </div>
          </div>
           : <Noautorizado/>}
      </div>
    );
  }







export default AdminProd