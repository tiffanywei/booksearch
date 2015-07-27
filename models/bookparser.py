import os
import sys
import nltk
import json
from bs4 import BeautifulSoup
from nltk import tokenize

ROOT_PATH = os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.path.pardir))

class BookParser(object):
	"""
	This class processes html project gutenberg book files into a data structure
	so that lookups by word will return a list of its context objects.
	BeautifulSoup is used for html parsing with html5lib as the parser 
	and Natural Language Toolkit is for tokenizing words and sentences.
	{
    'hello': [
        {
						'book': 'Treasure Island',
						'chapter': '10 - Ahoy',
            'sentence': 'he said hello to her',
            'filename': 'file1.html'
        },
        {
						'book': 'Cat's Cradle',
						'chapter': '9',
            'sentence': 'don\'t you hello me',
            'filename': 'file2.html'
        }
    ],
    'hi': [
        {
						'book': 'Treasure Island',
						'chapter': '2 - Booty',
            'sentence': '"hi" is so casual',
            'filename': 'file1.html'
        }
    ]
	}
	"""

	@staticmethod
	def is_chapter_text_(tag):
		"""
		Test to differentiate chapter text from extraneous non-book text.
		"""
		return (tag.name == 'p' and not tag.has_attr('align'))

	@staticmethod
	def parse_chapter_to_sentences(chapter_text):
		return tokenize.sent_tokenize(chapter_text, language='english')

	@staticmethod
	def parse_sentence_to_words(sentence):
		return tokenize.word_tokenize(sentence, language='english')

	def __init__(self, app_root_path=None):
		self.word_context_dict = {}
		if not app_root_path:
			self.app_root_path = ROOT_PATH

	def initiate(self):
		"""
		Will begin the processing of the files.
		"""
		# download latest punkt natural language tokenizer
		nltk.download('punkt')
		for file in os.listdir(os.path.join(self.app_root_path, 'challengebooks')):
			full_file_path = os.path.join(self.app_root_path, 'challengebooks/' + file)
			if not file.startswith('.') and os.path.isfile(full_file_path):
				self.parse_book(file, full_file_path)

	def get_full_dict(self):
		return self.word_context_dict

	def get_context_list_for_word(self, word):
		return self.word_context_dict[word]

	def load_word_data(self, word, file_name, sentence, book_title, chapter_title):
		"""
		Formats and loads the data structure with the context dict for each word.
		All params are unicode strings returned by nlkt and BeautifulSoup.
		"""
		word = word.encode('utf-8').lower()
		context_dict = {
			'word': word,
			'book': book_title.encode('utf-8').replace('\n', ' '),
			'chapter': chapter_title.encode('utf-8').replace('\n', ' '),
			'filename': file_name.encode('utf-8').replace('\n', ' '),
			'sentence': sentence.encode('utf-8').replace('\n', ' ')
		}
		self.word_context_dict.setdefault(word, [])
		self.word_context_dict[word].append(context_dict)

	def parse_book(self, file_name, bookfile):
		"""
		Uses BeautifulSoup with html5lib to traverse and extract data from
		the bookfile.
		file_name is the unicode name of the file
		bookfile is the actual file path to read
		"""
		with open (bookfile, "r") as myfile:
				html_doc = myfile.read().replace('\n', '')
		soup = BeautifulSoup(html_doc, 'html5lib')
		book_title = soup.title.text
		for chapter in soup.find_all(['h1', 'h2', 'h3']):
			if chapter.text != 'THE END':
				chapter_title = chapter.text
				for item in chapter.next_siblings:
					if BookParser.is_chapter_text_(item):
						chapter_content = item.get_text()
						for sentence in BookParser.parse_chapter_to_sentences(chapter_content):
							for word in BookParser.parse_sentence_to_words(sentence):
								self.load_word_data(word, file_name, sentence, book_title, chapter_title)
					elif item.name is None:
						pass
					else:
						break

if __name__ == "__main__":
	book_parser = BookParser()
	book_parser.initiate()
