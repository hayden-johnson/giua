from flask import Flask, render_template, request, Response, jsonify, json 
import parser 
import recommend
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/parse": {"origins": "*"}, r"/topics": {"origins": "*"}})

@app.route("/")
def index():
    return render_template("index.html") 

@app.route("/parse", methods=["POST"])
def parse(): 
    if request.content_type != 'application/json':
        print('incorrect content type')
        return jsonify({})

    try:
        print('loading json')
        data = json.loads(request.data)
    except:
        print('failed to load json')
        return jsonify({})

    if 'url' not in data:
        print('url not found in data')
        return jsonify({})

    url = data['url']
    raw_text = parser.parseText(url)
    processed_text = parser.process(raw_text)
    # readabilty_metrics = parser.compute_readabilty(processed_text)

    if url not in recommend.URL_LIST:
        print("url not supported")
        return jsonify({})
    else:
        resp = recommend.URL_LIST[url]
        return jsonify(resp)


@app.route("/topics", methods=["POST"])
def topics(): 
    if request.content_type != 'application/json':
        print('incorrect content type')
        return jsonify({})

    try:
        print('loading json')
        data = json.loads(request.data)
    except:
        print('failed to load json')
        return jsonify({})

    if 'topics' not in data:
        print('topics not found in data')
        return jsonify({})
    print(json.dumps(data))
    topics = data['topics']
    print(topics)
    proficiency = data['proficiency']
    return recommend.recommend_media(topics, proficiency)

# if __name__ == "__main__":
#     app.run(debug=True) 



'''
curl --data "@message_portuguese.json" -H "Content-Type: application/json" -X POST http://127.0.0.1:8004/parse
'''
'''
curl --data "@rec.json" -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/topics

'''
