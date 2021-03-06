import React from 'react';

const ModalInfo = ({ encabezado, item, history, accion, historypush, nombre }) => {


  return (

    <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div style={{ width: '21rem' }} className="modal-content modalBord2">
          <div className="modal-header borderModal">
            <h5 style={{ textAlign: 'center' }} className="modal-title" id="exampleModalLabel">{encabezado}</h5>
          </div>
          <div style={{ fontSize: '1rem', height: 'fit-content' }} id='pModal' className="modal-body">
            <p style={{ textAlign: 'center', fontWeight: '600' }} className='pMargin'>{`${accion}${item ? item : ''}${nombre ? nombre : ''}.`}</p>
          </div>
          <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
            <button style={{ fontSize: '1rem', textTransform: 'none' }} className="example_b logBut general" onClick={() => historypush ? history.push(historypush) : null} type="button" data-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>);

};

export default ModalInfo;