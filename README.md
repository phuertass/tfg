# Proyecto TFG: Análisis de Relojes de Salud Inteligentes

Este proyecto forma parte de mi Trabajo de Fin de Grado (TFG) y tiene como objetivo analizar los datos recopilados por diferentes relojes de salud inteligentes, específicamente Apple Watch, Garmin y Fitbit. El enfoque principal está en cómo estos dispositivos monitorean la salud y la actividad física, y cómo se pueden usar esos datos para obtener información útil.

## Descripción del Proyecto
El proyecto se centra en analizar los tipos de datos que recopilan los dispositivos Apple Watch, Garmin y Fitbit. Estos datos incluyen métricas como la frecuencia cardíaca, la cantidad de pasos, las calorías quemadas, entre otros. A través de una serie de scripts y análisis, el proyecto tiene como objetivo analizar y mostrar dichos datos.

El repositorio contiene el código fuente para el análisis, los scripts de configuración del entorno de desarrollo, y las instrucciones detalladas para la instalación y configuración de todas las herramientas necesarias.

## Estructura del Proyecto
- **app/**: Contiene la aplicación principal, que incluye tanto el back-end desarrollado en FastAPI como el front-end en React.
- **scripts/**: Scripts útiles para la instalación y configuración del entorno de desarrollo.
- **docs/**: Documentación relacionada con el proyecto, incluyendo la configuración del entorno y las instrucciones para la ejecución.
- **README.md**: Este archivo, que proporciona una visión general del proyecto.

## Configuración del Entorno de Desarrollo
Para configurar el entorno de desarrollo, he desarrollado un script automatizado en Linux que permite instalar todas las herramientas necesarias para trabajar en el proyecto. Estas herramientas incluyen:

- **Python 3**
- **Node.js y npm** (para React)
- **FastAPI y Uvicorn** (para el back-end)
- **JetBrains IntelliJ IDEA y PyCharm** (IDEs para el desarrollo)

Puedes encontrar el script en el directorio `scripts/` bajo el nombre `install_dev_tools.sh`. Para ejecutarlo, usa el siguiente comando:

```bash
bash scripts/install_dev_tools.sh
```

Este script instalará todas las herramientas y configurará el entorno automáticamente.

## Configuración de Git
Para crear un repositorio centralizado y subir el proyecto a GitHub, seguí estos pasos:

- Inicialicé un repositorio Git local y configuré mi identidad (nombre y correo).
- Añadí todos los archivos al área de preparación e hice un commit inicial.
- Creé un repositorio en GitHub y lo vinculé al proyecto local.
- Como GitHub ya no permite la autenticación con contraseña, generé un Token de Acceso Personal (PAT) y lo usé para autenticarme al realizar el `push` inicial.
- Realicé un `pull` para fusionar los cambios remotos (como el archivo README) antes de subir mis propios cambios.

## Cómo Ejecutar el Proyecto
Para ejecutar el proyecto, asegúrate de tener todo el entorno configurado correctamente. Luego sigue estos pasos:

1. **Iniciar el back-end**:
   ```bash
   uvicorn app.main:app --reload
   ```
   Esto iniciará el servidor local de FastAPI.

2. **Iniciar el front-end**:
   ```bash
   cd app/front_app
   npm start
   ```
   Esto iniciará la aplicación React en el navegador.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor crea un pull request o abre un issue con sugerencias o problemas que hayas encontrado.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.

## Contacto
Si tienes alguna duda o comentario, no dudes en contactarme a través de mi perfil de GitHub: [phuertass](https://github.com/phuertass).
