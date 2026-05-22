# Respuesta a Toolbox code challenge [v3] Full-stack JS

Elaborado por Francisco De La Cruz
francisco@dlcv.net.ve

## Comentarios generales

1. Utilizada una estructura monorepo que contiene separadamente las partes de *frontend* y *backend*
2. Estos proyectos puede ser desacoplables: pueden ser separados y ejecutados independientemente con pocos ajustes
3. Características destacadas:
   - Docker Compose como orquestador de ambos proyectos
   - Separación de responsabilidades según el tipo de proyecto
   - Imágenes Docker que cumplen el requerimiento de NodeJS en su versión 14
   - Pruebas unitarias solo con Jest, por encima de Mocha o Chai; ya que sirve para ambas partes del proyecto
   - Textos no hardcodeado dentro de las funciones, se manejan en archivos separados para su mejor manipulación
   - Se decidió para el proyecto *frontend* utilizar Babel, está prohibido para el proyecto *backend*; pero en el front evita mayores manualidades con React
   - Utilizado ES6+ con sus conceptos de `require` en vez de `import`, respetando consistencia del código en ambos proyectos cumpliendo normas de StandardJS

## Estructura del proyecto

toolbox-ott-challenge/  

├── backend/                # Backend: API REST (NodeJS v14 con ExpressJS)  

│   ├── src/                # Código del proyecto  

│   │   ├── controllers/    # Lógica de enrutamiento  

│   │   ├── services/       # Lógica de negocio (procesamiento de archivo CSV)  

│   │   ├── utils/          # Funciones utilitarias (validaciones y mensajes)  

│   │   ├── wrappers/       # Capa de abstracción para fetch a la API externa  

│   │   └── index.js        # Punto de entrada  

│   ├── tests/              # Pruebas unitarias (Jest)  

│   ├── Dockerfile          # Configuración de la imagen a montar  

│   ├── .dockerignore       # Para no copiar archivos innecesarios al contenedor  

│   ├── .gitignore          # Para no enviar archivos innecesarios al repositorio  

│   └── package.json        # Configuración interna del proyecto  

├── frontend/               # Frontend: aplicación web (NodeJS v14 con React, Webpack y Redux)  

│   ├── public/             # HTML estático para renderizar la web  

│   ├── src/                # Código del proyecto  

│   │   ├── components/     # UI aislada (Atómica, sin lógica de negocio)  

│   │   ├── redux/          # Lógica de peticiones a backend (Separación de responsabilidades)  

│   │   ├── styles/         # Diseño (archivo CSS)  

│   │   ├── utils/          # Funciones utilitarias (mensajes de la UI)  

│   │   └── app.js          # Ensamblador de vistas  

│   │   └── index.js        # Punto de arranque con React  

│   ├── tests/              # Pruebas unitarias (Jest)  

│   ├── Dockerfile          # Configuración de la imagen a montar  

│   ├── .dockerignore       # Para no copiar archivos innecesarios al contenedor  

│   ├── .gitignore          # Para no enviar archivos innecesarios al repositorio  

│   └── package.json        # Configuración interna del proyecto  

└── docker-compose.yml      # Orquestador global del proyecto  

└── .gitignore              # Para no enviar archivos innecesarios al repositorio  

└── package.json            # Gestor de pruebas y linter para ambos proyectos  

└── README.md               # Este archivo

## ¿Cómo ejecutar todo el proyecto?

Ejecuta el comando `docker-compose up --build` desde la raíz del proyecto:

Este comando ejecutará un contenedor con dos imágenes de Docker, una para el *frontend* y otra para el *backend*; que se encuentran en una red aislada entre ellas con el fin de evitar problemas de comunicación entre ambas imágenes.

Una vez Docker Compose termine de levantar las imágenes, los proyectos se estarán ejecutando localmente en las siguientes rutas:

- [Frontend:](http://localhost:8080/) http://localhost:8080/
- [Backend:](http://localhost:3000/) http://localhost:3000/

## ¿Cómo ejecutar solo una parte del proyecto (*frontend* o *backend*)?

1. Cambia al directorio del proyecto que deseas ejecutar (por ejemplo `cd frontend`)
2. Ejecuta el comando `npm run start`
3.

## ¿Cómo ejecutar las pruebas unitarias?

Ejecuta el comando `npm run test` desde la raíz del proyecto:

Este comando ejecutará las pruebas unitarias de ambos componentes del proyecto (*frontend* y *backend*) en una sola ejecución. También puedes cambiar de carpeta (`cd frontend` o `cd backend`) y ejecutando el mismo comando (`npm run test`) ejecutar las pruebas solo de esa carpeta.

## ¿Cómo ejecutar lint en todo el proyecto?

Ejecuta el comando `npm run lint` o `npm run lint:fix` desde la raíz del proyecto:

El primer comando hará una revisión del código y mostrará el resultado del mismo, el segundo comando hará la misma revisión y corregirá automáticamente los problemas de linter que sean hallados.

---

# [v3] Full-stack JS - Toolbox code challenge

# Challenge
Este challenge te pide a desarrollar un *frontend* que consumirá datos de un API que también deberás desarrollar.

El *frontend* deberá mostrar la información obtenida respetando las pautas que se describirán más abajo. Asimismo, la API también debe ser desarrollada siguiendo requisitos explícitos.

EL API externo es provisto por nosotros y sólo debe ser consumido.

El siguiente diagrama de secuencia muestra cómo es el flujo de las peticiones de información para este ejercicio. Si bien el formateo del contenido de archivos no es una llamada REST, el diagrama la incluye porque es una parte fundamental de este desafío.

# API
El API a desarrollar es un API REST que toma información de un API externa y la reformatea para exponerla.

## El API externo

El API externo de la cual se toma la información está documentada en el siguiente [Swagger:](https://echo-serv.tbxnet.com/explorer/#/Secret)

Para poder utilizarla, la API Key es: "Bearer aSuperSecretKey".

Los métodos a utilizar están en la sección "Secret" de la documentación del Swagger, pero a modo de resumen se indican a continuación:

## Para listar los archivos:
```javascript
$ curl -X GET https://echo-serv.tbxnet.com/v1/secret/files -H 
'authorization: Bearer aSuperSecretKey' 
{
   "files":["file1.csv",....]
}
```

## Para descargar un archivo:
```javascript
$ curl -X GET https://echo-serv.tbxnet.com/v1/secret/file/file1.csv -H 
'authorization: Bearer aSuperSecretKey' 
```

#### Los archivos siguen el formato CSV estricto con las siguientes columnas:

| Columna | Descripción |
|----------|--------|
file | el nombre del archivo.
text | un texto de largo variable
number | un numero 
hex | un hexadecimal de 32 dígitos

#### Ejemplo del contenido de un archivo con información correctamente formateada:

```csv
file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5
file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3
e29651a63a5202a5661e05a060401fb
file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252
```

---

## ¿Cómo procesar la información?

1. Se deben llamar al listado de archivos /v1/secret/files
2. Descargar cada file usando /v1/secret/file/{file}
3. Formatear la información en los CSV: 
   - Tener en cuenta que pueden existir archivos vacíos y líneas con error (que no tenga la cantidad de datos suficientes).
   - Si una línea tiene error se debe descartar.
   - También pueden existir errores al descargar un archivo.
4. Por cada archivo, se debe crear un objeto JSON que contenga las líneas válidas.

Un objeto JSON pedido a partir de un archivo debe seguir el siguiente schema

```javascript
{
   "file": "file1.csv",
   "lines": [
      {
         "text" :"RgTya",
         "number": 64075909,
         "hex": "70ad29aacf0b690b0467fe2b2767f765"
      },
      . . .
   ]
}
```

Usando NodeJS + ExpressJS, se debe crear el API para funcionar desde el siguiente endpoint:

```path
GET /files/data
```

Este endpoint es el encargado de buscar los archivos y formatear la información tal como se indicó en los pasos descritos previamente. Toda la información generada por el API deberá ser definida como content-type: application/json

Una respuesta 200 en caso de éxito se deberá ver como sigue:

```javascript
[
   {
      "file": "file1.csv",
      "lines": [
         {
            "text" :"RgTya",
            "number": 64075909,
            "hex": "70ad29aacf0b690b0467fe2b2767f765"
         },
         . . .
      ]
   }
]
```

Ejemplo usando cURL (llamada y respuesta):

```javascript
$ curl -v -X GET "http://apihost/files/data" -H "accept: application
```

```javascript
> GET /files/data HTTP/1.1
> Host: apihost
> User-Agent: curl/7.68.0
> accept: application/json
> 
< HTTP/1.1 200 OK
< Date: Mon, 19 Oct 2020 15:18:53 GMT
< Content-Type: application/json; charset=utf-8
< Content-Length: 15
< Connection: keep-alive
[
   {
      "file": "file1.csv",
      "lines": [
         {
            "text" :"RgTya",
            "number": 64075909,
            "hex": "70ad29aacf0b690b0467fe2b2767f765"
         },
         . . .
      ]
   }
]
```

También se deben crear los tests que validan el API usando Mocha + Chai

Los tests deben poder correrse usando `npm test` y el API debe poder iniciarse usando `npm start`

## Requisitos para el código del API
- El código que envíes debe correr usando NodeJS 14  y no depender de librerías que están instaladas de forma global, variables de entorno o configuraciones de algún sistema operativo especifico.
- El código debe ser escrito en  JavaScript (ES6+), no utilizar: Babel, TypeScript, Dart, Elm, etc.
- En cuanto a las librerías y frameworks, puede usar la versión que consideres apropiadas:
  - ExpressJS
  - Mocha
  - Chai

# FRONT-END
Deberás desarrollar una app en React que deberá actuar como cliente del API ya desarrollado y que permita ver la información de /files/data de manera ordenada en pantalla

## Layout

Usando React + React Bootstrap se debe crear una pantalla similar a la que se muestra en el siguiente wireframe

## Requisitos para el código *frontend*

- Se deberá usar programación funcional y Hook Effects en React.
- El código que envíes debe correr usando NodeJS 16 y no depender de librerías instaladas de forma global, variables de entorno o configuraciones de algún sistema operativo especifico.
- El código debe ser escrito en JavaScript (ES6+)
- No están permitidas las siguientes herramientas: TypeScript, Dart, Elm, ni similares
- En cuanto a las librerías y frameworks, puedes usar la versión que consideres apropiadas de:
  - Webpack
  - React
  - React Bootstrap

# PUNTOS OPCIONALES

## Puntos opcionales para el *backend*
* Un endpoint `GET /files/` que dé como respuesta la lista de archivos disponibles tal cual como se la muestra en el API Externa.
* Agregar un filtro por query params para poder pedir los datos de un archivo especifico:
   `files/data?fileName=<Nombre del archivo>`
* Usar StandardJS

## Puntos opcionales para el *frontend*
- Usar Redux
- Test unitarios usando Jest
- Poder filtrar por `fileName` usando el punto opcional del API de listado de archivos y filtro por queryparams

## Punto opcional global
- Usar Docker o Docker Compose para correr las apps.