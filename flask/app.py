from flask import Flask, render_template, request, Response, jsonify, json
import parser
import json

app = Flask(__name__)

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
    resp = {
        'text': parser.parseText(url)
    }
    return jsonify(resp)


if __name__ == "__main__":
    app.run(debug=True) 
