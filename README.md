# Atom - Tasks API REST Challenge 📋
Para el challenge de Atom decidí hacer uso de la arquitectura **MVC** para tener un código modular que me ayude a facilitar las pruebas y la escalabilidad.

Las tecnologías que usé para el backend fueron **Express** y **Typescript**, **Firestore** como base de datos NoSQL y **Jest** para las pruebas unitarias.

El proyecto consiste en un **API REST** de tasks que nos permitirá crear, actualizar y eliminar una tarea además de listar todas las tareas existentes.

### API 🚀
[Link de la API deployada](https://atom-tasks.onrender.com/)

## Requirements
- Node JS 
- Yarn
- Firebase

## Pasos para correr el proyecto
1. Ejecuta el comando `yarn install` para instalar las dependencias.
2. Copia el contenido de archivo `.env.example` a `.env` y completa los campos.
3. Para correr el servidor en desarrollo puedes usar el comando `yarn dev`

## Detalles de Firebase
Para obtener los las llaves necesarias de Firebase en el `.env` deberás entrar a Configuración del proyecto / Cuentas de servicio, allí podrás generar una clave privada que te proporcionará los datos requeridos para probar el proyecto.

## Detalles del Servidor

### Endpoints

- _GET:_ /tasks

  - Output

    ```json
    [
      {
        "id": "",
        "title": "",
        "description": "",
        "status": ""
      }
    ]
    ```

- _POST:_ /tasks

  - Input

    ```json
    {
      "title": "",
      "description": "",
      "status": ""
    }
    ```

  - Output

    ```json
    {
      "id": "",
      "title": "",
      "description": "",
      "status": ""
    }
    ```

- _PUT:_ /tasks/{id}

  - Input

    ```json
    {
      "title": "",
      "description": "",
      "status": ""
    }
    ```

  - Output

    ```json
    {
      "id": "",
      "title": "",
      "description": "",
      "status": ""
    }
    ```

- _DELETE:_ /tasks/{id}

## Pasos para ejecutar y validar las pruebas en desarrollo
1. Ejecuta el comando `yarn test` y valida que todos los tests hayan pasado.


### Galería
![image](https://github.com/MistyBlunch/atom-test/assets/29315728/8bc62876-1d5e-4a16-b81e-012b1b340e42)


