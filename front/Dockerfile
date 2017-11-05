FROM nginx:latest

EXPOSE 80

# Createa working directory
RUN mkdir -p /usr/src/app

# Add nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

# Install nodejs
RUN apt-get update && apt-get install -my wget gnupg curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs build-essential

# Install node_modules/
WORKDIR /tmp
COPY ./package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Build static files
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build
