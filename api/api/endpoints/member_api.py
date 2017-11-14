#!/usr/bin/python

from flask_restplus import Namespace, Resource, fields
from flask import jsonify
import json
from api import DB 
from api.voting import voting
from api.documents import documents

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
        V = voting()
        raw_json = voting.get_data(V, member_id)

        return jsonify(raw_json)

@ns.route('/<string:member_id>/documents')
class member_doc_API(Resource):

    @ns.response(200, 'OK.')
    @ns.response(404, 'Member not found.')

    def get(self, member_id):
        """Retreive documents related to a single member."""

        doc = documents()
        member_doc_list = doc.member_doc(member_id)

        if (member_doc_list is None):
            memberdoc="{}"

        return jsonify(member_doc_list)
