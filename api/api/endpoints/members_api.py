#!/usr/bin/python

from flask_restplus import Namespace, Resource, fields
from flask import jsonify
import json
from api import DB 

ns = Namespace('members', description='Retreival basic data for all members.')

@ns.route('/')
class members_API(Resource):

    @ns.response(200, 'OK.') #Documentation
    def get(self):
        """Retreive basic data for all members."""
        members = DB.get_members()
        return jsonify(json.loads(members))
