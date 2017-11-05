#!/usr/bin/env python
#-*- coding: utf-8 -*-

import requests
import json
import urllib
import copy
from datetime import datetime


class members:

    base_url = 'http://data.riksdagen.se/personlista/?'

    empty_filter = {'iid': '',
                    'fnamn': '',
                    'enamn': '',
                    'f_ar': '',
                    'kn': '',
                    'parti': '',
                    'valkrets': '',
                    'rdlstatus': '',
                    'org': '',
                    'utformat': 'json',
                    'termlista': ''}

    raw_data = {}    # Raw json-blob from data.riksdagen.se
    output_data = {} # Json structure with basic info for all members
    member_data = {} # {member_id : detalied data} - key:value pair

    def fetch_data(self, filt=empty_filter):

        url = self.base_url + urllib.parse.urlencode(filt)
        r = requests.get(url)

        try:
            fetched_data = r.json()
        except:
            raise(ValueError('Non-json format received from url: %') % url)

        self.raw_data = fetched_data
        members.create_output_data(self)

        return self.raw_data

    @staticmethod
    def get_empty_filter():
        return members.empty_filter

    def create_output_data(self):

        filtered_entries = []

        try:
            members_list = self.raw_data['personlista']['person']
        except:
            print("Empty members list")

        for i in range(0, len(members_list)):
            p = members_list[i]
            member_id = p['intressent_id']

            member_data = {'lastname': p['efternamn'],
                           'party': p['parti'],
                           'born_year': p['fodd_ar'],
                           'image': p['bild_url_192'],
                           'gender': p['kon'],
                           'firstname': p['tilltalsnamn'],
                           'name': p['tilltalsnamn'] + ' ' + p['efternamn'],
                           'constituency': p['valkrets'],
                           'member_id': member_id,
                           'age': datetime.now().year - int(p['fodd_ar'])}

            # Append basic data
            assignments, assignment_count = self.create_assignment_data(p)
            member_data['assignment_count'] = assignment_count

            filtered_entries.append(copy.deepcopy(member_data))

            # Store detailed member data
            member_data['assignments'] = assignments
            self.member_data[member_id] = member_data

        # Store list of basic members data
        self.output_data = {'members': filtered_entries}

    def create_assignment_data(self, member_data):

        filtered_assignments = []

        member_id = member_data['intressent_id']
        assignment_list = member_data['personuppdrag']['uppdrag']

        for i in range(0, len(assignment_list)):
            a = assignment_list[i]

            function = a['uppgift'][0]
            if not isinstance(function, str):
                function = ''

            filtered_assignments.append({'role_code'     : a['roll_kod'],
                                        'status'         : a['status'],
                                        'type'           : a['typ'],
                                        'start_date'     : a['from'],
                                        'end_date'       : a['tom'],
                                        'authority_code' : a['organ_kod'],
                                        'ordinal_number' : int(a['ordningsnummer']),
                                        'function'       : function})

        return filtered_assignments, len(assignment_list)

    def get_output_data(self):
        return self.output_data

    def get_member_data(self, member_id):
        return self.member_data[member_id]

def example_app():

    PL = members()

    # Get ALL personlista data.
    # raw_json = personlista.fetch_data(PL) # This would take some time...

    # Filter data before requesting from data.riksdagen.se
    filt = members.get_empty_filter()

    filt['fnamn'] = 'anna'
    filt['kn'] = 'kvinna'

    raw_json = members.fetch_data(PL, filt)

    print(raw_json)


if __name__ == "__main__":
    example_app()
