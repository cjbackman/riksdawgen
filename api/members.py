#!/usr/bin/env python
#-*- coding: utf-8 -*-

import requests
import json
import urllib
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

    raw_data = {}
    output_data = {}

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
            filtered_entries.append({'lastname': p['efternamn'],
                                     'party': p['parti'],
                                     'born_year': p['fodd_ar'],
                                     'image': p['bild_url_192'],
                                     'gender': p['kon'],
                                     'firstname': p['tilltalsnamn'],
                                     'name': p['tilltalsnamn'] + ' ' + p['efternamn'],
                                     'constituency': p['valkrets'],
                                     'member_id': p['intressent_id'],
                                     'age': datetime.now().year - int(p['fodd_ar'])})

        self.output_data = {'members': filtered_entries}

    def get_output_data(self):
        return self.output_data


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
