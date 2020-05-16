/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import FormCreatCat from '../components/FormCreatCat';
import { getAllCat } from '../redux/action-creators/products-actions'
import axios from 'axios';
import ModalInfo from '../components/ModalInfo'
import { Redirect } from 'react-router-dom'


const AdminProd = (props) => {
  var [newCategory, setNewCategory] = useState('')
  var [Active, setActive] = useState(false)
  let [Estado, setEstado] = useState(['Error/Producto creado', 'Razon'])

  useEffect(() => {
    props.getAllCat()
  }, [])

  const handleClick = (id) => {

    axios.post('/api/categorias/borrarcat', {
      id: id
    })
      .then(() => props.getAllCat())

  }

  const toggleClass = (e) => {
    setActive(!Active)
  };

  const handleChange = (e) => {
    if (e.target.name == 'newCategory') setNewCategory(newCategory = e.target.value)
  }

  const cancelCourse = () => {
    document.getElementById("newCategory").reset();
    setNewCategory(newCategory = '')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let catNames = props.allCategories.map(categorias => categorias.name)

    if (catNames.includes(newCategory)) {
      setEstado(Estado = ['Error', 'Ya existe la categoría ' + '\"' + newCategory + '\"']);
    }
    else if (!newCategory) {
      setEstado(Estado = ['Error', 'Debe ingresar una categoria'])
    }
    else {
      axios.post('/api/categorias/add', {
        name: newCategory
      })
        .then(categoria => {
          setEstado(Estado = ['Se creó la categoría ' + '\"' + categoria.data.name + '\"', null]);
        })
        .then(() => props.getAllCat())
    }
    cancelCourse()
  }

  return (
    <div>
      {props.isAdmin ?
        <div>
          <FormCreatCat
            onSubmit={handleSubmit}
            onChange={handleChange}
            Active={Active}
            toggleClass={toggleClass}
            categorias={props.allCategories}
            handleClick={handleClick}
          />
          <div>
            <ModalInfo
              encabezado={Estado[0] == 'Error' ? Estado[0] : 'Categoria creada'}
              accion={Estado[0] == 'Error' ? Estado[1] : Estado[0]}
              history={props.history}
            />
          </div>
        </div>
        : <Redirect to='/unauthorized' />}
    </div >
  );
}

const mapStateToProps = (state) => ({
  allCategories: state.allCategories
});

const mapDispatchToProps = (dispatch) => ({
  getAllCat: () => dispatch(getAllCat())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProd);