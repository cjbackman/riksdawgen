import os
from flask import Flask


def create_app(config):
    app = Flask(__name__)
    # Load given stage config
    app.config.from_object(config)
    # Override with user config, if exists
    app.config.from_envvar('USER_CONFIG', silent=True)
    # Register blueprints within app context
    with app.app_context():
        #from errors import blueprint_errors
        # app.register_blueprint(blueprint_errors)
        from api import blueprint_api
        app.register_blueprint(blueprint_api, url_prefix='/api')

    return app


# Use specifed environment config if set, otherwise production
config = os.environ.get(
    'ENVIRONMENT_CONFIG') or 'configs.config.ProductionConfig'
app = create_app(config)

if __name__ == '__main__':
    app.run()
