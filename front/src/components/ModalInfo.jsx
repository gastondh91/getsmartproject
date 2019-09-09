import React from 'react'

const ModalInfo = ({ encabezado, item, history, accion, historypush, nombre})=>{


return(

<div className="modal fade"  id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">{encabezado}</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{`${accion} ${ item ? item : ''} ${nombre ? nombre : ''}.`}</p>
    </div>
    <div className="modal-footer">
      <button  onClick={()=> historypush ? history.push(historypush) : null } type="button" className="btn btn-primary" data-dismiss="modal">Aceptar</button>
    </div>
  </div>
</div>
</div>)

}

export default ModalInfo