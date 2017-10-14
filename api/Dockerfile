FROM python:3-slim

EXPOSE 5000

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add requirements file
ADD ./requirements.txt /usr/src/app/requirements.txt

# Install requirements
RUN pip install -r requirements.txt

# Add the app
ADD . /usr/src/app

# run server
ENTRYPOINT ["gunicorn", "-b", ":5000", "app:APP"]

