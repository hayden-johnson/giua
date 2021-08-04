from flask import Flask, render_template, request, Response, jsonify, json 
import parser 
import recommend
from flask_cors import CORS

app = Flask(__name__)
ors = CORS(app, resources={r"/parse": {"origins": "*"}})

URL_LIST = {
            "https://www.bbc.com/portuguese/geral-57979486": 
                            {
                                "difficulty":"intermediate-b1",
                                "isAppropriateDifficulty":"true",
                                "difficultyFactors": 
                                    ["comparitives", "preterito-perfeito", "preterito-imperfeito", "participio-passafo"],
                                "topics":
                                    ["olymipics", "brazil", "skateboarding", "sprorts", "rayssa leal"]
                                },
            "https://g1.globo.com/sp/campinas-regiao/noticia/2021/08/02/covid-19-pfizer-anuncia-entrega-de-mais-17-milhoes-de-doses-da-vacina-ate-22-de-agosto.ghtml":
                            {
                                "difficulty":"advanced-c1",
                                "isAppropriateDifficulty":"false",
                                "difficultyFactors": ["dense-scientific-information"],
                                "topics":
                                    ["covid-19", "vaccines", "health", "ministerio-da-saude"]
                                }   
        }


@app.route("/")
def index():
    return render_template("index.html") 

'''
curl --data "@message_portuguese.json" -H "Content-Type: application/json" -X POST http://127.0.0.1:8004/parse
'''
'''
curl --data "@user.json" -H "Content-Type: application/json" -X POST http://127.0.0.1:8004/recommend
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

    if url not in URL_LIST:
        print("url not supported")
        return jsonify({})
    else:
        resp = URL_LIST[url]
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

    topics = data['topics']
    proficiency = data['proficiency']
    return recommend.recommend_media(topics, proficiency)

# if __name__ == "__main__":
#     app.run(debug=True) 
