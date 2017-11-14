#!/usr/bin/python

from api.members import members
from redis import StrictRedis


class database() : 

    REDIS = None

    members   = None
    documents = None
    voting    = None

    def __init__(self, host):
        """ Constructor """
        self.REDIS = StrictRedis(host=host, port=6379, charset="utf-8",
                    decode_responses=True)

        self.members = members()
        
        print("database created!")
        pass

    def get_members(self):
        """ Get data for all members. Will fetch if no data in cache"""

        if self.REDIS.exists("members") is False:
        
            self.members.fetch_data()

            filt_data = self.members.get_output_data()
            self.REDIS.set("members", json.dumps(filt_data))

            for p in filt_data['members']:
                member_data = self.members.get_member_data(p['member_id'])
                self.REDIS.set(p['member_id'], json.dumps(member_data))  
        
        return self.REDIS.get('members')


    def get_member(self, member_id):
        """ Get member data for a member """

        return self.REDIS.get(str(member_id))

        pass

    def get_documents(self, member_id):
        """ Retreive all document data for to a member"""
        pass

    def get_voting(self, member_id):
        """ Retreive all voting data for a member"""
        pass

    def get_document(self, doc_id):
        """ Retreive document data for specific document"""
        pass

