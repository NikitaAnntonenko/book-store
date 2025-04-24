import os
import time
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# ===== 1. Зчитування параметрів з environment variables =====
POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'password')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')
POSTGRES_DB = os.getenv('POSTGRES_DB', 'bookstore_db')
TABLE_NAME = 'books'

KAGGLE_DATASET = 'zygmunt/goodbooks-10k'

DATA_PATH = '/app/data'
CSV_FILE_PATH = os.path.join(DATA_PATH, 'books.csv')

# ===== 2. Функція для очікування запуску PostgreSQL =====
def wait_for_postgres(engine, retries=10, delay=5):
    for i in range(retries):
        try:
            with engine.connect() as conn:
                print("✅ PostgreSQL is ready!")
                return True
        except OperationalError:
            print(f"⏳ Waiting for PostgreSQL... ({i+1}/{retries})")
            time.sleep(delay)
    print("❌ Could not connect to PostgreSQL.")
    return False

# ===== 3. Підготовка підключення до БД =====
engine = create_engine(f'postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}')

if wait_for_postgres(engine):

    # ===== 4. Завантаження датасету з Kaggle =====
    print("📥 Downloading dataset from Kaggle...")
    os.system(f'kaggle datasets download -d {KAGGLE_DATASET} --unzip -p {DATA_PATH}')

    # ===== 5. Завантаження CSV у DataFrame =====
    print("📊 Reading CSV file...")
    df = pd.read_csv(CSV_FILE_PATH)

    # Вибір полів та перейменування
    df = df[['book_id', 'title', 'authors', 'average_rating', 'isbn', 'language_code',
             'num_pages', 'ratings_count', 'publication_date', 'publisher']]

    df = df.rename(columns={
        'book_id': 'id',
        'average_rating': 'rating',
        'language_code': 'language',
        'num_pages': 'pages',
        'ratings_count': 'ratings'
    })

    # ===== 6. Імпорт у PostgreSQL =====
    print(f"🚀 Importing {len(df)} books into PostgreSQL...")
    df.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

    print("✅ Import completed successfully!")

else:
    print("❌ Failed to connect to PostgreSQL. Exiting.")
