from flask import Flask, render_template, request
import parser

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html") 

@app.route("/parse", methods=["POST"])
def parse(): 
    url = request.form.get("url")
    text=parser.parseText(url)
    print(f"\nprinting text for [{url}]") 
    print(text)
    return render_template("calculated.html", url=url)



if __name__ == "__main__":
    app.run(debug=True) 
