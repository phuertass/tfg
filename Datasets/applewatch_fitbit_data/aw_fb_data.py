import pandas as pd
import os

# Nombre del archivo CSV
csv_filename = "aw_fb_data.csv"

# Verificar si el archivo existe
if not os.path.isfile(csv_filename):
    print(f"El archivo {csv_filename} no existe.")
    exit()

# Leer el archivo CSV usando pandas
df = pd.read_csv(csv_filename)

# Filtrar los datos por tipo de dispositivo
apple_watch_data = df[df['device'].str.lower() == 'apple watch'].head(10)
fitbit_data = df[df['device'].str.lower() == 'fitbit'].head(10)

# Mostrar los datos de Apple Watch y Fitbit
print("Datos de Apple Watch:")
print(apple_watch_data)

print("\nDatos de Fitbit:")
print(fitbit_data)
