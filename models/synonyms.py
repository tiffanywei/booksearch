import json
import requests

URL = 'http://thesaurus.altervista.org/thesaurus/v1'
KEY = 'ljxHxHLOyYHEf9tP4v6i'
LANGUAGE = 'en_US'
OUTPUT = 'json'

"""
example response to request with word "hello":
{"response":[{"list":{"category":"(noun)","synonyms":"hullo|hi|howdy|how-do-you-do|greeting|salutation"}}]}
"""

def get_full_url(word):
	"""
	word is string
	returns full url string for request
	"""
	return "%(url)s?key=%(key)s&word=%(word)s&language=%(language)s&output=%(output)s" % {
		'url': URL, 'key': KEY, 'language': LANGUAGE, 'output': OUTPUT, 'word': word}

def get_synonyms(word):
	"""
	url is string
	returns list of string synonym words
	"""
	word_synonyms = []
	results = json.loads(requests.get(get_full_url(word)).content)
	for result in results['response']:
		word_synonyms.extend(result['list']['synonyms'].split('|'))
	return word_synonyms
