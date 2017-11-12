import os
import sys
from flask import Flask


def create_app(config):
    app = Flask(__name__)
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

# Use specifed environment config if set, otherwise production
config = configs[os.environ.get('DEPLOY_ENV', 'prod')]
app = create_app(config)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        env = sys.argv[1]
        if env != 'dev' and env != 'prod':
            raise ValueError('Only dev and prod allowed as input environment.')
        config = configs[env]
    else:
        config = configs[os.environ.get('DEPLOY_ENV', 'prod')]

    print('Starting app with config {}'.format(config))
    dev_app = create_app(config)
    dev_app.run()
