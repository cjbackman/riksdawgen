Riksdawgen
=========

## Quickstart

Add the following line to `/etc/host`

```127.0.0.1 riksdawgen```

Install all dependencies (if this step fails, follow the instructions at the end of this README)

```cd front/ && npm install```

Build and bundle the static files with

```npm run build```

Finally, start the service by running

```cd ../ && docker-compose up```

This should result in http://riksdawgen:8080 in the front and http://riksdawgen:8080/api in the back. Endpoint example: http://riksdawgen:8080/api/hello.

Kill the service with `Ctrl+C` and shut down the containers by `docker-compose down`.

## If `npm install` fails

First, try

```
npm install -g webpack webpack-dev-server
```

If this does not work, go with (worked on a Ubuntu 14.04)

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash --
sudo apt-get install nodejs
npm install
```

