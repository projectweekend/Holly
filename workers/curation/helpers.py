import newspaper
from newspaper import news_pool


def get_newspapers(source_urls):
    papers = []
    for url in source_urls:
        papers.append(newspaper.build(url))
    
    news_pool.set(papers, threads_per_source=2)
    news_pool.join()
    return papers


def process_articles_for_paper(paper):
    articles = []
    for a in paper.articles:
        # using try/except here because of random "Parse lxml ERR". 
        # will open an issue on Github...it is something in the library
        try:
            a.parse()
            a.nlp()
            articles.append(a)
        except:
            pass
    return articles
