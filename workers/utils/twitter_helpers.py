import twitter
import database

TWITTER_CONSUMER_KEY = database.get_system_config_value('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = database.get_system_config_value('TWITTER_CONSUMER_SECRET')
TWITTER_ACCESS_TOKEN_KEY = database.get_system_config_value('TWITTER_ACCESS_TOKEN_KEY')
TWITTER_ACCESS_TOKEN_SECRET = database.get_system_config_value('TWITTER_ACCESS_TOKEN_SECRET')


def get_twitter_client():
    return twitter.Api(consumer_key=TWITTER_CONSUMER_KEY,
                            consumer_secret=TWITTER_CONSUMER_SECRET,
                            access_token_key=TWITTER_ACCESS_TOKEN_KEY,
                            access_token_secret=TWITTER_ACCESS_TOKEN_SECRET)
