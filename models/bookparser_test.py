import unittest

from bookparser import BookParser

class BookParserTest(unittest.TestCase):
	def setUp(self):
		self.book_parser = BookParser()

	def test_load_word_data(self):
		expected_dict = {
			'hello': [
					{'word': 'hello',
					 'sentence': 'he said hello',
					 'book': 'Treasure Island',
					 'chapter': '10 - Ahoy',
					 'filename': 'file1.html'}
				]
			}
		self.book_parser.load_word_data(
			'hello', 'file1.html', 'he said hello', 'Treasure Island', '10 - Ahoy')
		self.assertItemsEqual(expected_dict, self.book_parser.get_full_dict())
