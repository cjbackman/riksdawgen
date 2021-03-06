Riksdawgen's API
=========

### Quickstart UNIX

Start the development server by running (you need redis running on localhost:6379)

```export DEPLOY_ENV=dev && python app.py```

### Quickstart Windows

Start the development server by running (you need redis running on localhost:6379)

```python app.py dev```

### Configuration

There are three sources of configuration:

1. Basic environment configuration (**configs/config.py**)
2. Personal configuration (optional)
3. Environment variables

Which environment configuration to use is defiend through the environment variable `DEPLOY_ENV`. Furthermore, if there is a need for a personal config, simply set the environment variable `USER_CONFIG` to the path where your personal config resides. This path is relative to the where the Flask app is created.