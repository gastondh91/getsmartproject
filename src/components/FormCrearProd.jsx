/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'

const categorias = []
const addCat = (cat) => {
  categorias.push(cat)
}
const Formulario = ({
  onChange, onImageChange, onSubmit, title, array, history,
}) => {
  const inputRef = useRef(null)

  return (

    <form className="formProdAm" onSubmit={(e) => onSubmit(e, categorias)}>
      <h1 style={{
        textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid black', paddingBottom: '20px',
      }}
      >
        {title}
        {' '}
        Crear un Nuevo Producto
      </h1>
      <div className="row">
        <h3 style={{ marginLeft: '0.9rem' }}>* Marca: </h3>
        <div style={{ marginTop: '0.8%' }} className="dropdown form-group col-lg-9 ">
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="iPhone">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="iPhone" value="iPhone" />
              iPhone
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="Samsung">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Samsung" value="Samsung" />
              Samsung
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="Motorola">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Motorola" value="Motorola" />
              Motorola
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="Xiaomi">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Xiaomi" value="Xiaomi" />
              Xiaomi
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="LG">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="LG" value="LG" />
              LG
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="Huawei">
              <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Huawei" value="Huawei" />
              Huawei
            </label>
          </div>
        </div>

        <div id="modelo" className="form-group col-lg-12">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">* Modelo</span>
            </div>
            <input name="Modelo" onChange={onChange} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </div>
        </div>

      </div>

      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">* Precio</span>
        </div>
        <input name="Precio" onChange={onChange} type="text" className="form-control" id="inputAddress" />
      </div>

      <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">* Unidades</span>
        </div>
        <input name="Stock" onChange={onChange} type="text" className="form-control" id="inputAddress" />
      </div>
      <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
        <div className="input-group-prepend" />
        <button
          type="button"
          className="example_b btnUserAdmin"
          id="cartbutton"
          onClick={() => inputRef.current.click()}
        >
          {' '}
          Cargar imagenes
        </button>
        <input ref={inputRef} type="file" encType="multipart/form-data" multiple name="myImage" onChange={(e) => onImageChange(e)} style={{ width: '317px', display: 'none' }} />

      </div>
      <div className="form-group selCat">
        <h3 id="modelo" className="form-group"> Seleccionar Categorias:</h3>

        {array.map((categoria) => (
          <div key={categoria.id} className="form-check form-check-inline">
            <input className="form-check-input" name="categoriesId" type="checkbox" id={categoria.id} value={categoria.id} onChange={(e) => addCat(e.target.value)} />
            <label className="form-check-label" htmlFor={categoria.id}>{categoria.name}</label>
          </div>
        ))}
      </div>
      <div className="form-group ">
        <label htmlFor="textarea">
          <h3>* Descripcion: </h3>
          <textarea className="textarea" onChange={onChange} name="Descripcion" placeholder="Agrega una descripcion para el producto" style={{ borderRadius: '0.4rem' }} rows="5" cols="78" />
        </label>
      </div>

      <button type="button" data-toggle="modal" data-target="#infoModal" onSubmit={onSubmit} className="btn btn-lg btn-success">SUBMIT</button>
      <button type="button" style={{ marginLeft: '10px' }} onClick={() => history.push('/')} className="btn btn-lg btn-danger">CANCEL</button>


    </form>

  )
}

export default Formulario
