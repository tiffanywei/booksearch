import unittest

import synonyms

class SynonymsTest(unittest.TestCase):

	def test_load_word_data(self):
		expected_url = 'http://thesaurus.altervista.org/thesaurus/v1?key=ljxHxHLOyYHEf9tP4v6i&word=hello&language=en_US&output=json'
		test_url = synonyms.get_full_url('hello')
		self.assertEqual(expected_url, test_url)
