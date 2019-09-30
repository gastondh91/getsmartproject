import React, { useEffect, useState } from 'react';
import axios from 'axios'

const OrdenesDeCompra = (props) => {

  var [Ordenes, setOrdenes] = useState()

  useEffect(() => {
    axios.get('/api/ordencompra/getAll')
      .then(ordenes => setOrdenes(Ordenes = ordenes.data))
  }, [])

  const fecha = (fecha) => {
    let year = fecha.slice(0,4)
    let month = fecha.slice(5,7)
    let day = fecha.slice(8,10)
    let time = (fecha.slice(11,13)-3).toString() +':'+ fecha.slice(14,16)

    let date = day + '/' + month + '/' + year + ' ' + time
    return date
  }


  return (
    <div className='contenedorCarrito'>
      {console.log(Ordenes)}
      <h1 style={{ textAlign: 'center' }}>Ordenes de compra:</h1>
      <hr />
      {Ordenes && <form className='inputCarrito'>
        <div>
          <table className='tabla'>
            <tbody>
              <tr className='tr'>
                <th>Orden de compra</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Total</th>
              </tr>
              {
                Ordenes.map(orden => {
                  return (
                    <tr className='trhover' style={{ cursor: 'pointer'}} onClick={()=> props.history.push(`/ordenesdecompra/${orden.id}`)} key={orden.id}>
                      <td>#{orden.id}</td>
                      <td style={{color: '#2B4F81', fontWeight: '600'}}>{orden.usuario.Nickname}</td>
                      <td style={{ fontWeight: 600, color: `${orden.status == 'CANCELADO' ? 'red' : 'green'}`}}>{orden.status}</td>
                      <td>{fecha(orden.fecha)}</td>
                      <td style={{fontWeight : '600'}}>${orden.total}</td>
                    </tr>

                  )
                })
              }
            </tbody>
          </table>
        </div>
      </form>}
    </div>
  );
}

export default OrdenesDeCompra