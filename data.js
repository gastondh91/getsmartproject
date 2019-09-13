const usuarios =
  [
    {
      nombre: 'Gastón',
      apellido: 'd' + '\'' + 'Hiriart',
      email: 'gastondh91@gmail.com',
      domicilio: 'Las acacias 153',
      password: '5739gaston',
      genero: 'Masculino',
      isAdmin: true,
      avatar: '/utils/Usuarios/gastondh91@gmail.com/gastonavatar.jpg'
    },
    {
      nombre: 'Juan Carlos',
      apellido: 'Araoz',
      email: 'juancarlos@gmail.com',
      domicilio: 'Salas y valdez 647',
      genero: 'Masculino',
      password: '123456',
      avatar: '/utils/Usuarios/juancarlos@gmail.com/juancarlos.jpg',
      isAdmin: false
    },
    {
      nombre: 'Julieta',
      apellido: 'Silva',
      email: 'julisilva@gmail.com',
      domicilio: 'Los Ceibos 635',
      genero: 'Femenino',
      password: '123456',
      avatar: '/utils/Usuarios/julisilva@gmail.com/Juliavatar.jpg',
      isAdmin: true
    },
    {
      nombre: 'Bill',
      apellido: 'Gates',
      email: 'billgates@gmail.com',
      domicilio: 'West Avenue 458',
      genero: 'Masculino',
      password: '123456',
      avatar: '/utils/Usuarios/billgates@gmail.com/billgates.jpg',
      isAdmin: true
    },
    {
      nombre: 'Valentina',
      apellido: 'Ruiz Cossio',
      email: 'valeruiz@gmail.com',
      domicilio: 'Lamadrid 529',
      genero: 'Femenino',
      password: '123456',
      avatar: '/utils/Usuarios/valeruiz@gmail.com/valentinaavatar.jpg',
      isAdmin: false
    },
    {
      nombre: 'Jose',
      apellido: 'Montiel',
      email: 'josemontiel@gmail.com',
      domicilio: 'Av. Santa Fe 1238',
      genero: 'Masculino',
      password: '123456',
      isAdmin: false,
      avatar: '/utils/Usuarios/josemontiel@gmail.com/josemontiel.jpg'
    }

  ]


const productos = [
  {
    marca: 'Xiaomi',
    modelo: 'Redmi Note 7',
    stock: 6,
    descripcion: 'El Xiaomi Redmi Note 7 es el nuevo miembro de la serie Redmi Note, esta vez con una impresionante cámara dual de 48 MP + 5 MP. Potenciado por un procesador Qualcomm Snapdragon 660 de ocho núcleos, el Redmi Note 7 está disponible con 3GB de RAM y 32GB de almacenamiento o bien 4GB o 6GB de RAM con 64GB de almacenamiento, con una pantalla Full HD+ de 6.3 pulgadas con notch en forma de gota de agua. Con una batería de 4000 mAh con carga rápida, el Redmi Note 7 completa sus características con un lector de huellas posterior, infrarrojo, puerto USB-C, cámara frontal de 13 MP y MIUI 10 basado en Android 9.0 Pie.',
    precio: '20.000',
    imagenes: ['/utils/Telefonos/xia1.jpeg','/utils/Telefonos/xia2.jpg','/utils/Telefonos/xia3.jpg']
  },
  {
    marca: 'Motorola',
    modelo: 'One',
    stock: 5,
    descripcion: 'El Motorola One es un smartphone parte del programa Android One de Google y recibirá Android 9.0 Pie poco después de llegar al mercado. El Motorola One cuenta con una pantalla HD+ de 5.9 pulgadas y está potenciado por un procesador Snapdragon 625 con 4GB de RAM y 64GB de almacenamiento interno. En su posterior su ubica una cámara dual de 13 MP + 2 MP, mientras que una cámara de 8 megapixels se encarga de las selfies. El Motorola One completa sus características con radio FM, puerto USB-C, lector de huellas y una batería de 3000 mAh con soporte de carga rápida.',
    precio: '23.000',
    imagenes: ['/utils/Telefonos/moto1.jpg','/utils/Telefonos/moto2.jpg','/utils/Telefonos/moto3.jpg']
  },
  {
    marca: 'Huawei',
    modelo: 'P20 Pro',
    stock: 2,
    descripcion: 'El Huawei P20 Pro es el primer smartphone de Huawei con cámara triple. Con tres lentes de 40 MP, 20 MP y 8 MP provistos por Leica, el Huawei P20 Pro apunta a dominar la fotografía en el campo de los smartphones. El resto de las características incluye una pantalla Full HD+ de 6.1 pulgadas, procesador octa-core, 6GB de RAM y 128GB de almacenamiento, y Android 8.0 Oreo.',
    precio: '45.000',
    imagenes: ['/utils/Telefonos/huawei1.jpg','/utils/Telefonos/huawei2.jpg','/utils/Telefonos/huawei3.jpg']
  }
  ,{
    marca: 'LG',
    modelo: 'G7 ThinQ',
    stock: 8,
    descripcion: 'El LG G7 ThinQ es el sucesor del LG G6, que llega con una pantalla de 6.1 pulgadas a 1440 x 3120 pixels de resolución. El G7 ThinQ está potenciado por un procesador Snapdragon 845 octa-core con 4GB de RAM y 64GB de almacenamiento, o bien 6GB de RAM y 128GB de almacenamiento en su versión LG G7+ ThinQ. La cámara dual retorna en el LG G7 con dos sensores de 16 MP y apertura f/1.9 y f/1.6, y conserva la batería de de 3000 mAh, la resistencia militar y al agua, corriendo Android 8.0 Oreo. El G7 ThinQ además incorpora una tecla dedicada para Google Assistant.',
    precio: '35.000',
    imagenes: ['/utils/Telefonos/lg1.jpg','/utils/Telefonos/lg2.jpg','/utils/Telefonos/lg3.jpg']
  }
]

const iPhone = {
  marca: 'iPhone',
  modelo: 'XR',
  stock: 3,
  descripcion: 'El iPhone XR tiene un diseño similar al iPhone X. Aun así, tiene un marco de aluminio y está disponible en una gran variedad de colores. El hardware del iPhone XR es similar al del iPhone XS pero en vez de 3D Touch, el XR cuenta con Haptic Touch donde el usuario realiza una pulsación prolongada hasta sentir la vibración del Taptic Engine. El XR también tiene una pantalla LCD (en vez del OLED), denominada Liquid Retina. La proporción de la pantalla en el dispositivo es de 79.3%, mucho mayor que el 67.5% del iPhone 8 Plus pero menor que la mayoría de teléfonos de similar precio.5​ A diferencia de los otros modelos, el XR lleva una única cámara trasera, con especificaciones idénticas a la cámara principal en los modelos XS y XS Max.',
  precio: '75.000',
  imagenes: ['/utils/Telefonos/iphone1.jpg','/utils/Telefonos/iphone2.jpg','/utils/Telefonos/iphone3.jpg']
}

const samsung = {
  marca: 'Samsung',
  modelo: 'Galaxy S10+',
  stock: 3,
  descripcion: 'El Samsung Galaxy S10 llega en el 2019 mejorando en varios aspectos al Galaxy S9. El Galaxy S10 tiene una pantalla QHD+ Dynamic AMOLED de 6.1 pulgadas, y está potenciado por el nuevo procesador Exynos 9820 de ocho núcleos o bien un Snapdragon 855, con 8GB de RAM y 128GB o 512GB de almacenamiento. La cámara principal del Galaxy S10 es triple, con un sensor principal de 12 MP con OIS, un telefoto de 12 MP con AF, y un lente ultra-wide de 16 MP. La cámara frontal es de 10 MP. Completando sus características, el Galaxy S10 cuenta con lector de huellas embebido en pantalla, puerto USB-C, parlantes stereo optimizados por AKG, sonido Dolby Atmos, batería de 3400 mAh con carga rápida inalámbrica, carga reversible para funcionar como power bank y Android 9.0 Pie con la interfaz One UI.',
  precio: '65.000',
  imagenes: ['/utils/Telefonos/samsung1.jpg','/utils/Telefonos/samsung2.jpg','/utils/Telefonos/samsung3.jpg']
}

const categorias = [
  {
    name: 'Gama Baja'
  },
  {
    name: 'Gama Media'
  },
  {
    name: 'Gama Alta'
  },
  {
    name: 'Nuevo'
  },
  {
    name: 'Reacondicionado'
  },
  {
    name: 'Android'
  },
  {
    name: 'Libre'
  }
]

module.exports = { usuarios, productos, categorias, iPhone, samsung }