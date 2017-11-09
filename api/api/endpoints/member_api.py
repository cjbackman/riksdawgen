#!/usr/bin/python

from flask_restplus import Namespace, Resource, fields
from flask import jsonify
import json
from api import REDIS
from api.voting import voting

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

@ns.route('/voting/<string:member_id>')
class member_API(Resource):

    @ns.response(200, 'OK.') #Documentation
    @ns.response(404, 'Member not found.') #Documentation
    def get(self, member_id):
        """Retreive detailed data for a single member."""
        V = voting()
        raw_json = voting.get_data(V, member_id)

        return jsonify(raw_json)

