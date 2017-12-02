#!/usr/bin/env python
#-*- coding: utf-8 -*-

import urllib
from urllib.request import urlopen
import requests
import json

class voting: 

    max_number_of_hits = 100

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
        
        for i in range(0, number_of_votes):
            filtered_obj = {}
            filtered_obj['vote'] = voting_list[i]['rost']
            filtered_obj['document_id'] = voting_list[i]['dok_id']   # Will be overridden by id from XML-file
            filtered_obj['url_xml'] = voting_list[i]['votering_url_xml']
            filtered_obj['vote_id'] = voting_list[i]['votering_id']
            filtered_obj['name'] = voting_list[i]['namn']
            filtered_obj['item'] = voting_list[i]['punkt']

            try:
            	date = voting_list[i]['systemdatum'].split(' ')[0]
            except:
            	date = None

            filtered_obj['date'] = date

            xml_data = self.parse_xml(filtered_obj['url_xml'])

            for key, value in xml_data.items():
                filtered_obj[key] = value

            output_list.append(filtered_obj)

        output_data = {'votes' : output_list}

        return output_data

    def parse_xml(self, url):
        """ Parses and return data from voting XML-file 
        TODO: We must cache this data somehow. Currently redundant data is fetched. 
        We could easily reduce the number of XML-files parsed by a factor of 10. """
        import xml.etree.ElementTree as ET
        
        tree = ET.parse(urlopen(url))
        root_tag = tree.getroot()
        document_tag = root_tag.find('dokument')

        tags = {'dok_id' : 'document_id',
                'dokumentnamn' : 'doc_name',
                'titel': 'title',
                'publicerad' : 'published_date'}

        fetched_data = {}

        for key, new_key in tags.items():
            try: 
                data = document_tag.find(key).text
            except:
                data = None

            fetched_data[new_key] = data

        return fetched_data

