import React from 'react'
import ModalInfo from './ModalInfo'


const ModalConfirm = ({encabezado, confirmacion, encabezadoInfo, accion, parametro, funcion, history,historypush, nombre, item }) => {


  return (

    <div>
      <div className="modal fade" id="definiteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{encabezado}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`${confirmacion} ${item ? item : ''} ${nombre ? nombre : ''}?`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" data-toggle="modal" data-target="#infoModal" className="btn btn-primary" data-dismiss="modal" onClick={()=> funcion(parametro)} >Si</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
      <div>      
        <ModalInfo
        encabezado={encabezadoInfo}
        accion={accion}
        item={item}
        nombre={nombre}
        history={history}
        historypush={historypush}
        /></div>
    </div>
  )
}

export default ModalConfirm