import subprocess
import datetime

import utils


SHELL_COMMAND = ["/usr/bin/free", "-m"]


def get_system_memory():
    system_result = subprocess.check_output(SHELL_COMMAND)
    system_memory = utils.parse_memory_values(system_result)
    system_memory_dict = dict(system_memory)
    system_memory_dict['date'] = datetime.datetime.utcnow()
    return system_memory_dict


def worker():
    memory_data = get_system_memory()
    memory_data_collection = utils.get_collection('systemmemorydatas')
    memory_data_collection.insert(memory_data)


if __name__ == "__main__":
    worker()
