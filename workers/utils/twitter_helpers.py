import twitter
import config

TWITTER_CONSUMER_KEY = config.get_system_config_value('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = config.get_system_config_value('TWITTER_CONSUMER_SECRET')
TWITTER_ACCESS_TOKEN_KEY = config.get_system_config_value('TWITTER_ACCESS_TOKEN_KEY')
TWITTER_ACCESS_TOKEN_SECRET = config.get_system_config_value('TWITTER_ACCESS_TOKEN_SECRET')


def get_twitter_client():
    return twitter.Api(consumer_key=TWITTER_CONSUMER_KEY,
                            consumer_secret=TWITTER_CONSUMER_SECRET,
                            access_token_key=TWITTER_ACCESS_TOKEN_KEY,
                            access_token_secret=TWITTER_ACCESS_TOKEN_SECRET)
