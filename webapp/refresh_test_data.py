import sys
import datetime
from pymongo import MongoClient

INDOOR_TEMPERATURE_DATA = [
    {
        'celsius': 29.600000381469727,
        'date': datetime.datetime(2014, 1, 27, 3, 46, 53, 20000),
        'fahrenheit': 85.28000068664551
    },
    {
        'celsius': 29.200000762939453,
        'date': datetime.datetime(2014, 1, 27, 3, 51, 22, 875000),
        'fahrenheit': 84.56000137329102
    },
    {
        'celsius': 28.5,
        'date': datetime.datetime(2014, 1, 28, 0, 55, 28, 826000),
        'fahrenheit': 83.30000000000001
    },
    {
        'celsius': 28.799999237060547,
        'date': datetime.datetime(2014, 1, 28, 1, 10, 42, 159000),
        'fahrenheit': 83.83999862670899
    },
    {
        'celsius': 26.399999618530273,
        'date': datetime.datetime(2014, 1, 29, 23, 30, 4, 658000),
        'fahrenheit': 79.5199993133545
    },
    {
        'celsius': 25.600000381469727,
        'date': datetime.datetime(2014, 2, 19, 3, 51, 22, 875000),
        'fahrenheit': 78.08000068664552
    },
    {
        'celsius': 25.799999237060547,
        'date': datetime.datetime(2014, 2, 19, 0, 55, 28, 826000),
        'fahrenheit': 78.43999862670898,
    },
    {
        'celsius': 26.299999237060547,    
        'date': datetime.datetime(2014, 2, 19, 3, 46, 53, 20000),
        'fahrenheit': 79.33999862670899
    }    
]

INDOOR_HUMIDITY_DATA = [
    {
        'date': datetime.datetime(2014, 1, 27, 3, 34, 36, 885000),
        'percent': 20
    },
    {
        'date': datetime.datetime(2014, 1, 27, 3, 45, 33, 379000),
        'percent': 20
    },
    {
        'date': datetime.datetime(2014, 1, 27, 3, 46, 53, 939000),
        'percent': 18.899999618530273
    },
    {
        'date': datetime.datetime(2014, 1, 27, 3, 51, 23, 173000),
        'percent': 18.899999618530273
    },
    {
        'date': datetime.datetime(2014, 1, 28, 0, 55, 28, 829000),
        'percent': 12.800000190734863
    }
]

SYSTEM_TEMPERATURE_DATA = [
    {
        'celsius': 47.6,
        'date': datetime.datetime(2014, 1, 27, 2, 23, 22, 761000),
        'from': 'Starbug',
        'fahrenheit': 117.68
    },
    {
        'celsius': 47.1,
        'date': datetime.datetime(2014, 1, 27, 2, 30, 6, 788000),
        'from': 'Starbug',
        'fahrenheit': 116.78
    },
    {
        'celsius': 48.7,
        'date': datetime.datetime(2014, 1, 27, 3, 0, 16, 898000),
        'from': 'Starbug',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': datetime.datetime(2014, 1, 27, 3, 30, 6, 222000),
        'from': 'Starbug',
        'fahrenheit': 117.68
    },
    {
        'celsius': 48.7,
        'date': datetime.datetime(2014, 1, 27, 4, 0, 17, 136000),
        'from': 'Starbug',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': datetime.datetime(2014, 1, 27, 2, 23, 22, 761000),
        'from': 'Holly',
        'fahrenheit': 117.68
    },
    {
        'celsius': 47.1,
        'date': datetime.datetime(2014, 1, 27, 2, 30, 6, 788000),
        'from': 'Holly',
        'fahrenheit': 116.78
    },
    {
        'celsius': 48.7,
        'date': datetime.datetime(2014, 1, 27, 3, 0, 16, 898000),
        'from': 'Holly',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': datetime.datetime(2014, 1, 27, 3, 30, 6, 222000),
        'from': 'Holly',
        'fahrenheit': 117.68
    },
    {
        'celsius': 48.7,
        'date': datetime.datetime(2014, 1, 27, 4, 0, 17, 136000),
        'from': 'Holly',
        'fahrenheit': 119.66000000000001
    }
]

SYSTEM_MEMORY_DATA = [
    {
        'buffers': 52,
        'cached': 122,
        'date': datetime.datetime(2014, 2, 3, 5, 0, 14, 347000),
        'free': 183,
        'shared': 0,
        'total': 485,
        'used': 301
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': datetime.datetime(2014, 2, 3, 6, 0, 14, 227000),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': datetime.datetime(2014, 2, 3, 7, 0, 14, 523000),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': datetime.datetime(2014, 2, 3, 8, 0, 13, 982000),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': datetime.datetime(2014, 2, 3, 9, 0, 14, 224000),
        'free': 183,
        'shared': 0,
        'total': 485,
        'used': 301
    }
]

SYSTEM_STORAGE_DATA = [
    {
      'available': 3429,
      'date': datetime.datetime(2014, 2, 2, 3, 0, 14, 146000),
      'percent': 41,
      'used': 2340
    },
    {
      'available': 3429,
      'date': datetime.datetime(2014, 2, 2, 4, 0, 14, 396000),
      'percent': 41,
      'used': 2340
    },
    {
        'available': 3429,
        'date': datetime.datetime(2014, 2, 2, 5, 0, 14, 62000),
        'percent': 41,
        'used': 2340
    },
    {
      'available': 3429,
      'date': datetime.datetime(2014, 2, 2, 6, 0, 13, 856000),
      'percent': 41,
      'used': 2340
    },
    {
        'available': 3429,
        'date': datetime.datetime(2014, 2, 2, 7, 0, 14, 412000),
        'percent': 41,
        'used': 2340
    }
]

SYSTEM_CONFIG_DATA = [
    {
        'arm_freq': 800,
        'config_hdmi_boost': 4,
        'core_freq': 250,
        'date': datetime.datetime(2014, 1, 27, 2, 23, 42, 612000),
        'disable_overscan': 1,
        'disable_splash': 1,
        'emmc_pll_core': 1,
        'force_pwm_open': 1,
        'hdmi_force_hotplug': 1,
        'hdmi_group': 2,
        'hdmi_ignore_edid': '0xa5000080',
        'hdmi_mode': 4,
        'hdmi_safe': 1,
        'overscan_bottom': 16,
        'overscan_left': 24,
        'overscan_right': 24,
        'overscan_top': 16,
        'pause_burst_frames': 1,
        'program_serial_random': 1,
        'sdram_freq': 400,
        'second_boot': 1,
        'temp_limit': 185.0
    }
]

BUS_STOP_CONFIG_DATA = [
    {
        'route': '8',
        'stopID': '15356'
    },
    {
        'route': '56',
        'stopID': '5518'
    },
    {
        'route': '124',
        'stopID': '5012'
    },
    {
        'route': '125',
        'stopID': '5029'
    }
]

NEWS_SOURCE_CONFIG_DATA = [
    {
        'date': datetime.datetime(2014, 1, 20, 4, 47, 21, 840000),
        'url': 'http://www.theverge.com/'
    },
    {
        'date': datetime.datetime(2014, 1, 20, 4, 47, 35, 806000),
        'url': 'http://arstechnica.com/'
    },
    {
        'date': datetime.datetime(2014, 1, 20, 4, 48, 3, 554000),
        'url': 'http://gigaom.com'
    }
]

NEWS_ARTICLE_KEYWORD_DATA = [
    {
        'score': 2,
        'word': 'information'
    },
    {
        'score': 1,
        'word': 'provide'
    },
    {
        'score': 9,
        'word': 'data'
    },
    {
        'score': 1,
        'word': 'trent'
    },
    {
        'score': 1,
        'word': 'iovine'
    }
]

NEWS_ARTICLE_DATA = [
    {
        'image_url': 'http://cdn0.sbnation.com/entry_photo_images/9732109/IMG_5171-1024_large_verge_super_wide.jpg',
        'keywords': [
            'paying',
            'partners',
            'personalities',
            'reportedly',
            'rules',
            'machinimas',
            'youtube',
            'inviting',
            'deal',
            'xbox',
            'video',
            'promote',
            'machinima',
            'microsoft',
            'sign'
        ],
        'summary': u"In addition, a copy of the full legal agreement leaked recently, detailing the confidentiality rules partners must abide by when they sign up.\r\nDigital marketing campaign clearinghouse\xa0Poptent shows listings from January 10th inviting YouTube stars to sign up for the Machinima deal, and\xa0reports of the quiet promotion surfaced this past weekend.\r\nPoptent also lists $1 per CPM deals from back in November inviting Machinima's stars to promote the Xbox One \u2014\xa0suggesting that this new mode of advertising has been going on since at least the console's launch.\r\nMicrosoft has reportedly partnered with Machinima to quietly pay the YouTube channel's video partners to promote the Xbox One.\xa0According to Ars Technica, Machinima's affiliates could get a $3 per CPM (or $3 for every 1,000 views) bonus if they included at least 30 seconds of Xbox One footage and mentioned the console by name in their videos.\r\nWe've reached out to Microsoft and Machinima for comment.",
        'title': 'Microsoft reportedly paying YouTube personalities to promote Xbox One',
        'url': 'http://www.theverge.com/2014/1/20/5328766/microsoft-reportedly-paying-youtube-personalities-to-promote-xbox-one'
    }
]

def rebuild_data(collection, dummy_data):
    collection.remove()
    collection.insert(dummy_data)


def get_database():
    client = MongoClient(sys.argv[1])
    return client.get_default_database()


if __name__ == "__main__":

    database = get_database()

    rebuild_data(database['indoortemperaturedatas'], INDOOR_TEMPERATURE_DATA)
    rebuild_data(database['indoorhumiditydatas'], INDOOR_HUMIDITY_DATA)
    rebuild_data(database['systemtemperaturedatas'], SYSTEM_TEMPERATURE_DATA)
    rebuild_data(database['systemmemorydatas'], SYSTEM_MEMORY_DATA)
    rebuild_data(database['systemstoragedatas'], SYSTEM_STORAGE_DATA)
    rebuild_data(database['systemconfigdatas'], SYSTEM_CONFIG_DATA)
    rebuild_data(database['busstopconfigs'], BUS_STOP_CONFIG_DATA)
    rebuild_data(database['newssourceconfigs'], NEWS_SOURCE_CONFIG_DATA)
    rebuild_data(database['newsarticlekeywords'], NEWS_ARTICLE_KEYWORD_DATA)
    rebuild_data(database['newsarticles'], NEWS_ARTICLE_DATA)
