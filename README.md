# Challenge NaranjaX
Itinerario


<!-- PROJECT LOGO -->
<br />
<p align="center">
  
  ![alt text](https://user-images.githubusercontent.com/32559854/128974914-00278edc-b43e-4620-b7ad-7da50dfbcd0b.png)
  
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table de contenidos </summary>
  <ol>
    <li>
      <a>Sobre el proyecto</a>
      <ul>
        <li><a>Stack utilizado</a></li>
      </ul>
    </li>
    <li><a>Funcionalidad Sprint 3</a></li>
    <li>
      <a>Comenzando</a>
      <ul>
        <li><a>Prerrequisitos</a></li>
        <li><a>Instalación</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- SOBRE EL PROYECTO -->
## SOBRE EL PROYECTO

Itinerario de ciudades el cual permite crear ciudades y mostrarlas en el lado del cliente. Además implementa autenticación de usuario mediente JWT. 


### Stack utilizado:

* [NodeJs](https://nodejs.org/es/)
* [ExpressJs](https://expressjs.com/es/)
* [MongoDB](https://www.mongodb.com/es)


## SPRINT 4 -- FINAL

Funcionalidades añadidas:
* CRUD de comentarios y likes en los itinerarios.
* Login persistente mediante JWT y LocalStorage

## Comenzando

Para obtener una copia local en funcionamiento, siga estos sencillos pasos de ejemplo.

### Prerrequisitos

Tener instalado Node y algun manejador de paquetes como npm incluído por node o yarn. Contrar con una BD en mongoDB y creedenciales de acceso.

### Instalación

1. Clonar el repositorio
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Moverse a la carpeta de client
   ```
   cd client
   ```
3. Instalar las dependencias
   ```
   npm install
   ```
3. Moverse a la carpeta server e instalar las dependencias
   ```
   cd ..
   cd server
   npm install
   ```
4. Crear archivo de variables de entorno (existe un .env.example) dentro de server
   ```
   .env
   ```
4. Ejecutar el proyecto desde server ya que funciona concurrentemente con client
   ```
   npm run start
   ```