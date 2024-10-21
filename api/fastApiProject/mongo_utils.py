# mongo_utils.py
from pymongo import MongoClient

# Conecta a MongoDB Atlas utilizando una cadena de conexión proporcionada
def connect_to_mongo(connection_string):
    try:
        # Crea una instancia de MongoClient usando la cadena de conexión
        client = MongoClient(connection_string)
        print("Conexión exitosa")
        return client
    except Exception as e:
        # Imprime un mensaje de error si no se pudo conectar a MongoDB Atlas
        print("No se pudo conectar a MongoDB Atlas: %s" % e)
        return None

# Lista todas las bases de datos en el cliente proporcionado
def list_databases(client):
    try:
        # Obtiene los nombres de las bases de datos
        databases = client.list_database_names()
        return databases
    except Exception as e:
        # Imprime un mensaje de error si no se pudieron listar las bases de datos
        print("Error al listar las bases de datos: %s" % e)
        return []

# Lista todas las colecciones en una base de datos especificada
def list_collections(client, db_name):
    try:
        # Selecciona la base de datos por nombre
        db = client[db_name]
        # Obtiene los nombres de las colecciones en la base de datos
        collections = db.list_collection_names()
        return collections
    except Exception as e:
        # Imprime un mensaje de error si no se pudieron listar las colecciones
        print("Error al listar las colecciones: %s" % e)
        return []

# Obtiene todos los documentos de una colección especificada, excluyendo el campo "_id"
def get_all_documents(client, db_name, collection_name):
    try:
        # Selecciona la base de datos por nombre
        db = client[db_name]
        # Selecciona la colección por nombre
        collection = db[collection_name]
        # Define una proyección para excluir el campo "_id"
        projection = {"_id": 0}
        # Obtiene todos los documentos de la colección aplicando la proyección
        documents = list(collection.find({}, projection))
        return documents
    except Exception as e:
        # Imprime un mensaje de error si no se pudieron obtener los documentos
        print("Error al obtener los documentos: %s" % e)
        return []

# Obtiene documentos de una colección aplicando un filtro especificado, excluyendo el campo "_id"
def get_documents_with_filter(client, db_name, collection_name, filter):
    try:
        # Selecciona la base de datos por nombre
        db = client[db_name]
        # Selecciona la colección por nombre
        collection = db[collection_name]
        # Define una proyección para excluir el campo "_id"
        projection = {"_id": 0}
        # Obtiene los documentos que cumplen con el filtro especificado
        documents = list(collection.find(filter, projection))
        return documents
    except Exception as e:
        # Imprime un mensaje de error si no se pudieron obtener los documentos con el filtro
        print("Error al obtener los documentos con filtro: %s" % e)
        return []

# Obtiene documentos de una colección aplicando un filtro y una proyección especificados
def get_documents_with_projection(client, db_name, collection_name, filter, projection):
    try:
        # Selecciona la base de datos por nombre
        db = client[db_name]
        # Selecciona la colección por nombre
        collection = db[collection_name]
        # Asegura que el campo "_id" esté excluido de la proyección
        projection["_id"] = 0
        # Obtiene los documentos que cumplen con el filtro y aplica la proyección
        documents = list(collection.find(filter, projection))
        return documents
    except Exception as e:
        # Imprime un mensaje de error si no se pudieron obtener los documentos con la proyección
        print("Error al obtener los documentos con proyección: %s" % e)
        return []