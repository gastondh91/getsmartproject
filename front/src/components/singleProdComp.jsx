/* eslint-disable no-unused-vars */
import React,{ useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Stars from './starRating';
import { Link } from 'react-router-dom';
import { borrarProd } from '../redux/action-creators/products-actions';
import { connect } from 'react-redux';
import { addToCart } from '../redux/action-creators/carrito-actions'
import ModalConfirm from './ModalConfirm'

const SingleProdComp = (props) => {

// useEffect(()=>{
//   var coll = document.getElementsByClassName("collapsible");
//   var i;
  
//   for (i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function() {
//       this.classList.toggle("active");
//       var content = this.nextElementSibling;
//       if (content.style.display === "block") {
//         content.style.display = "none";
//       } else {
//         content.style.display = "block";
//       }
//     });
//   }
// },[])


  const { producto, categorias, onClick } = props;
  return (
    <div id="singleProd">
      <div className="row">

        <div className="col-lg-6 col-xs-12">

          <h1 style={{ textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid black', paddingBottom: '7px' }}>{producto.marca} {producto.modelo}</h1>

          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-lg-6 col-xs-12"><h1 style={{ textAlign: 'center' }}>$ {producto.precio} </h1></div>
            <div style={{ textAlign: 'center', marginTop: '9px' }} className="col-lg-6 col-xs-12">{producto.stock > 5 ? <h4>Disponible</h4> : <h4>Últimas {producto.stock} unidades</h4>}</div>
          </div>

          <div id="puntuacion" className="row">
            <h3>Puntuación :  </h3>
            <h2 style={{ margin: '0 auto' }}>  <Stars rating={producto.puntuación} /></h2>
          </div>

          <div className="row" style={{ marginTop: '60px' }}>
            <div className="col-lg-5 col-sm-12" id='editElim'>
              {props.adminInfo
                ? <div> <Link to={`/productos/edit/${producto.id}`}> <button className="btn btn-lg btn-success" type="button" style={{ padding: '20px', margin: '7px' }} > EDITAR </button> </Link>
                  <button data-toggle="modal" data-target="#definiteModal" className="btn btn-lg btn-danger" type="button" style={{ padding: '20px', margin: '7px' }} > ELIMINAR </button>
                </div>
                : <Link to={`/checkout/${producto.id}`}><button className="btn btn-lg btn-success" type="button" style={{ padding: '20px' }} > COMPRAR! </button> </Link>}
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-xs-12">
          <Carousel >
            {producto.imagenes.map((imagen, index = 0) => (
              <Carousel.Item key={index++}>
                <img
                  className="d-block w-100"
                  src={imagen}
                  alt="photos"
                  id="imgProdCarr"
                />
                
              </Carousel.Item>
            ))}
          </Carousel>
          <button onClick={() => props.addToCart(props.producto.id, props.usuario.id)} className="btn btn-lg" id='cartbutton' type="button" style={{ marginLeft: '20%', color: 'black', borderColor: '#476694', padding: '20px' }}>Agregar al Carrito</button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-xs-12">
          <h3><strong>Descripción : </strong></h3>
          <h5 className='collapsible'>{producto.descripcion}</h5>
        </div>
      </div>
      <hr />
      <div className="row" >
        <div className="col-lg-6 col-xs-12">
          <h4><strong>Categorias :</strong></h4>
          <ul><h6>
            {categorias && categorias.map((obj, index = 0) => {
              return <li key={index++}>{obj.name}</li>;
            })}
          </h6></ul>

        </div>
        <div className="col-lg-6 col-xs-12">
          <h4><strong>Reviews :</strong></h4><br />
          <h6 className="col-lg-12"><strong>UsuarioX </strong>Dijo: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, eum saepe, quos tempora perferendis repellendus in libero asperiores voluptatum deleniti voluptatem tenetur voluptatibus consequuntur animi architecto ratione quae maiores dignissimos.</h6>
        </div>
      </div>
        <ModalConfirm
          funcion={props.borrarProd}
          parametro={producto.id}
          encabezado={'¿Eliminar producto?'}
          encabezadoInfo={'Producto eliminado'}
          confirmacion={'¿Confirma que desea eliminar'}
          history={props.history}
          historypush={'/productos'}
          nombre={'"' + producto.marca + ' ' + producto.modelo + '"' }
          item={'el producto'}
          accion={'Se eliminó'}
        />
    </div>
  );
};

const mapStateToProps = (state) => ({
  producto: state.selectedProd,
  rating: state.ratingProd,
  categorias: state.categorias,
  usuario: state.usuario

});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (idProducto, idUsuario) => dispatch(addToCart(idProducto, idUsuario))
});


export default connect(mapStateToProps, mapDispatchToProps)(SingleProdComp);
