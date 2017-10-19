"""Test Python App"""
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from personlista import personlista
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

REDIS = StrictRedis(host=APP.config['REDIS_SERVER'], port=6379, charset="utf-8", decode_responses=True)

@APP.before_first_request
def fetch_data():
	PL = personlista()
	personlista.fetch_data(PL)

	filt_data = personlista.get_output_data(PL)
	REDIS.set("personlista",json.dumps(filt_data));

	for p in filt_data['persons']:
		REDIS.set(p['intressent_id'], json.dumps(p))
		
		

@APP.before_request
def connect_to_data():
	if REDIS.exists("personlista") is False:
		print("PL is None, forced to fetch new. This shall not happen.")
		fetch_data()

@APP.route('/api/person/<string:intressent_id>', methods=['GET'])
def get_person(intressent_id):
	person = REDIS.get(intressent_id)
	
	if(person is None):
		person="{}"

	return jsonify(json.loads(person))

@APP.route("/api/personlista")
def get_filt():
	personlista = REDIS.get("personlista")
	return jsonify(json.loads(personlista))

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


