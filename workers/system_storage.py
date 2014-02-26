import subprocess
import datetime

import utils


SHELL_COMMAND = ["/bin/df", "-BM"]


def get_system_storage():
    system_result = subprocess.check_output(SHELL_COMMAND)
    system_storage = utils.parse_storage_values(system_result)
    system_storage_dict = dict(system_storage)
    system_storage_dict['date'] = datetime.datetime.utcnow()
    return system_storage_dict


def worker():
    storage_data = get_system_storage()
    storage_data_collection = utils.get_collection('systemstoragedatas')
    storage_data_collection.insert(storage_data)


if __name__ == "__main__":
    worker()
