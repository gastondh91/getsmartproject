{/* <div style={{ all: 'revert' }} className="modal fade" id="acceptModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div style={{ width: '21rem' }} className="modal-content modalBord2">
    <div className="modal-header borderModal">
      <h5 className="modal-title" id="exampleModalLabel">{'Calificación'}</h5>
    </div>
    <div style={{ fontSize: '1rem', height: 'fit-content' }} id='pModal' className="modal-body">
      <p style={{ textAlign: 'center', fontWeight: '600' }} className='pMargin'>{'Ya puedes volver a calificar este producto si lo deseas'}</p>
    </div>
    <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
      <button style={{ fontSize: '1.15rem', textTransform: 'none' }} className="example_b logBut general" type="button" data-dismiss="modal">Aceptar</button>
    </div>
  </div>
</div>
</div> */}

import React from 'react'

const ModalAccept = (props)=>{


return(

<div style={{ all: 'revert' }} className="modal fade" id="acceptModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div style={{ width: '21rem' }} className="modal-content modalBord2">
    <div className="modal-header borderModal">
      <h5 className="modal-title" id="exampleModalLabel">{'Calificación'}</h5>
    </div>
    <div style={{ fontSize: '1rem', height: 'fit-content' }} id='pModal' className="modal-body">
      <p style={{ textAlign: 'center', fontWeight: '600' }} className='pMargin'>{'Ya puedes volver a calificar este producto si lo deseas'}</p>
    </div>
    <div style={{ padding: '10px', height: 'fit-content' }} className="modal-footer">
      <button style={{ fontSize: '1.15rem', textTransform: 'none' }} className="example_b logBut general" type="button" data-dismiss="modal">Aceptar</button>
    </div>
  </div>
</div>
</div>)

}

export default ModalAccept