FROM python:3.8
WORKDIR /app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 3002

# we can set the ENV to production and use gunicorn instead of the flask command for a prod ready image
CMD ["flask", "run", "--host=0.0.0.0", "-p", "3002"]
