# SIMA — Sistema Inteligente de Monitoreo de Agua

## 1. Descripción del proyecto

SIMA (Sistema Inteligente de Monitoreo de Agua) es un sistema diseñado para facilitar el seguimiento y control del consumo de agua. Su propósito es permitir la consulta de información relacionada con el consumo, las lecturas de los medidores, la facturación y las alertas, mediante una plataforma centralizada.

El proyecto busca promover el uso responsable del agua y facilitar la gestión de la información asociada a su consumo.

## 2. Objetivo general

Desarrollar una plataforma que permita gestionar y consultar información sobre el consumo de agua, contribuyendo al monitoreo y al uso eficiente de este recurso.

## 3. Funcionalidades

- **Autenticación:** registro e inicio de sesión de usuarios.
- **Gestión de usuarios:** administración de la información de los usuarios.
- **Medidores:** gestión de los medidores de agua.
- **Lecturas:** registro y consulta de las lecturas de consumo.
- **Consumo:** consulta de información relacionada con el consumo de agua.
- **Facturación:** gestión de información de facturación.
- **Alertas:** gestión de alertas relacionadas con el sistema.

*Nota: las funcionalidades disponibles dependen de los módulos implementados en la versión actual.*

## 4. Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express.js:** desarrollo de la API y las rutas del servidor.
- **MySQL:** gestión de la base de datos relacional.
- **JSON Web Token (JWT):** autenticación mediante tokens.
- **XAMPP:** entorno local para administrar MySQL y phpMyAdmin.
- **Git y GitHub:** control de versiones y trabajo colaborativo.

## 5. Requisitos previos

Antes de ejecutar el proyecto, se necesita tener instalado:

- Node.js y npm.
- XAMPP con MySQL.
- Git.
- Un cliente para probar la API, como Thunder Client o Postman.

## 6. Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/sara-ramirez6/proyecto_sima.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd proyecto_sima
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar MySQL desde XAMPP y preparar la base de datos `sima_db` con su estructura correspondiente.

5. Crear el archivo `.env` en la raíz del proyecto y configurar las variables de conexión a la base de datos y el secreto JWT, de acuerdo con la configuración de la aplicación.

6. Iniciar el servidor con el comando definido en `package.json`.

7. Si la configuración local utiliza el puerto 3000, acceder a:

   `http://localhost:3000`

## 7. Autenticación

La API cuenta con endpoints para el registro y el inicio de sesión. Al iniciar sesión correctamente, el servidor genera un token JWT que debe enviarse en las solicitudes a las rutas protegidas mediante el encabezado `Authorization: Bearer <token>`.

## 8. Trabajo colaborativo

El proyecto utiliza Git y GitHub para gestionar los cambios realizados por los integrantes del equipo. La rama principal de integración es `main`.

## 9. Estado del proyecto

Proyecto académico en desarrollo para la carrera de Ingeniería de Sistemas de UNIMINUTO.
