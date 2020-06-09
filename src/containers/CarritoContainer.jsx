import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fetchCarrito, updateCarrito } from '../redux/action-creators/carrito-actions.js'

const CarritoContainer = (props) => {

  const [inputs, setInputs] = useState({})
  let [Total, setTotal] = useState(0)


  useEffect(() => {
    if (props.usuario) props.getCarrito(props.usuario.id)

  }, [])


  useEffect(() => {
    if (props.carrito) {
      const totalMap = props.carrito.map(producto => stringToNumber(producto.precio) * (inputs[producto.id] ? inputs[producto.id] : producto.carrito.cantidad))
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
    if (string.length == 4) return `${string[0]}.${string.slice(1)}`
    if (string.length == 5) return `${string.slice(0, 2)}.${string.slice(2)}`
    if (string.length == 6) return `${string.slice(0, 3)}.${string.slice(3)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(inputs).length) CartPromise(props.usuario.id, inputs, props.carrito)
    else props.history.push('/pagos')
  }

  const CartPromise = (usuario, input, producto) => {
    new Promise((resolve, reject) => {
      props.updateCarrito(usuario, input, producto)
      resolve('ok')
    })
      .then(() => props.history.push('/pagos'))
  }

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [event.target.name]: Number(event.target.value) }))
  }

  const deleteProd = (params) => {
    axios.post(`/api/carrito/deleteprod/${params}`)
      .then(() => props.getCarrito(props.usuario.id))
  }


  return (
    <div className="contenedorCarrito">
      <h1 style={{ textAlign: 'center' }}>Carrito de compras:</h1>
      <hr />
      {props.carrito.length ? (
        <form className="inputCarrito" onSubmit={handleSubmit}>
          <div>
            <table className="tabla">
              <tbody>
                <tr className="tr">
                  <th>Imagenes</th>
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
                {props.carrito.map(producto => (
                  <tr key={producto.id}>
                    <td><img style={{ width: '5rem', height: '5rem', objectFit: 'contain' }} src={producto.imagenes[0]} /></td>
                    <td><Link className="LinkCheckout" to={`/productos/${producto.id}`}>{`${producto.marca} ${producto.modelo}`}</Link></td>
                    <td>
                      <input type="number" name={producto.id} id="cantidadProd" min="1" max={producto.stock} defaultValue={producto.carrito.cantidad ? producto.carrito.cantidad : 1} onChange={handleChange} />
                      <img onClick={() => deleteProd(producto.id)} value={producto.id} id="trashCarrito" title="Eliminar" src="/utils/cartdelete.svg" />

                    </td>
                    <td>
                      $
{producto.precio}
                    </td>
                    <td>{inputs[producto.id] ? `$${numberToString(stringToNumber(producto.precio) * inputs[producto.id])}` : `$${producto.precio}`}</td>
                  </tr>

                ))}
                <tr style={{ borderTop: 'solid thin darkslategrey' }}>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td style={{ fontWeight: '600' }}>{`$${numberToString(Object.keys(inputs).length ? Total : elTotal(props.carrito))}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="example_b botonCarrito general" type="submit" onSubmit={handleSubmit}>Comprar</button>
        </form>
      ) : ''}
    </div>
  )
}

const mapStateToProps = state => ({
  carrito: state.carrito,
  productos: state.products,
  usuario: state.usuario,
})

const mapDispatchToProps = dispatch => ({
  getCarrito: (id) => dispatch(fetchCarrito(id)),
  updateCarrito: (id, cantidad, productos) => dispatch(updateCarrito(id, cantidad, productos)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CarritoContainer)
