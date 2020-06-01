# Proyecto getSmart

Proyecto final de programación basado en aplicacíon de e-commerce dedicada a la comercializacíon de telefonos celulares.

![status](https://img.shields.io/badge/status-running-green.svg?colorB=00C106) ![readme](https://img.shields.io/badge/readme-OK-green.svg?colorB=00C106) ![database](https://img.shields.io/badge/database-OK-green.svg?colorB=00C106) ![commits](https://img.shields.io/badge/commits-65-blue.svg)

---

### Contenido y características
- Registro y edición de usuarios
- Gestion de jerarquia de usuarios.
- Login y logout
- Creación y edición de productos.
- Puntuación y comentarios de productos.
- Carrito para usuarios, checkout, ordenes de compra y pagos.

### Inicio

- Haz click en fork y luego clona el repositorio.

## Cargar la base de datos (Linux)

Para construir la base de datos, primero debes instalar y configurar
postgresql.

1- Ingresa los siguientes comandos en la terminal:

```
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createuser --superuser $USER (donde '$USER' vendria a ser tu usuario)
createdb $USER
createdb getSmartDB

(Donde $USER es tu nombre de usuario de linux)

```

2- Desde la terminal ingresa el siguiente comando:

```
nano /etc/postgresql/VERSION_DE_POSTGRES/main/pg_hba.conf

(Donde "/VERSION_DE_POSTGRES" vendria a ser la version que tienes instalada, la cual puede corroborar desde la carpeta "/etc/postgresql".)
```

Y cambia las siguientes lineas donde figura la palabra "md5" por "trust". El codigo quedaría asi:


```
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
```


Originalmente:

```
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

## Instalación de dependencias
Desde la terminal, usa el siguiente comando:

```
npm install

```

## Iniciando la aplicacíon

Desde la terminal, usa el siguiente comando:

```
npm start

``` 

Nota: por defecto la base de datos se esta llenando automaticamente. Si deseas detener esto tienes que ir al archivo "server/server.js" y comentar o borrar desde la linea 204 hasta la 230.

Y luego abre el navegador en `http://localhost:8080` para correr la aplicacíon.

### Tecnologías usadas

La aplicación está estructurada utilizando
`React Hooks`, `React Redux`,`CSS3`, `SASS`, `Bootstrap`, `Node.js`, `Express.js`, `Passport`, `Postgresql`, `sequelize` y `multer` entre otras.


