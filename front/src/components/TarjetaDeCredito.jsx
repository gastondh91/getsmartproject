import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCarrito } from '../redux/action-creators/carrito-actions'
import axios from 'axios'
import PaymentCard from 'react-payment-card-component'
import ModalInfo from './ModalInfo'

const TarjetaDeCredito = (props) => {

  useEffect(() => {
    props.fetchCarrito(props.usuario.id)
  }, [])

  const [inputs, setInputs] = useState({});
  var [flipped, setFlipped] = useState(false)
  var [Modal, setModal] = useState(['Estado', 'Mensaje'])

  var tarjeta = ''

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputs.cardNumber || !inputs.owner || !inputs.cvv || !inputs.expirationDate || !inputs.year) {
      setModal(Modal = ['Error', 'Debes completar todos los campos'])
    } else if (inputs.cardNumber.length < 16) {
      setModal(Modal = ['Error', 'Los numeros de la tarjeta deben ser de una longitud de 16 digitos'])
    } else if (inputs.cvv.length < 3) {
      setModal(Modal = ['Error', 'El código de seguridad debe tener una longitud de 3 digitos'])
    } else if(!inputs.year || !inputs.expirationDate) { setModal(Modal = ['Error', 'Debes seleccionar el mes y el año del vencimiento de la tarjeta'])
   } else {
     axios.post(`/api/carrito/deletecart/${props.usuario.id}`)
     .then(()=> {
       axios.post(`/api/ordencompra/update/${props.usuario.id}`,{
         status: 'PROCESANDO',
         brand: tarjeta,
         lastnum: inputs.cardNumber.slice(inputs.cardNumber.length-4)
        })
      })
      setModal(Modal = ['Compra exitosa', 'Operación exitosa'])
    }
    
  }
const Tarjeta = (input) => {

  if (input) {
    if (input[0] == 4) tarjeta = 'visa'
    else if (input[0] == 5) tarjeta = 'mastercard'
    else tarjeta = ''
  }

  return tarjeta
}

return (
  <div>
    {console.log(inputs)}
    <div className="heading">
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Confirmar compra</h1>
      <hr style={{ width: '62rem' }} />
    </div>
    <div style={{ paddingLeft: '36.5%', paddingRight: '37%', marginTop: '1rem', marginBottom: '1rem' }} >



      <PaymentCard
        bank={Tarjeta(inputs.cardNumber) == 'mastercard' ? 'nubank' : 'default'}
        model="personnalite"
        type={inputs.cardNumber ? (inputs.cardNumber[0] == 4 ? 'black' : inputs.cardNumber[0] == 5 ? 'platinum' : '') : ''}
        brand={Tarjeta(inputs.cardNumber)}
        number={tarjeta ? inputs.cardNumber : !(inputs.cardNumber) ? '****************' : (Number(inputs.cardNumber) ? inputs.cardNumber : '')}
        cvv={inputs.cvv ? inputs.cvv : '***'}
        holderName={inputs.owner ? inputs.owner : 'Nombre Completo'}
        expiration={inputs.expirationDate ? (inputs.expirationDate + '/' + (inputs.year ? inputs.year : 'AA')) : 'MM/AA'}
        flipped={flipped}
      />
    </div>
    <div style={{ paddingLeft: '35%', paddingRight: '35%' }} className="creditCardForm">
      <div className="payment">
        <form>
          <div className="form-group" id="card-number-field">
            <label htmlFor="cardNumber">Número de tarjeta</label>
            <input maxLength='16' onClick={() => setFlipped(flipped = false)} onChange={handleChange} type="text" className="form-control" id="cardNumber" />
          </div>
          <div className="form-group owner">
            <label htmlFor="owner">Nombre en la tarjeta</label>
            <input onClick={() => setFlipped(flipped = false)} onChange={handleChange} type="text" className="form-control" id="owner" />
          </div>
          <div className="form-group CVV">
            <label htmlFor="cvv">Codigo de seguridad</label>
            <input maxLength='3' onClick={() => setFlipped(flipped = true)} onChange={handleChange} type="password" className="form-control" id="cvv" />
          </div>
          <div className="form-group" >
            <label>Fecha de expiración</label>
            <select style={{ marginLeft: '1rem' }} id="expirationDate" onClick={() => setFlipped(flipped = false)} onChange={handleChange} >
              <option value=''> Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero </option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <select id='year' onClick={() => setFlipped(flipped = false)} onChange={handleChange} >
              <option value=''> Año</option>
              <option value="19"> 2019</option>
              <option value="20"> 2020</option>
              <option value="21"> 2021</option>
              <option value="22"> 2022</option>
              <option value="23"> 2023</option>
              <option value="24"> 2024</option>
              <option value="25"> 2025</option>
              <option value="26"> 2026</option>
              <option value="27"> 2027</option>
              <option value="28"> 2028</option>
              <option value="29"> 2029</option>
              <option value="30"> 2030</option>
              <option value="31"> 2031</option>
              <option value="32"> 2032</option>
              <option value="33"> 2033</option>

            </select>
          </div>
          <div className="form-group" id="pay-now">
            <button data-toggle='modal' data-target='#infoModal' onClick={handleSubmit} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} type="submit" className="example_c general" id="confirm-purchase">Finalizar</button>
          </div>
        </form>
      </div>
    </div>
    <ModalInfo 
    encabezado={Modal[0]}
    accion={Modal[1]}
    historypush={Modal[0] == 'Error' ? '/tarjeta' : '/'}
    history={props.history}

    />

  </div>
)
}






const mapStateToProps = (state) => ({
  usuario: state.usuario,
  carrito: state.carrito
});

const MapDispatchToProps = (dispatch) => ({
  fetchCarrito: (id) => dispatch(fetchCarrito(id))
})

export default connect(mapStateToProps, MapDispatchToProps)(TarjetaDeCredito)