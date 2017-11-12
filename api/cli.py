import sys
from app import create_app, configs

if __name__ == '__main__':
    if len(sys.argv) > 1:
        env = sys.argv[1]
        if env != 'dev' and env != 'prod':
            raise ValueError('Only dev and prod allowed as input environment.')
        config = configs[env]
    else:
        raise ValueError('Please provide which config you want to use.')

    print('Starting app with config {}'.format(config))
    dev_app = create_app(config)
    dev_app.run()