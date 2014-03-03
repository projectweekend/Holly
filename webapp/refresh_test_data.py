import sys
import datetime
from pymongo import MongoClient

NOW = datetime.datetime.utcnow()

INDOOR_TEMPERATURE_DATA = [
    {
        'celsius': 29.600000381469727,
        'date': NOW,
        'fahrenheit': 85.28000068664551
    },
    {
        'celsius': 29.200000762939453,
        'date': NOW + datetime.timedelta(days=-1),
        'fahrenheit': 84.56000137329102
    },
    {
        'celsius': 28.5,
        'date': NOW + datetime.timedelta(days=-5),
        'fahrenheit': 83.30000000000001
    },
    {
        'celsius': 28.799999237060547,
        'date': NOW + datetime.timedelta(days=-10),
        'fahrenheit': 83.83999862670899
    },
    {
        'celsius': 26.399999618530273,
        'date': NOW + datetime.timedelta(days=-20),
        'fahrenheit': 79.5199993133545
    },
    {
        'celsius': 25.600000381469727,
        'date': NOW + datetime.timedelta(days=-21),
        'fahrenheit': 78.08000068664552
    },
    {
        'celsius': 25.799999237060547,
        'date': NOW + datetime.timedelta(days=-22),
        'fahrenheit': 78.43999862670898,
    },
    {
        'celsius': 26.299999237060547,    
        'date': NOW + datetime.timedelta(days=-23),
        'fahrenheit': 79.33999862670899
    }    
]

INDOOR_HUMIDITY_DATA = [
    {
        'date': NOW,
        'percent': 20
    },
    {
        'date': NOW + datetime.timedelta(days=-1),
        'percent': 20
    },
    {
        'date': NOW + datetime.timedelta(days=-10),
        'percent': 18.899999618530273
    },
    {
        'date': NOW + datetime.timedelta(days=-21),
        'percent': 18.899999618530273
    },
    {
        'date': NOW + datetime.timedelta(days=-23),
        'percent': 12.800000190734863
    }
]

SYSTEM_TEMPERATURE_DATA = [
    {
        'celsius': 47.6,
        'date': NOW,
        'from': 'Starbug',
        'fahrenheit': 117.68
    },
    {
        'celsius': 47.1,
        'date': NOW + datetime.timedelta(days=-1),
        'from': 'Starbug',
        'fahrenheit': 116.78
    },
    {
        'celsius': 48.7,
        'date': NOW + datetime.timedelta(days=-10),
        'from': 'Starbug',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': NOW + datetime.timedelta(days=-15),
        'from': 'Starbug',
        'fahrenheit': 117.68
    },
    {
        'celsius': 48.7,
        'date': NOW + datetime.timedelta(days=-20),
        'from': 'Starbug',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': NOW,
        'from': 'Holly',
        'fahrenheit': 117.68
    },
    {
        'celsius': 47.1,
        'date': NOW + datetime.timedelta(days=-1),
        'from': 'Holly',
        'fahrenheit': 116.78
    },
    {
        'celsius': 48.7,
        'date': NOW + datetime.timedelta(days=-10),
        'from': 'Holly',
        'fahrenheit': 119.66000000000001
    },
    {
        'celsius': 47.6,
        'date': NOW + datetime.timedelta(days=-15),
        'from': 'Holly',
        'fahrenheit': 117.68
    },
    {
        'celsius': 48.7,
        'date': NOW + datetime.timedelta(days=-20),
        'from': 'Holly',
        'fahrenheit': 119.66000000000001
    }
]

SYSTEM_MEMORY_DATA = [
    {
        'buffers': 52,
        'cached': 122,
        'date': NOW,
        'free': 183,
        'shared': 0,
        'total': 485,
        'used': 301
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': NOW + datetime.timedelta(days=-1),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': NOW + datetime.timedelta(days=-10),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': NOW + datetime.timedelta(days=-15),
        'free': 184,
        'shared': 0,
        'total': 485,
        'used': 300
    },
    {
        'buffers': 52,
        'cached': 122,
        'date': NOW + datetime.timedelta(days=-20),
        'free': 183,
        'shared': 0,
        'total': 485,
        'used': 301
    }
]

SYSTEM_STORAGE_DATA = [
    {
      'available': 3429,
      'date': NOW,
      'percent': 41,
      'used': 2340
    },
    {
      'available': 3429,
      'date': NOW + datetime.timedelta(days=-1),
      'percent': 41,
      'used': 2340
    },
    {
        'available': 3429,
        'date': NOW + datetime.timedelta(days=-10),
        'percent': 41,
        'used': 2340
    },
    {
      'available': 3429,
      'date': NOW + datetime.timedelta(days=-15),
      'percent': 41,
      'used': 2340
    },
    {
        'available': 3429,
        'date': NOW + datetime.timedelta(days=-20),
        'percent': 41,
        'used': 2340
    }
]

SYSTEM_CONFIG_DATA = [
    {
        'arm_freq': 800,
        'config_hdmi_boost': 4,
        'core_freq': 250,
        'date': NOW,
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
