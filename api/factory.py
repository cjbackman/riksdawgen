from flask import Flask
from flask_cors import CORS, cross_origin

def create_app(config):
    app = Flask(__name__)
    CORS(app)
    # Load given stage config
    app.config.from_object(config)
    # Override with user config, if exists
    app.config.from_envvar('USER_CONFIG', silent=True)
    # Make imports within app context
    with app.app_context():
        from api import blueprint_api
    # Register all blueprints
    app.register_blueprint(blueprint_api, url_prefix='/api')

    return app


configs = {
    'dev': 'configs.config.DevelopmentConfig',
    'prod': 'configs.config.ProductionConfig'
}