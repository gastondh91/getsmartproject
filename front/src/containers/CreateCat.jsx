/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import FormCreatCat from '../components/FormCreatCat';
import { getAllCat } from '../redux/action-creators/products-actions'
import axios from 'axios';
import Noautorizado from '../components/Noautorizado';


const AdminProd = (props) => {
  var [newCategory, setNewCategory] = useState('')
  var [Active, setActive] = useState(false)

  useEffect(() => {
    props.getAllCat()
  }, [])

  const handleClick = (id) => {

    axios.post('/api/categorias/borrarcat', {
      id: id
    })
    .then(()=> props.getAllCat())
    
  }

  const toggleClass = (e)=> {
      setActive(!Active)
      console.log(e.target.value)
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
      alert('Ya existe la categoría ' + '\"' + newCategory + '\"');
    }
    else if(!newCategory) { alert('Debe ingresar una categoria')}
    else {
      axios.post('/api/categorias/add', {
        name: newCategory
      })
        .then(categoria => {
          alert('Se creo la categoría ' + '\"' + categoria.data.name + '\"');
        })
        .then(()=>props.getAllCat())
    }
    cancelCourse()
  }

  return (
    <div>
        {props.isAdmin ? <FormCreatCat
        onSubmit={handleSubmit}
        onChange={handleChange}
        Active={Active}
        toggleClass={toggleClass}
        categorias={props.allCategories}
        handleClick={handleClick}
        /> : <Noautorizado/>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  allCategories: state.allCategories
});

const mapDispatchToProps = (dispatch) => ({
  getAllCat: () => dispatch(getAllCat())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProd);