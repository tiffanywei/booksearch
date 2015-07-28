import json
import time
from flask import Flask, redirect, url_for
from flask.ext.cache import Cache

import models.sqlmanager as sqlmanager
import models.synonyms as synonyms

app = Flask(__name__)
app.debug = True
app.config['CACHE_TYPE'] = 'simple'
app.cache = Cache(app)
	
@app.route('/')
def index():
	"""
	Homepage of the app.
	"""
	return redirect(url_for('static', filename='booksearch.html'))

@app.route('/<string:word>')
@app.cache.memoize(timeout=60)
def get_results_for_word(word):
	"""
	Looks up word synonyms then queries for word contexts that match any
	of the words.  Memoized because requests are expensive.
	"""
	word_synonyms = (word,) + tuple(synonyms.get_synonyms(word))
	return json.dumps(sqlmanager.retrieve_words_contexts(word_synonyms))

@app.route('/test_results.json')
def test_results():
	"""
	For client side testing only.
	"""
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
