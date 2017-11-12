#!/usr/bin/env python
#-*- coding: utf-8 -*-

import urllib
import requests
import json


class voting:

    max_number_of_hits = 500

    base_url = 'http://data.riksdagen.se/voteringlista/?'

    empty_filter = {'bet': '',
                    'punkt': '',
                    'valkrets': '',
                    'rost': '',
                    'iid': '',
                    'sz': max_number_of_hits,
                    'utformat': 'json',
                    'gruppering': ''}

    def get_data(self, member_id, filt=empty_filter):
        """  Will update the cache from data.riksdagen.se, and return the dataset """

        filt['iid'] = member_id

        url = self.base_url + urllib.parse.urlencode(filt)
        r = requests.get(url)

        try:
            fetched_data = r.json()
        except:
            raise(ValueError('Non-json format received from url: %') % url)

        return self.parse_data(fetched_data)

    def parse_data(self, raw_json):

        number_of_votes = int(raw_json['voteringlista']['@antal'])
        voting_list = raw_json['voteringlista']['votering']

        output_list = []

        print(number_of_votes)
        for i in range(0, number_of_votes):
            filtered_obj = {}
            filtered_obj['vote'] = voting_list[i]['rost']
            filtered_obj['document_id'] = voting_list[i]['dok_id']
            filtered_obj['url_xml'] = voting_list[i]['votering_url_xml']
            filtered_obj['vote_id'] = voting_list[i]['votering_id']
            filtered_obj['name'] = voting_list[i]['namn']
            filtered_obj['item'] = voting_list[i]['punkt']

            try:
                date = voting_list[i]['systemdatum'].split(' ')[0]
            except:
                date = None

            filtered_obj['date'] = date

            output_list.append(filtered_obj)

        output_data = {'votes': output_list}

        return output_data
