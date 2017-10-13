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

	def fetch_data(self, filt=empty_filter):

		url = self.base_url + urllib.parse.urlencode(filt)
		r = requests.get(url)

		try:
			fetched_data = json.loads(r.text)
		except:
			raise(ValueError('Non-json format received from url: %') % url)

		return fetched_data

	@staticmethod
	def get_empty_filter():
		return personlista.empty_filter

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