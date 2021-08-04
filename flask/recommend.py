URL_LIST = {
            "https://www.bbc.com/portuguese/geral-57979486": 
                            {
                                "difficulty":"intermediate-b1",
                                "isAppropriateDifficulty":"true",
                                "difficultyFactors": 
                                    ["comparitives", "preterito perfeito", "preterito imperfeito", "participio passado"],
                                "topics":
                                    ["Olympics", "Brazil", "skateboarding", "sports", "Rayssa Leal"],
                                "match": ["sports", "travel"]
                                },
            "https://g1.globo.com/sp/campinas-regiao/noticia/2021/08/02/covid-19-pfizer-anuncia-entrega-de-mais-17-milhoes-de-doses-da-vacina-ate-22-de-agosto.ghtml":
                            {
                                "difficulty":"advanced-c1",
                                "isAppropriateDifficulty":"false",
                                "difficultyFactors": ["dense scientific information"],
                                "topics":
                                    ["Covid-19", "vaccines", "health", "ministerio da saude"],
                                "match": ["science"]
                                },
            "https://blog.cheftime.com.br/comer/curiosidades-da-culinaria-japonesa/":
                            {
                                "difficulty":"upper-intermediate-b2",
                                "isAppropriateDifficulty":"false",
                                "difficultyFactors": ["cooking terms", "broad range of adjectives", "diminuitive", "subjective presente"],
                                "topics": ["cuisine", "recipes", "food", "sushi"], 
                                "match": ["cooking", "travel"]   
                            },
            "https://g1.globo.com/pop-arte/musica/noticia/2021/07/22/pabllo-vittar-anitta-iza-gloria-groove-por-que-o-pop-esta-exaltando-as-origens-na-pandemia.ghtml":
                            {
                                "difficulty":"pre-intermediate-a2",
                                "isAppropriateDifficulty":"true",
                                "difficultyFactors": ["presente", "perterito imperfeito", "gerunds"],
                                "topics":
                                    ["Anitta", "pop music", "geography", "creativity"],    
                                "match": ["art", "music"]               
                            }
        }

DEFAULT_URL = "https://www.bbc.com/portuguese/geral-57979486"


def recommend_media(topics, proficiency):
    for url in URL_LIST:
        sub_dict = URL_LIST[url]
        for topic in sub_dict['match']:
            if topic in topics and URL_LIST[url]['difficulty']==proficiency:
                return {"url": url}
    return {"url": DEFAULT_URL}
