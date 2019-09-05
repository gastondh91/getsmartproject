/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormCrearProd from '../components/FormCrearProd';
import axios from 'axios';

const AdminProd = (props) =>{
      let [Marca, setMarca] = useState()
      let [Modelo, setModelo] = useState()
      let [Stock, setStock] = useState()
      let [Precio, setPrecio] = useState()
      let [Imagen, setImagen] = useState()
      let [Categorias, setCategorias] = useState([])
      let [Descripcion, setDescripcion] = useState()
      let [Productos, setProductos] = useState([])

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
          alert('Ya existe ese modelo de telefono')
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
        .then(() => {
          alert('Se creo el producto' + ' ' + Marca + ' ' + Modelo)
          props.history.push(`/productos/${Productos.id}`);
        });
    }

    return (
      <div>
        <FormCrearProd
          array={Categorias}
          onSubmit={handleSubmit}
          onChange={handleChange}
          history={props.history}
          />
      </div>
    );
  }







export default AdminProd