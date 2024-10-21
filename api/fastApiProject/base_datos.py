# main.py
from mongo_utils import connect_to_mongo, list_databases, list_collections, get_all_documents, \
    get_documents_with_filter, get_documents_with_projection
import config


def main():
    # Conectar a MongoDB
    client = connect_to_mongo(config.connection_string)
    if not client:
        return

    # Listar bases de datos
    databases = list_databases(client)
    print("Bases de datos disponibles:")
    for db in databases:
        print(db)

    # Seleccionar base de datos (por ejemplo, 'health_data')
    db_name = 'health_data'

    # Listar colecciones
    collections = list_collections(client, db_name)
    print("\nColecciones disponibles en la base de datos '{}':".format(db_name))
    for col in collections:
        print(col)

    # Obtener todos los documentos de una colección específica
    collection_name = 'aw_data'  # Reemplaza con el nombre de tu colección
    documents = get_all_documents(client, db_name, collection_name)
    print("\nTodos los documentos en la colección '{}':".format(collection_name))
    print("Tamaño de la colección: {}".format(len(documents)))

    # Obtener documentos con un filtro
    filter = {"age": 20}  # Reemplaza con tu filtro deseado
    filtered_documents = get_documents_with_filter(client, db_name, collection_name, filter)
    print("\nDocumentos con filtro (age: 20) en la colección '{}':".format(collection_name))
    print("Tamaño de la colección: {}".format(len(filtered_documents)))
    #
    # Obtener documentos con un filtro y una proyección
    projection = {"_id": 0, "age": 1, "gender": 1, "Applewatch":1}  # Reemplaza con tu proyección deseada
    projected_documents = get_documents_with_projection(client, db_name, collection_name, filter, projection)
    print("\nDocumentos con filtro y proyección (age: 20, mostrando solo age y gender) en la colección '{}':".format(
        collection_name))
    for doc in projected_documents:
        print(doc)


if __name__ == "__main__":
    main()