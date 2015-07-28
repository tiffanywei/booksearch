import sqlite3
import json

from bookparser import BookParser

def retrieve_words_contexts(word_tuple):
	"""
	Queries sqlite database for all rows matching any of the words in the word_tuple.
	"""
	conn = sqlite3.connect('test.db')
	cur = conn.cursor()
	query = """
	SELECT word, serialized_context_list FROM words
	WHERE word IN (
	""" + ",".join("?"*len(word_tuple)) + ")"
	cur.execute(query, word_tuple)
	results = cur.fetchall()
	word_context_dict = {}
	for row in results:
		word_context_dict[row[0]] = json.loads(row[1])
	conn.close()
	return word_context_dict

def create_database():
	"""
	Uses BookParser to process the html book files into a data structure in memory
	then iterates through and stores in a sqlite file.
	"""
	conn = sqlite3.connect('test.db')
	cur = conn.cursor()
	create_table = """
	CREATE TABLE IF NOT EXISTS words
             (word TEXT PRIMARY KEY, serialized_context_list TEXT)
	"""
	cur.execute(create_table)
	insert_row = """
	INSERT OR REPLACE INTO words VALUES (?, ?)
	"""
	book_parser = BookParser()
	book_parser.initiate()
	for word, context_list in book_parser.get_full_dict().iteritems():
		cur.execute(insert_row, (word.decode('utf-8'), json.dumps(context_list)))
	conn.commit()
	conn.close()

if __name__ == "__main__":
	create_database()
