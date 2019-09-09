/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Formulario = ({ onChange, onSubmit, title, handleClick, Active, categorias }) => {

  var [categoria, setCategoria] = useState({ nombre: '', id: '' })

  return (
    <div>
      {/* Modal */}
      <div className="modal fade" id="definiteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Eliminar Categoria</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`¿Confirma que desea eliminar la categoria "${categoria.nombre}" ?`}</p>
            </div>
            <div className="modal-footer">
              <button data-toggle="modal" data-target="#simpleModal" type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleClick(categoria.id)}>Si</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="simpleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{'Categoría eliminada'}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`Se eliminó la categoría "${categoria.nombre}"`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

      {/*Modal */}

      <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Categoría creada</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`Se creó la categoría`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" >Aceptar</button>
            </div>
          </div>
        </div>
      </div>


      <div className='formProdAm' id='showCat'>
        <h1 style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid black', paddingBottom: '20px' }}>{title} Categorías: </h1>
        {categorias.map((categoria) => (
          <div key={categoria.id} style={{ cursor: 'pointer' }} className="list-group">
            <button id='eliminar' data-toggle="modal" data-target="#definiteModal" type="button" value={categoria.id}
              onClick={(e) => {
                setCategoria(categoria = { nombre: categoria.name, id: categoria.id });
              }}
              className={Active ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
              {categoria.name}</button>
          </div>
        ))}
      </div>
      <form id='newCategory' className='formProdAm' onSubmit={onSubmit} >
        <h1 style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid black', paddingBottom: '20px' }}>{title} Crear Categoría: </h1>
        <div className="row">
          <div id='modelo' className="form-group col-lg-12">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Nueva Categoría :</span>
              </div>
              <input name='newCategory' onChange={onChange} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </div>
          </div>
        </div>
        <div className="form-group ">
        </div>
        <button style={{ marginLeft: '44%' }} data-toggle="modal" data-target="#infoModal" onSubmit={onSubmit} className='btn btn-lg btn-success btn-cat'>SUBMIT</button>
      </form >
    </div>
  )
}

export default Formulario
  ;
