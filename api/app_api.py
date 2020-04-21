from flask import Flask, jsonify
from flask_api import status
from flask_cors import CORS, cross_origin
from flask_caching import Cache
from collections import Counter, OrderedDict
from random import randint
import requests, re

cache = Cache(config={'CACHE_TYPE': 'simple',  'CACHE_DEFAULT_TIMEOUT': 300}) # cache timeout 5 minutes
# initialize the Flask application
app = Flask(__name__)
cache.init_app(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = False
app.config['JSON_SORT_KEYS'] = False

joke_api_url = 'https://icanhazdadjoke.com/search?&limit=15&page='

def getCount(jokes, top=10):
    cleanedJokes = []
    finalJokesList = []
    for j in jokes:
        joke = j['joke']
        joke = joke.lower()
        joke = ' '.join(re.sub('[\[\]\.\,\!\?\:\;\-\=]', ' ', joke).split()) #removal of punctuations
        cleanedJokes.extend(joke.split(' '))
        sortedJokes = sorted(Counter(cleanedJokes).most_common(top), key=lambda x: (-x[1], x[0])) #sort by term if tie exists
        sortedJokesDict = OrderedDict(sortedJokes) #convert to ordered dict to retain order
        finalJokesList = [{'rank': index+1, 'term': key, 'count': value} for index, (key, value) in enumerate(sortedJokesDict.items())]

    return finalJokesList

@app.errorhandler(Exception) #handle any error exception in external API
def handle_error(error):
    response = {}
    response['message'] = 'An unexpected error has occurred.'
    response['status'] = 500
    return jsonify(response), 500
    
@app.route('/api', methods=["GET"])
@cross_origin()
def getJokes():
    response = {}
    pageNumber = randint(1, 41)
    url = joke_api_url+str(pageNumber)
    item = cache.get(pageNumber)
    if item is not None:
        cachedResult = cache.get(pageNumber) #use cached result if key exists in cache
    else:
        allJokes = requests.get(url, headers={"Accept": "application/json"})
        data = allJokes.json()
        cache.set(pageNumber, data) #add key and value to cache
        cachedResult = data

    if cachedResult['results']:
        jokes = cachedResult['results']
        sortedFrequency = getCount(jokes, top=10)
    else:
        jokes = []
        sortedFrequency = []

    response['results'] = sortedFrequency
    response['status'] = 200
    return jsonify(response), 200

# start the server
if __name__=='__main__':
    app.run(host='0.0.0.0', port=8000)