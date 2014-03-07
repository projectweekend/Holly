from pymongo import MongoClient


def get_database():
    client = MongoClient('mongodb://localhost/holly-webapp-db')
    return client['holly-webapp-db']


def get_collection(collection_name):
    db = get_database()
    return db[collection_name]


def get_documents_for_collection(collection_name):
    collection = get_collection(collection_name)
    return [d for d in collection.find()]


def get_latest_system_temperature():
    collection = get_collection('systemtemperaturedatas')
    return collection.find_one(sort=[('date', -1)])


def get_latest_indoor_temperature():
    collection = get_collection('indoortemperaturedatas')
    return collection.find_one(sort=[('date', -1)])


def get_latest_indoor_humidity():
    collection = get_collection('indoorhumiditydatas')
    return collection.find_one(sort=[('date', -1)])


def get_system_config_value(config_key):
    config_collection = get_collection('thirdpartyconfigs')
    config_dict = config_collection.find_one({'config_key': config_key})
    try:
        return config_dict['config_value']
    except:
        return ""
