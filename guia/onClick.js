const ob = {
    "url": "https://deepmind.com/blog/article/putting-the-power-of-alphafold-into-the-worlds-hands"
}

const response = fetch("http://lekan101.duckdns.org:5000/parse", {
    method: "POST",
    mode: "cors",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(ob)
})
    .then((response) => {
        return response.json();
        })
        .then((myJson) => {
        console.log(myJson.text);
        console.log("perform application logic");
        })
        .catch((error) => {
        console.log("Api call error ", error.message);
    });


// flask run -h 10.10.10.187 -p 5000

