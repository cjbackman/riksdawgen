from flask import Flask
app = Flask(__name__)


@app.route("/hello")
def hello():
    return "Hello World from Flask"


#@app.route("/")
#def main():
#    index_path = os.path.join(app.static_folder, 'index.html')
#    return send_file(index_path)

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)