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


def recommend_media(topics, proficiency):
    for url in URL_LIST:
        sub_dict = URL_LIST[url]
        for topic in sub_dict['topics']:
            if topic in topics and URL_LIST[url]['difficulty']==proficiency:
                return URL_LIST[url]
    return {}
