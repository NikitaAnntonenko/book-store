FROM python:3.10-slim

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY import_books.py .

COPY kaggle.json /root/.kaggle/kaggle.json

RUN chmod 600 /root/.kaggle/kaggle.json

CMD ["python", "import_books.py"]
