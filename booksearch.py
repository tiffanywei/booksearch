import json
import time
from flask import Flask, redirect, url_for
from flask.ext.cache import Cache

from models.bookparser import BookParser
import models.sqlmanager as sqlmanager
import models.synonyms as synonyms

app = Flask(__name__)
app.debug = True
	
@app.route('/')
def index():
  return redirect(url_for('static', filename='booksearch.html'))

@app.route('/<string:word>')
def get_results_for_word(word):
	word_synonyms = (word,) + tuple(synonyms.get_synonyms(word))
	return json.dumps(sqlmanager.retrieve_words_contexts(word_synonyms))

@app.route('/test_results.json')
def test_results():
	time.sleep(1)
	results = {
    'hello': [
        {
            'sentence': 'he said hello to her',
            'filename': 'file1'
        },
        {
            'sentence': 'don\'t you hello me',
            'filename': 'file2'
        }
    ],
    'hi': [
        {
            'sentence': '"hi" is so casual',
            'filename': 'file1'
        }
    ]
	}
	return json.dumps(results)

if __name__ == "__main__":
	app.run()
