import os
import sys
from factory import create_app, configs

# Use specifed environment config if set, otherwise production
config = configs[os.environ.get('DEPLOY_ENV')]
app = create_app(config)
