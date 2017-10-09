FROM nginx:latest

EXPOSE 80

# Set working directory
RUN mkdir -p /usr/src/app

# Add nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets into /usr/src
COPY ./dist /usr/src/app
COPY ./node_modules /usr/src/app/node_modules
