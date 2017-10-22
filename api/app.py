"""Test Python App"""
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from members import members
from redis import StrictRedis
import json


APP = Flask(__name__)
CORS(APP)

# Load configuration settings
try:
    APP.config.from_envvar('FLASK_SETTINGS')
except:
    # Use default settings if no settings specified.
    APP.config['REDIS_SERVER'] = 'localhost'
    # APP.config['DEBUG'] = True

REDIS = StrictRedis(host=APP.config[
                    'REDIS_SERVER'], port=6379, charset="utf-8", decode_responses=True)


@APP.before_first_request
def fetch_data():
    MP = members()
    members.fetch_data(MP)

    filt_data = members.get_output_data(MP)
    REDIS.set("members", json.dumps(filt_data))

    for p in filt_data['members']:
        REDIS.set(p['member_id'], json.dumps(p))


@APP.before_request
def connect_to_data():
    if REDIS.exists("members") is False:
        print("MP is None, forced to fetch new. This shall not happen.")
        fetch_data()


@APP.route('/api/member/<string:member_id>', methods=['GET'])
def get_member(member_id):
    member = REDIS.get(member_id)

    if(member is None):
        member = "{}"

    return jsonify(json.loads(member))


@APP.route("/api/members")
def get_filt():
    members_list = REDIS.get("members")
    return jsonify(json.loads(members_list))


@APP.route("/api")
def welcome():
    """Welcome Text"""
    return "Welcome Riksdawgen's API! The end of the rainbow, where G&T brings you magic."


@APP.route("/api/hello")
def hello():
    return "Hello World"

# Only to enable easy debugging on host development machines, without running gunicorn server.
# Do not use flask server in production...
if __name__ == '__main__':
    APP.run(debug=True)
