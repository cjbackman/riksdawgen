"""Test Python App"""
from flask import Flask, jsonify, current_app, Blueprint
from flask_restplus import Api, Resource
from api.members import members
from redis import StrictRedis
import json


blueprint_api = Blueprint('api', __name__)
api = Api(blueprint_api)


REDIS = StrictRedis(host=current_app.config[
                    'REDIS_SERVER'], port=6379, charset="utf-8",
                    decode_responses=True)

# NOTE: Modules relying on REDIS cannot be imported until REDIS is created.
from api.endpoints.member_api import ns as member_api
from api.endpoints.members_api import ns as members_api

# Add all namespaces from submodules
api.add_namespace(member_api)
api.add_namespace(members_api)


@current_app.before_first_request
def fetch_data():
    MP = members()
    members.fetch_data(MP)

    filt_data = members.get_output_data(MP)
    REDIS.set("members", json.dumps(filt_data))

    for p in filt_data['members']:
        member_data = members.get_member_data(MP, p['member_id'])
        REDIS.set(p['member_id'], json.dumps(member_data))


@current_app.before_request
def connect_to_data():
    if REDIS.exists("members") is False:
        print("MP is None, forced to fetch new. This shall not happen.")
        fetch_data()
