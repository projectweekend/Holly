def strip_values(target_string, values_to_strip):
    for i in values_to_strip:
        target_string = target_string.replace(i, "")
    return target_string


def config_to_int(config_item):
    try:
        config_item[1] = int(config_item[1])
    except ValueError:
        pass
    return config_item


def parse_temp_value(system_result):
    return float(system_result.split("=")[1].split("'")[0])


def parse_memory_values(system_result):
    result_lines = system_result.splitlines()
    header_list = result_lines[0].strip().split()
    data_line = strip_values(result_lines[1], ["Mem:", "M", "B"])
    data_list = [int(x) for x in data_line.strip().split()]
    return zip(header_list, data_list)


def parse_storage_values(system_result):
    result_lines = system_result.splitlines()
    header_list = ['used', 'available', 'percent']
    data_line = strip_values(result_lines[1], ["rootfs", "M", "B", "%", "/"])
    data_list = [int(x) for x in data_line.strip().split()[1:]]
    return zip(header_list, data_list)


def parse_config_values(system_result):
    result_lines = system_result.splitlines()
    data_list = map(config_to_int, [x.split("=") for x in result_lines])
    return data_list
