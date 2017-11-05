"""Test Python App"""
from flask import Flask, jsonify
from flask_restplus import Api, Resource
from flask_cors import CORS, cross_origin
from api.members import members
from redis import StrictRedis
import json

APP = Flask(__name__)
CORS(APP)
api = Api(APP)

# Load configuration settings
try:
    APP.config.from_envvar('FLASK_SETTINGS')
except:
    # Use default settings if no settings specified.
    APP.config['REDIS_SERVER'] = 'localhost'
    # APP.config['DEBUG'] = True


REDIS = StrictRedis(host=APP.config[
                    'REDIS_SERVER'], port=6379, charset="utf-8", decode_responses=True)

# NOTE: Modules relying on REDIS cannot be imported until REDIS is created.
from api.endpoints.member_api import ns as member_api
from api.endpoints.members_api import ns as members_api

# Add all namespaces from submodules
api.add_namespace(member_api)
api.add_namespace(members_api)

@APP.before_first_request
def fetch_data():
    MP = members()
    members.fetch_data(MP)

    filt_data = members.get_output_data(MP)
    REDIS.set("members", json.dumps(filt_data))

    for p in filt_data['members']:
        member_data = members.get_member_data(MP, p['member_id'])
        REDIS.set(p['member_id'], json.dumps(member_data))


@APP.before_request
def connect_to_data():
    if REDIS.exists("members") is False:
        print("MP is None, forced to fetch new. This shall not happen.")
        fetch_data()

# Only to enable easy debugging on host development machines, without running gunicorn server.
# Do not use flask server in production...
#if __name__ == '__main__':
#    APP.run(debug=True)
