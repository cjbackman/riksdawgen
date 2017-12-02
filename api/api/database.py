#!/usr/bin/python

from api.members import members
from api.voting import voting
from api.documents import documents

from redis import StrictRedis

import json


class database() : 

    REDIS = None

    _members   = None
    _documents = None
    _voting    = None

    def __init__(self, host):
        """ Constructor """
        self.REDIS = StrictRedis(host=host, port=6379, charset="utf-8",
                    decode_responses=True)

        self._members = members()
        self._voting = voting()
        self._documents = documents()
        
        print("database created!")
        pass

    def get_members(self):
        """ Get data for all members. Will fetch if no data in cache"""

        if self.REDIS.exists("members") is False:
        
            self._members.fetch_data()

            filt_data = self._members.get_output_data()
            self.REDIS.set("members", json.dumps(filt_data))

            for p in filt_data['members']:
                member_data = self._members.get_member_data(p['member_id'])
                self.REDIS.set(p['member_id'], json.dumps(member_data))  
        
        return self.REDIS.get('members')


    def get_member(self, member_id):
        """ Get member data for a member """

        return self.REDIS.get(str(member_id))

        pass

    def get_documents(self, member_id):
        """ Retreive all document data for to a member"""

        member_doc_list = self._documents.member_doc(member_id)

        if (member_doc_list is None):
            member_doc_list="{}"

        return member_doc_list

    def get_voting(self, member_id):
        """ Retreive all voting data for a member"""

        key = 'voting-%s' % (member_id)

        if self.REDIS.exists(key) is False:
            raw_json = json.dumps(self._voting.get_data(member_id))
            self.REDIS.set(key, raw_json)
        else:
            raw_json = self.REDIS.get(key)

        return raw_json

    def get_document(self, doc_id):
        """ Retreive document data for specific document"""
        pass

