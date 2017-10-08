FROM tiangolo/uwsgi-nginx-flask:python3.6

# Settings
ENV STATIC_INDEX 1
ENV STATIC_PATH dist/

# Backend
#RUN pip install -U pip
#RUN pip install -r requirements.txt

# Frontend
RUN apt-get -y update && \
    apt-get -y install build-essential && \
    curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get install -y nodejs

COPY . /
WORKDIR /

RUN npm install
RUN npm build

ENV MESSAGE "Welcome to Riksdawgen"