import pandas as pd
import os

# Nombre del archivo CSV proporcionado
csv_filename = 'daily_fitbit_sema_df_unprocessed.csv'

# Verificar si el archivo existe
if not os.path.isfile(csv_filename):
    print(f"El archivo {csv_filename} no existe.")
    exit()

# Leer el archivo CSV usando pandas
df = pd.read_csv(csv_filename)


print(df.head(10))
