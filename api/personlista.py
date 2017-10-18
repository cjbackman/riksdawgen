#!/usr/bin/env python
#-*- coding: utf-8 -*-

import requests
import json
import urllib

class personlista:

	base_url = 'http://data.riksdagen.se/personlista/?'

	empty_filter = {'iid' : '',
					'fnamn': '',
					'enamn': '',
					'f_ar' : '',
					'kn' : '',
					'parti' : '',
					'valkrets' : '',
					'rdlstatus' : '',
					'org' : '',
					'utformat' : 'json',
					'termlista' : ''}

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
		personlista.create_output_data(self)

		return self.raw_data

	@staticmethod
	def get_empty_filter():
		return personlista.empty_filter

	def create_output_data(self):

		filtered_entries = []

		try:
			person_list = self.raw_data['personlista']['person']
		except:
			print("Empty personlista")

		for i in range(0, len(person_list)):
			p = person_list[i]
			filtered_entries.append({'efternamn'    : p['efternamn'],
						 'parti'        : p['parti'],
						 'fodd_ar'      : p['fodd_ar'],
						 'bild_url_192' : p['bild_url_192'],
						 'kon'          : p['kon'],
						 'tilltalsnamn' : p['tilltalsnamn'],
						 'valkrets'     : p['valkrets'],
						 'intressent_id': p['intressent_id']})

		self.output_data = {'persons' : filtered_entries};


	def get_output_data(self):
		return self.output_data

def example_app():

	PL = personlista()

	# Get ALL personlista data.
	#raw_json = personlista.fetch_data(PL) # This would take some time...

	# Filter data before requesting from data.riksdagen.se
	filt = personlista.get_empty_filter()

	filt['fnamn'] = 'anna'
	filt['kn']    = 'kvinna'

	raw_json = personlista.fetch_data(PL, filt)

	print(raw_json)



if __name__ == "__main__":
	example_app()

