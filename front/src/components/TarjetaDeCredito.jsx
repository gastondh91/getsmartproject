import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCarrito } from '../redux/action-creators/carrito-actions'
import axios from 'axios'
import PaymentCard from 'react-payment-card-component'

const TarjetaDeCredito = (props) => {

  useEffect(() => {
    props.fetchCarrito(props.usuario.id)
  }, [])

  const [inputs, setInputs] = useState({});
  var [flipped, setFlipped] = useState(false)
  // var [tarjeta, setTarjeta] = useState('')

  var tarjeta = ''

  const handleChange = (e)=>{
    setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }))
    
    if(inputs.cvv) setFlipped(flipped = true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/api/carrito/deletecart/${props.usuario.id}`)
  }

  const Tarjeta = (input)=>{
      
    if(input){
      if (input[0] == 4) tarjeta = 'visa'
      else if (input[0] == 5) tarjeta= 'mastercard'
      else tarjeta=''}

    return tarjeta
  }

  return (
    <div>
      {console.log(inputs)}
      <div className="heading">
          <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Confirmar compra</h1>
          <hr style={{width: '62rem'}}/>
        </div>
      <div style={{ paddingLeft: '36.5%', paddingRight: '37%', marginTop: '1rem', marginBottom: '1rem' }} >



        <PaymentCard
          bank={Tarjeta(inputs.cardNumber) == 'mastercard' ? 'nubank' : 'default'}
          model="personnalite"
          type={inputs.cardNumber ? (inputs.cardNumber[0] == 4 ? 'black' : inputs.cardNumber[0] == 5 ? 'platinum' : '' ) : ''}
          brand={Tarjeta(inputs.cardNumber)}
          number={tarjeta ? inputs.cardNumber : !(inputs.cardNumber) ? '****************' : inputs.cardNumber }
          cvv={inputs.cvv ? inputs.cvv : '***' }
          holderName={inputs.owner ? inputs.owner : 'Nombre Completo'}
          expiration={inputs.expirationDate ? (inputs.expirationDate + '/' + (inputs.year ? inputs.year: 'AA')) : 'MM/AA' }
          flipped={flipped}
        />
      </div>
      <div style={{ paddingLeft: '35%', paddingRight: '35%' }} className="creditCardForm">
        <div className="payment">
          <form>
            <div className="form-group" id="card-number-field">
              <label htmlFor="cardNumber">Número de tarjeta</label>
              <input maxLength='16' onClick={()=> setFlipped(flipped = false)} onChange={handleChange} type="text" className="form-control" id="cardNumber" />
            </div>
            <div className="form-group owner">
              <label htmlFor="owner">Nombre en la tarjeta</label>
              <input onClick={()=> setFlipped(flipped = false)} onChange={handleChange} type="text" className="form-control" id="owner" />
            </div>
            <div className="form-group CVV">
              <label htmlFor="cvv">Codigo de seguridad</label>
              <input maxLength='3' onClick={()=> setFlipped(flipped = true)} onChange={handleChange} type="password" className="form-control" id="cvv" />
            </div>
            <div className="form-group" >
              <label>Fecha de expiración</label>
              <select style={{marginLeft: '1rem'}} id="expirationDate" onClick={()=> setFlipped(flipped = false)} onChange={handleChange} >
                <option value="01">January</option>
                <option value="02">February </option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select id='year' onClick={()=> setFlipped(flipped = false)} onChange={handleChange} >
                <option value="16"> 2016</option>
                <option value="17"> 2017</option>
                <option value="18"> 2018</option>
                <option value="19"> 2019</option>
                <option value="20"> 2020</option>
                <option value="21"> 2021</option>
              </select>
            </div>
            <div className="form-group" id="pay-now">
              <button onClick={handleSubmit} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} type="submit" className="example_c general" id="confirm-purchase">Finalizar</button>
            </div>
          </form>
        </div>
      </div>


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

// <div style={{ marginLeft: '35%', marginTop: '3rem'}} >



// <PaymentCard
//   bank="itau"
//   model="personnalite"
//   type="black"
//   brand="mastercard"
//   number="4111111111111111"
//   cvv="202"
//   holderName="Owen Lars"
//   expiration="12/20"
//   flipped={false}
// />


{/* <form className='tarjeta container-fluid'>
        <h1 id='metodo' >Método de Pago</h1>
        <div>
          <label htmlFor="inputEmail3">Numero de Tarjeta: </label>
          <input maxLength='16' className='numerodetarjeta' type="text" />
        </div>
        <div className='datosTarjeta'>
          <div>
            <label>Fecha de Vencimiento: </label>
            <input className='fecha' min='2019-10' defaultValue='2020-01' type="month" id="vencimiento" />
          </div>
          <div>
            <label htmlFor="inputPassword5">Codigo de Seguridad: </label>
            <input maxLength={3} className='fecha' type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
            <small id="passwordHelpBlock" className="form-text text-muted note">
              Ultimos 3 digitos en el dorso de la tarjeta
            </small>
          </div>
          <img id='dorsoTarjeta' src='/utils/dorsoTarjeta.svg'></img>
        </div>
        <h1 id='datos'>Datos Titular de la Tarjeta</h1>
        <div>
          <label htmlFor="inputEmail3">Nombre Completo:</label>
          <input className='numerodetarjeta' type="text" />
        </div>
        <div>
          <label htmlFor="inputEmail3">DNI Titular:</label>
          <input id='dni' type="text" />
        </div>
        <button style={{width: '13rem', fontSize: '1rem', padding: '17px'}} onClick={handleSubmit} type="button" className="example_c">Finalizar compra</button>
      </form> */}
    // </div>