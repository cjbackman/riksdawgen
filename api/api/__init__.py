"""Test Python App"""
from flask import Flask, jsonify, current_app, Blueprint
from flask_restplus import Api, Resource
from flask_cors import CORS, cross_origin
from api.members import members
from api.database import database 
import json


blueprint_api = Blueprint('api', __name__)
CORS(blueprint_api)
api = Api(blueprint_api)

DB = database(host=current_app.config[
                    'REDIS_SERVER'])

# NOTE: Modules relying on DB cannot be imported until DB is created.
from api.endpoints.member_api import ns as member_api
from api.endpoints.members_api import ns as members_api

# Add all namespaces from submodules
api.add_namespace(member_api)
api.add_namespace(members_api)


@current_app.before_first_request
def fetch_data():
    DB.get_members()

@current_app.before_request
def connect_to_data():
    pass
    #if REDIS.exists("members") is False:
     #   print("MP is None, forced to fetch new. This shall not happen.")
     #   fetch_data()
