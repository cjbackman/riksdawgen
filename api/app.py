"""Test Python App"""
from flask import Flask
from flask import jsonify
from personlista import personlista


APP = Flask(__name__)

@APP.route("/api/personlista")
def get_personlista():

	PL = personlista()
	return jsonify(personlista.fetch_data(PL))

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


