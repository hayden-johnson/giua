from flask import Flask, render_template, request, Response, jsonify, json 
import parser 
# import json from flask_cors 
# import CORS app = Flask(__name__) cors = CORS(app, resources={r"/parse": {"origins": "*"}}) 
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html") 

'''
curl --data "@message.json" -H "Content-Type: application/json" -X POST http://127.0.0.1:8003/parse
'''

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

    resp = {
        'text': processed_text
    }
    return jsonify(resp)


if __name__ == "__main__":
    app.run(debug=True) 
