#!/usr/bin/env python
#-*- coding: utf-8 -*-

import requests
from flask import jsonify
import json
import urllib


class documents:

    base_url = 'http://data.riksdagen.se/dokumentlista/?'

    empty_filter = {'sok': '',
                    'doktyp': '',
                    'rm': '',
                    'from': '',
                    'tom': '',
                    'ts': '',
                    'bet': '',
                    'tempbet': '',
                    'nr': '',
                    'org': '',
                    'iid': '',
                    'webbtv': '',
                    'talare': '',
                    'exakt': '',
                    'planering': '',
                    'sort': '',
                    'sortorder': '',
                    'rapport': '',
                    'utformat': 'json',
                    'a': ''}

    raw_data = {}    # Raw json-blob from data.riksdagen.se

    def get_empty_filter(self):
        return self.empty_filter

    def fetch_data_url(self, url):
        r = requests.get(url)

        try:
            fetched_data = r.json()
        except:
            raise(ValueError('Non-json format received from url: %') % url)
        return fetched_data;
        
    def fetch_data(self, filt=empty_filter):

        url = self.base_url + urllib.parse.urlencode(filt)
        fetched_data = self.fetch_data_url(url)

        return fetched_data

    def member_doc(self, member_id):

        filt = self.empty_filter
        filt['iid'] = member_id;

        raw_data = self.fetch_data(filt)
        member_doc_list = raw_data['dokumentlista']['dokument']
        doc_array = []
        
        #Iterate over all pages
        while member_doc_list != {}:

            #iterate over document hits
            for entry in member_doc_list:

                #filter out relevant data
                if entry['database'] == 'dokument':
                    entry_filtered = {}
                    entry_filtered['title'] = entry['titel']
                    entry_filtered['date'] = entry['datum']
                    entry_filtered['summary'] = entry['summary']
                    #entry_filtered['file'] = entry['filbilaga']
                    doc_array.append(entry_filtered)

            try:
                next_page = raw_data['dokumentlista']['@nasta_sida']
            except:
                next_page = {}
                member_doc_list = {}

            if next_page != {}:
                raw_data = self.fetch_data_url(next_page)
                member_doc_list = raw_data['dokumentlista']['dokument']

        return {'documents' : doc_array}

def example_app():

    DL = documents()

    #0173946230722
    raw_json = DL.member_doc('0173946230722')

    print(raw_json)

if __name__ == "__main__":
    example_app()

