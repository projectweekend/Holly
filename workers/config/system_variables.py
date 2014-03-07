from utils import get_collection


def get_system_config_value(config_key):
    config_collection = get_collection('thirdpartyconfigs')
    config_dict = config_collection.find_one({'config_key': config_key})
    try:
        return config_dict['config_value']
    except:
        return ""

