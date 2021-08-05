URL_LIST = {
            "https://www.bbc.com/portuguese/geral-57979486": 
                            {
                                "difficulty":"b1-intermediate",
                                "isAppropriateDifficulty":"true",
                                "difficultyFactors": 
                                    ["comparitives", "preterito perfeito", "preterito imperfeito", "participio passado"],
                                "topics":
                                    ["Olympics", "Brazil", "Skateboarding", "Sports", "Rayssa Leal"],
                                "match": ["Sports", "Travel"]
                                },
            "https://g1.globo.com/sp/campinas-regiao/noticia/2021/08/02/covid-19-pfizer-anuncia-entrega-de-mais-17-milhoes-de-doses-da-vacina-ate-22-de-agosto.ghtml":
                            {
                                "difficulty":"c1-advanced",
                                "isAppropriateDifficulty":"false",
                                "difficultyFactors": ["dense scientific information"],
                                "topics":
                                    ["Covid-19", "Vaccines", "Health", "Ministerio da Saude"],
                                "match": ["Science"]
                                },
            "https://blog.cheftime.com.br/comer/curiosidades-da-culinaria-japonesa/":
                            {
                                "difficulty":"b2-upper-intermediate",
                                "isAppropriateDifficulty":"false",
                                "difficultyFactors": ["cooking terms", "broad range of adjectives", "diminuitive", "subjective presente"],
                                "topics": ["Cuisine", "Recipes", "Food", "Sushi"], 
                                "match": ["Cooking", "Travel"]   
                            },
            "https://g1.globo.com/pop-arte/musica/noticia/2021/07/22/pabllo-vittar-anitta-iza-gloria-groove-por-que-o-pop-esta-exaltando-as-origens-na-pandemia.ghtml":
                            {
                                "difficulty":"a2-pre-intermediate",
                                "isAppropriateDifficulty":"true",
                                "difficultyFactors": ["presente", "perterito imperfeito", "gerunds"],
                                "topics":
                                    ["Anitta", "Pop Music", "Geography", "Creativity"],    
                                "match": ["Art", "Music"]               
                            }
        }

DEFAULT_URL = "https://g1.globo.com/pop-arte/musica/noticia/2021/07/22/pabllo-vittar-anitta-iza-gloria-groove-por-que-o-pop-esta-exaltando-as-origens-na-pandemia.ghtml"


def recommend_media(topics, proficiency):
    for url in URL_LIST:
        sub_dict = URL_LIST[url]
        for topic in sub_dict['topics'] + sub_dict['match']:
            if topic in topics and URL_LIST[url]['difficulty']<=proficiency:
                return {"url": url}
    print('default')
    # return {"url": DEFAULT_URL}
    return {"url": ""}
