import React from 'react'
import ModalInfo from './ModalInfo'


const ModalConfirm = ({encabezado, confirmacion, encabezadoInfo, accion, parametro, funcion, history,historypush, nombre, item }) => {


  return (

    <div>
      <div className="modal fade" id="definiteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content modalBord2">
            <div className="modal-header borderModal">
              <h5 className="modal-title" id="exampleModalLabel">{encabezado}</h5>
            </div>
            <div style={{width: 'fit-content'}} className="modal-body">
              <p style={{ fontWeight: '600'}}>{`${confirmacion} ${item ? item : ''} ${nombre ? nombre : ''}?`}</p>
            </div>
            <div style={{height: 'fit-content'}} className="modal-footer">
              <button style={{ height: '37px', padding: '7px', width: '70px',textTransform: 'none'}} type="button" data-toggle="modal" data-target="#infoModal" className="example_b general" data-dismiss="modal" onClick={()=> funcion(parametro)} >Si</button>
              <button style={{ height: '37px', padding: '7px', width: '70px',textTransform: 'none'}} type="button" className="example_b greyButton general" data-dismiss="modal">No</button>
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