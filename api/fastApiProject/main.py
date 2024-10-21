# main.py
from fastapi import FastAPI, HTTPException
from mongo_utils import connect_to_mongo, list_databases, list_collections, get_all_documents, get_documents_with_filter, get_documents_with_projection
import config
from fastapi.middleware.cors import CORSMiddleware

# Crear una instancia de la aplicación FastAPI
app = FastAPI(
    title="MongoDB API",
    description="API para interactuar con una base de datos MongoDB, proporcionando operaciones de consulta y recuperación de datos.",
    version="1.0.0"
)

# Configurar CORS para permitir peticiones desde cualquier origen
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectar a MongoDB utilizando la cadena de conexión desde la configuración
client = connect_to_mongo(config.connection_string)

# Endpoint raíz para verificar si la API está funcionando
@app.get("/", summary="Endpoint raíz", tags=["General"])
async def root():
    """
    Devuelve un mensaje de bienvenida para comprobar que la API está funcionando correctamente.
    """
    return {"message": "Hello World"}

# Endpoint para saludar a un usuario por su nombre
@app.get("/hello/{name}", summary="Saludar a un usuario", tags=["General"])
async def say_hello(name: str):
    """
    Saluda al usuario proporcionando su nombre.

    - **name**: El nombre del usuario a saludar.
    """
    return {"message": f"Hello {name}"}

# Endpoint para listar todas las bases de datos disponibles
@app.get("/databases", summary="Listar bases de datos", tags=["MongoDB"])
async def get_databases():
    """
    Obtiene una lista de todas las bases de datos disponibles en el cliente MongoDB.
    """
    databases = list_databases(client)
    if not databases:
        raise HTTPException(status_code=404, detail="No databases found")
    return {"databases": databases}

# Endpoint para listar todas las colecciones de una base de datos especificada
@app.get("/collections/{db_name}", summary="Listar colecciones", tags=["MongoDB"])
async def get_collections(db_name: str):
    """
    Lista todas las colecciones de una base de datos proporcionada.

    - **db_name**: El nombre de la base de datos.
    """
    collections = list_collections(client, db_name)
    if not collections:
        raise HTTPException(status_code=404, detail=f"No collections found in database {db_name}")
    return {"collections": collections}

# Endpoint para obtener todos los documentos de una colección especificada
@app.get("/documents/{db_name}/{collection_name}", summary="Obtener documentos", tags=["MongoDB"])
async def get_documents(db_name: str, collection_name: str):
    """
    Obtiene todos los documentos de una colección específica.

    - **db_name**: El nombre de la base de datos.
    - **collection_name**: El nombre de la colección.
    """
    documents = get_all_documents(client, db_name, collection_name)
    if not documents:
        raise HTTPException(status_code=404, detail=f"No documents found in collection {collection_name}")
    return {"documents": documents}

# Endpoint para obtener documentos filtrados por un campo específico
@app.get("/documents/{db_name}/{collection_name}/filter", summary="Obtener documentos con filtro", tags=["MongoDB"])
async def get_filtered_documents(db_name: str, collection_name: str, age: int = None):
    """
    Obtiene documentos de una colección que cumplen con un filtro específico.

    - **db_name**: El nombre de la base de datos.
    - **collection_name**: El nombre de la colección.
    - **age**: (Opcional) Filtro por edad.
    """
    filter = {}
    if age is not None:
        filter["age"] = age
    documents = get_documents_with_filter(client, db_name, collection_name, filter)
    if not documents:
        raise HTTPException(status_code=404, detail=f"No documents found with filter {filter}")
    return {"documents": documents}

# Endpoint para obtener documentos con filtro y proyección
@app.get("/documents/{db_name}/{collection_name}/projection", summary="Obtener documentos con proyección", tags=["MongoDB"])
async def get_projected_documents(db_name: str, collection_name: str, age: int = None):
    """
    Obtiene documentos de una colección aplicando un filtro y una proyección específicos.

    - **db_name**: El nombre de la base de datos.
    - **collection_name**: El nombre de la colección.
    - **age**: (Opcional) Filtro por edad.
    """
    filter = {}
    if age is not None:
        filter["age"] = age
    projection = {"_id": 0, "age": 1, "gender": 1}
    documents = get_documents_with_projection(client, db_name, collection_name, filter, projection)
    if not documents:
        raise HTTPException(status_code=404, detail=f"No documents found with filter {filter} and projection {projection}")
    return {"documents": documents}