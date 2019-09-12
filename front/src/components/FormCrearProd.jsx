/* eslint-disable no-unused-vars */
import React from 'react';
const categorias = [];
const addCat = (cat) => {
  categorias.push(cat);
};
const Formulario = ({ onChange, onImageChange, onSubmit, title, array, history }) => (

  <form className='formProdAm' onSubmit={(e) => onSubmit(e, categorias)} >
    <h1 style={{ textAlign: 'center', marginBottom: '50px', borderBottom: '1px solid black', paddingBottom: '20px' }}>{title} Crear un Nuevo Producto</h1>
    <div className="row">
      <h3 style={{ marginLeft: '0.9rem'}}>* Marca: </h3>
      <div style={{marginTop:'0.8%'}} className="dropdown form-group col-lg-9 " >
        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="iPhone" value="iPhone" />
          <label className="form-check-label" htmlFor="iPhone">iPhone</label>
        </div>

        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Samsung" value="Samsung" />
          <label className="form-check-label" htmlFor="Samsung">Samsung</label>
        </div>

        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Motorola" value="Motorola" />
          <label className="form-check-label" htmlFor="Motorola">Motorola</label>
        </div>
        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Xiaomi" value="Xiaomi" />
          <label className="form-check-label" htmlFor="Xiaomi">Xiaomi</label>
        </div>
        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="LG" value="LG" />
          <label className="form-check-label" htmlFor="LG">LG</label>
        </div>
        <div className="form-check form-check-inline">
          <input onChange={onChange} className="form-check-input" type="radio" name="Marca" id="Huawei" value="Huawei" />
          <label className="form-check-label" htmlFor="Huawei">Huawei</label>
        </div>
      </div>

      <div id='modelo' className="form-group col-lg-12">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">* Modelo</span>
          </div>
          <input name='Modelo' onChange={onChange} type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"  />
        </div>
      </div>

    </div>

    <input type="file" name="myImage" onChange={onImageChange} style={{ width: '317px' }} />


    <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg">* Precio</span>
      </div>
      <input name='Precio' onChange={onChange} type="text" className="form-control" id="inputAddress"  />
    </div>

    <div className="input-group input-group-lg" style={{ margin: '15px 0' }}>
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg">* Unidades</span>
      </div>
      <input name='Stock' onChange={onChange} type="text" className="form-control" id="inputAddress"  />
    </div>

    <div className="form-group selCat">
      <h3 id='modelo' className="form-group"> Seleccionar Categorias:</h3>

      {array.map((categoria) => (
        <div key={categoria.id} className="form-check form-check-inline">
          <input className="form-check-input" name='categoriesId' type="checkbox" id="inlineCheckbox1" value={categoria.id} onChange={(e) => addCat(e.target.value)} />
          <label className="form-check-label" htmlFor="inlineCheckbox1">{categoria.name}</label>
        </div>
      )
      )}
    </div>
    <div className="form-group ">
      <label><h3>* Descripcion: </h3>
        <textarea onChange={onChange} name='Descripcion' placeholder='Agrega una descripcion para el producto' style={{borderRadius: '0.4rem'}} rows="5" cols="78" ></textarea>
      </label>
    </div>

    <button data-toggle="modal" data-target="#infoModal" onSubmit={onSubmit} className='btn btn-lg btn-success'>SUBMIT</button>
    <button style={{ marginLeft: '10px' }} onClick={()=> history.push('/')} className='btn btn-lg btn-danger'>CANCEL</button>


  </form >

);

export default Formulario;
