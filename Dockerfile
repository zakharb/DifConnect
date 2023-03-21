FROM python:3.10-slim

COPY requirements.txt /app/

RUN pip install -r /app/requirements.txt \
    && rm -rf /root/.cache/pip

COPY src/difconnect/ /app/difconnect

ENV PYTHONPATH "${PYTHONPATH}:/app"

CMD ["python3", "/app/difconnect", "get"] 
