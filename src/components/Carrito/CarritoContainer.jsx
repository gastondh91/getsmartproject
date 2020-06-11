import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { fetchCarrito, updateCarrito } from '../../redux/action-creators/carrito-actions'
// eslint-disable-next-line no-unused-vars
import styles from './Carrito.css'

const CarritoContainer = () => {

  const [inputs, setInputs] = useState({})
  let [Total, setTotal] = useState(0)

  const history = useHistory()
  const dispatch = useDispatch()
  const carrito = useSelector(store => store.carrito)
  // const productos = useSelector(store => store.products)
  const usuario = useSelector(store => store.usuario)


  useEffect(() => {
    if (usuario) dispatch(fetchCarrito(usuario.id))

  }, [])


  useEffect(() => {
    if (carrito) {
      const totalMap = carrito.map(producto => stringToNumber(producto.precio) * (inputs[producto.id] ? inputs[producto.id] : producto.carrito.cantidad))
      setTotal(Total = totalMap.reduce((a, b) => a + b, 0))
    }
  }, [inputs])


  const elTotal = (carrito) => {
    let total = carrito.map(producto => stringToNumber(producto.precio) * producto.carrito.cantidad)

    total = total.reduce((a, b) => (a + b), 0)
    return total
  }


  const stringToNumber = (string) => {
    let numero = string.split('.')
    numero = Number(numero.join(''))
    return numero
  }

  const numberToString = (numero) => {
    const string = numero.toString()
    if (string.length === 4) return `${string[0]}.${string.slice(1)}`
    if (string.length === 5) return `${string.slice(0, 2)}.${string.slice(2)}`
    if (string.length === 6) return `${string.slice(0, 3)}.${string.slice(3)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(inputs).length) CartPromise(usuario.id, inputs, carrito)
    else history.push('/pagos')
  }

  const CartPromise = (usuario, input, producto) => {
    new Promise((resolve, reject) => {
      dispatch(updateCarrito(usuario, input, producto))
      resolve('ok')
    })
      .then(() => history.push('/pagos'))
  }

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [event.target.name]: Number(event.target.value) }))
  }

  const deleteProd = (params) => {
    axios.post(`/api/carrito/deleteprod/${params}`)
      .then(() => dispatch(fetchCarrito(usuario.id)))
  }


  return (
    <div className="container contenedor-carrito">
      <h1 style={{ textAlign: 'center' }}>Carrito de compras:</h1>

      {carrito.length ? (
        <form className="form-carrito" onSubmit={handleSubmit}>
          <hr />
          <div>
            <Table hover className="tabla">
              <thead>
                <tr className="table-head">
                  <th>Imagenes</th>
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {carrito.map(producto => (
                  <tr key={producto.id}>
                    <td><img style={{ width: '5rem', height: '5rem', objectFit: 'contain' }} src={producto.imagenes[0]} /></td>
                    <td><Link className="LinkCheckout" to={`/productos/${producto.id}`}>{`${producto.marca} ${producto.modelo}`}</Link></td>
                    <td>
                      <input type="number" name={producto.id} id="cantidadProd" min="1" max={producto.stock} defaultValue={producto.carrito.cantidad ? producto.carrito.cantidad : 1} onChange={handleChange} />
                      <img className="erase-carrito" onClick={() => deleteProd(producto.id)} value={producto.id} title="Eliminar" src="/utils/cartdelete.svg" />

                    </td>

                    <td>
                      $
                      {producto.precio}
                    </td>
                    <td>{inputs[producto.id] ? `$${numberToString(stringToNumber(producto.precio) * inputs[producto.id])}` : `$${producto.precio}`}</td>
                  </tr>

                ))}
              </tbody>
              <tr className="table-foot">
                <td colSpan="5" style={{ fontWeight: '600' }}>{`$${numberToString(Object.keys(inputs).length ? Total : elTotal(carrito))}`}</td>
              </tr>
            </Table>
          </div>
          <button className="example_b botonCarrito general" type="submit" onSubmit={handleSubmit}>Comprar</button>
        </form>
      ) : ''}
    </div>
  )
}


export default CarritoContainer
