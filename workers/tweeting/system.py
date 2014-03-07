import datetime
import twitter

import database


TWITTER_CONSUMER_KEY = database.get_system_config_value('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = database.get_system_config_value('TWITTER_CONSUMER_SECRET')
TWITTER_ACCESS_TOKEN_KEY = database.get_system_config_value('TWITTER_ACCESS_TOKEN_KEY')
TWITTER_ACCESS_TOKEN_SECRET = database.get_system_config_value('TWITTER_ACCESS_TOKEN_SECRET')


class CPUTemperatureTweeter(object):

    temperature_data = {}
    status_message = ""
    
    def __init__(self):
        self._get_temperature_data()
        self._build_status_message()
        self.twitter_client = self._connect_to_twitter()
        super(CPUTemperatureTweeter, self).__init__()

    def _connect_to_twitter(self):
        return twitter.Api(consumer_key=TWITTER_CONSUMER_KEY,
                           consumer_secret=TWITTER_CONSUMER_SECRET,
                           access_token_key=TWITTER_ACCESS_TOKEN_KEY,
                           access_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

    def _get_temperature_data(self):
        self.temperature_data = database.get_latest_system_temperature()

    def _get_current_datetime(self):
        dt = datetime.datetime.now()
        return dt.strftime("%m/%d/%Y - %H:%M")

    def _build_status_message(self):
        message_template = "My current CPU temperature is: {0} F/{1} C ({2})"
        if self.temperature_data:
            celsius = self.temperature_data['celsius']
            fahrenheit = self.temperature_data['fahrenheit']
            current_datetime = self._get_current_datetime()
            self.status_message = message_template.format(fahrenheit, celsius, current_datetime)

    def tweet_it(self):
        if self.status_message:
            self.twitter_client.PostUpdate(self.status_message)
