/* eslint-disable no-unused-vars */
import React from 'react';


const Formulario = ({ prodAEditar, arrCategorias, onChange, addCat, history, checked, onSubmit, title, catDisponibles }) => {


  return (
    <form
      className='formProdAm'
      onSubmit={(e) => onSubmit(e, arrCategorias)} >
      <h1
        style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid black', paddingBottom: '20px' }}>{title} <b>Editar producto: </b> <br /> {prodAEditar.marca}  {prodAEditar.modelo}  </h1>
      <div
        className="row">
        <h3>Marca: </h3>
        {prodAEditar.marca && <div style={{marginTop:'0.8%'}} className="dropdown form-group col-lg-9 " >
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'iPhone'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="iPhone" value="iPhone" />
            <label className="form-check-label" htmlFor="iPhone">iPhone</label>
          </div>
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'Samsung'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Samsung" value="Samsung" />
            <label className="form-check-label" htmlFor="Samsung">Samsung</label>
          </div>
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'Motorola'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Motorola" value="Motorola" />
            <label className="form-check-label" htmlFor="Motorola">Motorola</label>
          </div>
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'Xiaomi'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Xiaomi" value="Xiaomi" />
            <label className="form-check-label" htmlFor="Xiaomi">Xiaomi</label>
          </div>
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'LG'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="LG" value="LG" />
            <label className="form-check-label" htmlFor="LG">LG</label>
          </div>
          <div className="form-check form-check-inline">
            <input defaultChecked={prodAEditar.marca === 'Huawei'} onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Huawei" value="Huawei" />
            <label className="form-check-label" htmlFor="Huawei">Huawei</label>
          </div>
        </div>}

        <div id='modelo' className="form-group col-lg-12">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">Modelo</span>
            </div>
            <input name='Modelo' defaultValue={prodAEditar.modelo} onChange={onChange} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </div>
        </div>
      </div>
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">URL Imagenes</span>
        </div>
        <input onChange={onChange} name="Imagen" defaultValue={prodAEditar.imagenes} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
      </div>
      <h6 style={{ marginTop: '10px' }}>* Separar las URL con coma (',')</h6>

      <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Precio</span>
        </div>
        <input name='Precio' defaultValue={prodAEditar.precio} onChange={onChange} type="text" className="form-control" id="inputAddress" />
      </div>

      <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Unidades</span>
        </div>
        <input name='Stock' onChange={onChange} defaultValue={prodAEditar.stock} type="text" className="form-control" id="inputAddress" />
      </div>

      <div className="form-group selCat">
        <h3 id='modelo' className="form-group"> * Seleccionar Categorias:</h3>
        <div className="form-group"></div>

        {catDisponibles.map((categoria) => (
          <div key={categoria.id} className="form-check form-check-inline">
            <input className="form-check-input" name='categoriesId' type="checkbox" id={categoria.id}
              defaultChecked={
                prodAEditar.categorias && checked(prodAEditar, categoria)}
              value={categoria.id}
              onChange={(e) => addCat(e.target.value)
              } />
            <label className="form-check-label" htmlFor={categoria.id}>{categoria.name}</label>
          </div>
        )
        )}
      </div>
      {prodAEditar.descripcion && <div className="form-group ">
        <label><h3>* Descripcion: </h3>
          <textarea onChange={onChange} defaultValue={prodAEditar.descripcion} placeholder='Agrega una descripcion para el producto' name='Descripcion' rows="5" cols="78" style={{borderRadius: '0.4rem'}}></textarea>
        </label>
      </div>}
      <button onSubmit={(e) => onSubmit(e)} className='btn btn-lg btn-success'>SUBMIT</button>
      <button style={{ marginLeft: '10px' }} onClick={() => history.push(`/productos/${prodAEditar.id}`)} className='btn btn-lg btn-danger'>CANCEL</button>
    </form >
  );
}

export default Formulario;