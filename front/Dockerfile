FROM nginx:latest

EXPOSE 80

# Set working directory
RUN mkdir -p /usr/src/app

# Add nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets into /usr/src
COPY ./dist /usr/src/app
