#!/usr/bin/python

from flask_restplus import Namespace, Resource, fields
from flask import jsonify
import json
from api import REDIS

ns = Namespace('api/member', description='Retreival of member data.')

@ns.route('/<string:member_id>')
class member_API(Resource):

    @ns.response(200, 'OK.') #Documentation
    @ns.response(404, 'Member not found.') #Documentation
    def get(self, member_id):
        """Retreive detailed data for a single member."""
        member = REDIS.get(member_id)

        if(member is None):
            #member="{}"
            ns.abort(404, "Member not found")

        return jsonify(json.loads(member))

