import subprocess
import datetime

import utils


SHELL_COMMAND = ["/opt/vc/bin/vcgencmd", "get_config", "int"]


def get_system_config():
    system_result = subprocess.check_output(SHELL_COMMAND)
    system_config = utils.parse_config_values(system_result)
    config_dict = dict(system_config)
    config_dict['temp_limit'] = utils.celsius_to_fahrenheit(config_dict['temp_limit'])
    config_dict['date'] = datetime.datetime.utcnow()
    return config_dict


def worker():
    config_data = get_system_config()
    config_data_collection = utils.get_collection('systemconfigdatas')
    config_data_collection.insert(config_data)


if __name__ == "__main__":
    worker()
