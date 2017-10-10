from flask import Flask
from flask import jsonify
from personlista import personlista


app = Flask(__name__)

@app.route("/api/personlista")
def get_personlista():
	
	PL = personlista()
	return jsonify(personlista.fetch_data(PL))

@app.route("/api")
def welcome():
	return "Welcome Riksdawgen's API! The end of the rainbow, where G&T brings you magic."

@app.route("/api/hello")
def hello():
    return "Hello World"

# Only to enable easy debugging on host development machines, without running gunicorn server.
# Do not use flask server in production...
if __name__ == '__main__':
    app.run(debug=True)

    