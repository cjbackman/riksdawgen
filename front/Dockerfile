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

COPY ./package.json ./package-lock.json ./webpack.common.js ./webpack.dev.js ./webpack.prod.js ./.eslintrc.json ./.babelrc /tmp/
RUN mkdir /tmp/src/
COPY ./src/ /tmp/src/
RUN cd /tmp && npm install && npm run build

# Copy static assets into /usr/src
COPY /dist /usr/src/app
