import datetime
import twitter

import database


TWITTER_CONSUMER_KEY = database.get_system_config_value('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = database.get_system_config_value('TWITTER_CONSUMER_SECRET')
TWITTER_ACCESS_TOKEN_KEY = database.get_system_config_value('TWITTER_ACCESS_TOKEN_KEY')
TWITTER_ACCESS_TOKEN_SECRET = database.get_system_config_value('TWITTER_ACCESS_TOKEN_SECRET')


class IndoorTweeter(object):
    
    def __init__(self):
        self.status_message = ""
        self.twitter_client = self._connect_to_twitter()
        super(IndoorTweeter, self).__init__()

    def _connect_to_twitter(self):
        return twitter.Api(consumer_key=TWITTER_CONSUMER_KEY,
                           consumer_secret=TWITTER_CONSUMER_SECRET,
                           access_token_key=TWITTER_ACCESS_TOKEN_KEY,
                           access_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

    def _get_current_datetime(self):
        dt = datetime.datetime.now()
        return dt.strftime("%m/%d/%Y - %H:%M")

    def tweet_it(self):
        if self.status_message:
            self.twitter_client.PostUpdate(self.status_message)              


class IndoorTemperatureTweeter(IndoorTweeter):

    temperature_data = {}
    
    def __init__(self):
        super(IndoorTemperatureTweeter, self).__init__()
        self._get_temperature_data()
        self._build_status_message()
        self.twitter_client = self._connect_to_twitter()

    def _get_temperature_data(self):
        self.temperature_data = database.get_latest_indoor_temperature()

    def _build_status_message(self):
        message_template = "The current indoor temperature is: {0} F/{1} C ({2}) #raspberrypi"
        if self.temperature_data:
            celsius = round(self.temperature_data['celsius'], 2)
            fahrenheit = round(self.temperature_data['fahrenheit'], 2)
            current_datetime = self._get_current_datetime()
            self.status_message = message_template.format(fahrenheit, celsius, current_datetime)


class IndoorHumidityTweeter(IndoorTweeter):

    humidity_data = {}
    
    def __init__(self):
        super(IndoorHumidityTweeter, self).__init__()
        self._get_humidity_data()
        self._build_status_message()
        self.twitter_client = self._connect_to_twitter()

    def _get_humidity_data(self):
        self.humidity_data = database.get_latest_indoor_humidity()

    def _build_status_message(self):
        message_template = "The current indoor humidity is: {0}% ({1}) #raspberrypi"
        if self.humidity_data:
            percent = round(self.humidity_data['percent'], 2)
            current_datetime = self._get_current_datetime()
            self.status_message = message_template.format(percent, current_datetime)
