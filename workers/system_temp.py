import subprocess
import datetime

import utils
import database
from tweeting import CPUTemperatureTweeter


SHELL_COMMAND = ["/opt/vc/bin/vcgencmd", "measure_temp"]


def get_system_temp():
    system_result = subprocess.check_output(SHELL_COMMAND)
    celsius_temp = utils.parse_temp_value(system_result)
    fahrenheit_temp = utils.celsius_to_fahrenheit(celsius_temp)
    return {
        'date': datetime.datetime.utcnow(),
        'from': 'Holly',
        'celsius': celsius_temp,
        'fahrenheit': fahrenheit_temp
    }


def worker():
    temperature_data = get_system_temp()
    temperature_data_collection = database.get_collection('systemtemperaturedatas')
    try:
        temperature_data_collection.insert(temperature_data)
    except:
        # TODO: Add some logging should this fail
        return
    else:
        tweeter = CPUTemperatureTweeter()
        tweeter.tweet_it()


if __name__ == "__main__":
    worker()
