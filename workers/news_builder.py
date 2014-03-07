import utils
import database

from curation import ArticleCurator


def get_source_urls():
    article_sources = database.get_documents_for_collection('newssourceconfigs')
    return [a['url'] for a in article_sources]


def worker():

    source_urls = get_source_urls()
    papers = utils.get_newspapers(source_urls)

    processed_articles = []
    for paper in papers:
        processed_articles += utils.process_articles_for_paper(paper)

    curator = ArticleCurator(processed_articles)
    curator.curate()

    # Make sure we actually have new articles first
    if curator.curated_articles:
        # get and empty collection before filling with new articles
        articles_collection = database.get_collection('newsarticles')
        articles_collection.remove()
        # put new curated articles in the collection
        for article in curator.curated_articles:
            articles_collection.insert({
                'title': article.title,
                'summary': article.summary,
                'image_url': article.top_image,
                'url': article.url,
                'keywords': article.keywords
            })


if __name__ == "__main__":
    worker()
