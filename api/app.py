"""Test Python App"""
from flask import Flask

APP = Flask(__name__)

@APP.route("/api")
def welcome():
    """Welcome Text"""
    return "Welcome Riksdawgen's API! The end of the rainbow, where G&T brings you magic."

@APP.route("/api/hello")
def hello():
    """Returns Hello World"""
    return "Hello World"

if __name__ == '__main__':
    APP.run()
