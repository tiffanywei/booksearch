from flask import Flask
import json
app = Flask(__name__)

@app.route('/')
def hello_world():
  return redirect(url_for('static', filename='booksearch.html'))

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
