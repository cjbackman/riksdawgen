from flask import Flask

app = Flask(__name__)

@app.route("/api")
def welcome():
	return "Welcome Riksdawgen's API! The end of the rainbow, where G&T brings you magic."

@app.route("/api/hello")
def hello():
    return "Hello World"

if __name__ == '__main__':
	app.run()