FROM nginx:latest

EXPOSE 80

# Set working directory
RUN mkdir -p /usr/src/app

# Add nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Install dependencies and nodejs
RUN apt-get update && apt-get install -my wget gnupg
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Install mf node_modules/
WORKDIR /tmp
COPY ./package.json ./package-lock.json ./webpack.common.js ./webpack.dev.js ./webpack.prod.js ./.eslintrc.json ./.babelrc /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Build static files
WORKDIR /usr/src/app
COPY . /usr/src/app/ # Slim this later and only copy what's neccessary
RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build
