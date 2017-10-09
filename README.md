Riksdawgen
=========

### Quickstart

Add the following line to `/etc/host`

```127.0.0.0 riksdawgen```

Install all dependencies by

```npm install```

**Note:** if it fails, try `npm install -g webpack webpack-dev-server`.

Build and bundle the static files with

```npm run build```

Finally, start the service by running

```docker-compose up```

This should result in http://riksdawgen:8080 in the front and http://riksdawgen:8080/api in the back. Endpoint example: http://riksdawgen:8080/api/hello.