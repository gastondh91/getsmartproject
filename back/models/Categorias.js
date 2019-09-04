const S = require('sequelize');
const db = require ('../config/db');


const Categorias = db.define('categorias', {
    name: {
        type:S.STRING,
        allowNull: true,
    }
})

var mayusculas = (categoria)=>{

    if (categoria.name.includes(' ') || categoria.name[0] === categoria.name[0].toLowerCase()) {
      newcategoria = categoria.name.split('')
    
      if(newcategoria[0] === newcategoria[0].toLowerCase()) newcategoria[0] = newcategoria[0].toUpperCase()
      
      for (i = 0; i < newcategoria.length; i++) {
        if (newcategoria[i] === ' ') newcategoria[i + 1] = newcategoria[i + 1].toUpperCase()
      }
      categoria.name = newcategoria.join('')
    
    }}
  
  Categorias.addHook('beforeCreate', (categoria) => {
    mayusculas(categoria)
  });
  
  Categorias.addHook('beforeUpdate', (categoria) => {
    mayusculas(categoria)
  })

module.exports = Categorias