from tweeting import IndoorTemperatureTweeter
from tweeting import IndoorHumidityTweeter


def tweet_temperature():
    temp_tweeter = IndoorTemperatureTweeter()
    temp_tweeter.tweet_it()


def tweet_humidity():
    humidity_tweeter = IndoorHumidityTweeter()
    humidity_tweeter.tweet_it()


def worker():
    tweet_temperature()
    tweet_humidity()


if __name__ == "__main__":
    worker()
