import database


class ArticleCurator(object):

    keywords_by_word = {}
    keywords_by_score = {}
    has_enough_keyword_data = False
    curated_articles = []

    def __init__(self, articles_to_curate, minimum_keyword_count=150, required_keyword_score=4 ):
        self.articles_to_curate = articles_to_curate
        self.minimum_keyword_count = minimum_keyword_count
        self.required_keyword_score = required_keyword_score
        self._build_keyword_dictionaries()
        self._check_keyword_data()        
        super(ArticleCurator, self).__init__()

    def _build_keyword_dictionaries(self):
        result = database.get_documents_for_collection('newsarticlekeywords')
        for i in result:
            word = i['word']
            score = i['score']
            self.keywords_by_word[word] = score
            if self.keywords_by_score.get(score, ''):
                self.keywords_by_score[score].append(word)
            else:
                self.keywords_by_score[score] = [word]

    def _check_keyword_data(self):
        i = 0
        if len(self.keywords_by_word) > self.minimum_keyword_count:
            i += 1
        if self.required_keyword_score in self.keywords_by_score.keys():
            i += 1
        if i == 2:
            self.has_enough_keyword_data = True

    def _check_article_completeness(self, article):
        if not article.title:
            return False
        if not article.summary:
            return False
        if not article.top_image:
            return False
        return True

    def _article_is_interesting(self, article):
        for kw in article.keywords:
            if self.keywords_by_word.get(kw, 1) < 0:
                return False
        return True

    def _curate_article(self, article):
        if self._check_article_completeness(article):
            return self._article_is_interesting(article)
        return False 

    def curate(self):
        if self.has_enough_keyword_data:
            self.curated_articles = filter(self._curate_article, self.articles_to_curate)
        else:
            self.curated_articles = self.articles_to_curate
