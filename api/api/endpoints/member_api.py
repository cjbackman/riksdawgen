#!/usr/bin/python

from flask_restplus import Namespace, Resource, fields
from flask import jsonify
import json
from api import DB 

ns = Namespace('member', description='Retreival of member data.')

@ns.route('/<string:member_id>')
class member_API(Resource):

    @ns.response(200, 'OK.') #Documentation
    @ns.response(404, 'Member not found.') #Documentation
    def get(self, member_id):
        """Retreive detailed data for a single member."""
        member = DB.get_member(member_id)

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
        
        raw_json = DB.get_voting(member_id)
        
        return jsonify(json.loads(raw_json))

@ns.route('/<string:member_id>/documents')
class member_doc_API(Resource):

    @ns.response(200, 'OK.')
    @ns.response(404, 'Member not found.')

    def get(self, member_id):
        """Retreive documents related to a single member."""

        member_doc_list = DB.get_documents(member_id)

        return jsonify(member_doc_list)
