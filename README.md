
# Prueba tecnica woitasen

Woitasen es una aplicación dockerizada de punto a punto diseñada para la gestión de órdenes de clientes. La aplicación cuenta con una arquitectura completa que incluye:

Base de datos: PostgreSQL, para almacenamiento confiable y estructurado de la información de órdenes y clientes.

Backend: Desarrollado en TypeScript, implementando patrones de diseño como Repository, con respuestas estandarizadas que aseguran consistencia y claridad en la comunicación con el frontend.

Frontend: Construido con TypeScript y Vite, utilizando el Observer Pattern para mantener sincronizada la interfaz con los cambios en el CRUD de órdenes, ofreciendo una experiencia de usuario reactiva y eficiente.

La aplicación permite gestionar de manera completa el ciclo de vida de las órdenes de los clientes, desde la creación hasta la actualización y eliminación, garantizando un flujo de trabajo claro y organizado tanto para usuarios como para administradores.


## Tech Stack

**Cliente:** React, Typescript, Tanstack query

**Servidor:** Node, Express, Typescript, Drizzle orm, Postgresql

**Infraestructura**: Docker compose


## Variables de entorno

Para que el proyecto funcione se debe usar las siguientes variables de entorno en la carpeta raiz del proyecto

# FRONTEND

`FRONTEND_PORT`
`VITE_BASE_URL`

# BACKEND

`FRONT_URL`
`BACKEND_PORT`
`NODE_ENV`
`HOST`
`DATABASE_URL`

# DATABASE

`POSTGRES_USER`
`POSTGRES_PASSWORD`
`POSTGRES_DB`
`POSTGRES_PORT`



# Instalacion

Parado en la carpeta raiz del proyecto ejecutar el siguiente comando


## Sistemas windows
```bash
    npm run init:windows
```

## Sistemas unix
```bash
    npm run init:unix
```
