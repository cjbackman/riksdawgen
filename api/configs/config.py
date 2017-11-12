class BaseConfig(object):
    pass

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    REDIS_SERVER = 'localhost'
    SERVER_NAME = "riksdawgen:5000"


class ProductionConfig(BaseConfig):
    DEBUG = False
    REDIS_SERVER = 'redis'
    #SERVER_NAME = "riksdawgen:5000"
