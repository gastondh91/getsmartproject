/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FormCrearProd from '../components/FormCrearProd';
import axios from 'axios';

const AdminProd = (props) =>{
      var [Marca, setMarca] = useState()
      var [Modelo, setModelo] = useState()
      var [Stock, setStock] = useState()
      var [Precio, setPrecio] = useState()
      var [Imagen, setImagen] = useState()
      var [Categorias, setCategorias] = useState([])
      var [Descripcion, setDescripcion] = useState()

      useEffect(() => {
        axios.get('/api/categorias/get')
          .then(categorias => setCategorias(Categorias = categorias.data))
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
          props.history.push(`/productos/${product.data.id}`);
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