import React,{ useEffect } from 'react'
import { connect } from 'react-redux';
import { deleteUser } from '../redux/action-creators/user-actions';


const ModalUsers = (props)=>{


return(
<div className="modal fade" id="definiteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">¿Eliminar Usuario?</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{`¿Confirma que desea eliminar al usuario "${props.userName}" ?`}</p>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => props.users.length > 1 ? props.deleteUser(props.userId)
        .then( props.history.push('/usuarios/all')) : alert('No se puede eliminar el unico usuario existente')}>Si</button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
    </div>
  </div>
</div>
</div>)}


const mapDispatchToProps = (dispatch) => (
  {
    deleteUser: (id) => dispatch(deleteUser(id))
  }
  );

  export default connect(null, mapDispatchToProps)(ModalUsers)