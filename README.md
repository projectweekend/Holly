Holly
=====

This began as a home server project for my Raspberry Pi: [Pi-Holly](https://github.com/projectweekend/Pi-Holly). I'm a huge fan of the Pi, but as the project grew I started wishing I had a little more power under the hood. For the most part, this project is almost identical to its predecessor. The only differences are that any Raspberry Pi specific components have been removed.

The *web app* portion of this project uses [Node.js](http://nodejs.org/)/[MongoDB](http://www.mongodb.org/). It's based on [btford's](https://github.com/btford) awesome [Angular Socket IO Seed](https://github.com/btford/angular-socket-io-seed). The *system dashboard* page shown below uses websockets to receive updates from the server as new data is collected. All of the charting is done with [Chart.js](http://www.chartjs.org/).

In addition to the web app, there is a collection of worker processes, written in [Python](http://www.python.org/), performing some decoupled tasks. Right now there are five:

* One to check CPU temperature
* One to check memory usage
* One to check disk storage
* One to check system configuration
* One to collect news from specified sources

Each of these workers is scheduled using `crontab`. Holly also receives external room temperature/humidity data from a Raspberry Pi project I built called [Starbug](https://github.com/projectweekend/Pi-Starbug). This data is logged in the MongoDB and displayed in a couple charts also.

Holly is integrated with the [Philips HUE Wireless Lighting](http://www.meethue.com) system. This component is fairly basic at the moment. Right now it will:
* Find an existing bridge on the local network
* Handle the first time authorization/pairing process
* Present on/off buttons for each existing light in the Home section.
* While a light is on, display a slider control to change the current brightness.

An example of the controls can be found in the **Home Temperature Chart** screen shot below.

Holly is named after the ship's computer in one of my all-time favorite television shows, [Red Dwarf](http://en.wikipedia.org/wiki/Holly_(Red_Dwarf)). Growing up, I only caught this British Comedy/Sci-Fi sporadically on PBS, but it made a lasting impression. If it wasn't already obvious, this is definitely a work in progress. Stay tuned. :)

### Home Temperature Chart
![Home Temperature Chart Screen Shot](http://i.imgur.com/CDp0Sza.png)

### Home Humidity Chart
![Home Humidity Chart Screen Shot](http://i.imgur.com/HmFjkGy.png)

### System Temp Chart
![System Temp Page Screen Shot](http://i.imgur.com/9P9KqEQ.png)

### CTA Transit Info
![Transit Page Screen Shot](http://i.imgur.com/KTTnBJJ.png)

### News
![News Screen Shot](http://i.imgur.com/gVPEFek.jpg)

# Twitter Integration
Holly tweets the most recent **system CPU temperature** as well as the most recent **indoor temperature** and **indoor humidity** readings on an hourly basis. Currently, the frequency of the tweets is not configurable from the front-end, but I have plans to work on that. Auto-tweeting requires a [Twitter Developer](https://dev.twitter.com/) account so that the following variables can be defined using Holly's `/config` page.
* `TWITTER_CONSUMER_KEY`
* `TWITTER_CONSUMER_SECRET`
* `TWITTER_ACCESS_TOKEN_KEY`
* `TWITTER_ACCESS_TOKEN_SECRET`

# API Routes
The following routes are used add/retreive data from the web server exposed on the local network.

## Get latest indoor temperature

**GET:** `/api/indoor/temperature`

**Response:**
```
 {
     _id: "5302c65d09838858dffd791d",
     date: "2014-01-29T23:30:04.658Z",
     fahrenheit: 79.5199993133545,
     celsius: 26.399999618530273
 }
```

## Add indoor temperature reading

**POST:** `/api/indoor/temperature`

**Payload:**
```
 {
     fahrenheit: 79.5199993133545,
     celsius: 26.399999618530273
 }
```

## Add multiple indoor temperature readings

**POST:** `/api/indoor/temperature/bulk`

**Payload:**
```
 {
     temperature_data: [
         {
             fahrenheit: 79.5199993133545,
             celsius: 26.399999618530273
         },
         {
             fahrenheit: 79.5199993133545,
             celsius: 26.399999618530273
         },
         {
             fahrenheit: 79.5199993133545,
             celsius: 26.399999618530273
         }
         ...
     ]
 }
```

## Get recent indoor temperature readings

**GET:** `/api/indoor/temperature/recent`

**URL Parameters:**

* numberOfReadings - Optionally control the number of readings returned by this route. If not defined, the default number of records returned is 6.

**Response:**
```
 [
     {
         _id: "5302c65d09838858dffd791d",
         date: "2014-01-29T23:30:04.658Z",
         fahrenheit: 79.5199993133545,
         celsius: 26.399999618530273
     },
     {
         _id: "5302c65d09838858dffd791c",
         date: "2014-01-28T01:10:42.159Z",
         fahrenheit: 83.83999862670899,
         celsius: 28.799999237060547
     },
     {
         _id: "5302c65d09838858dffd791b",
         date: "2014-01-28T00:55:28.826Z",
         fahrenheit: 83.30000000000001,
         celsius: 28.5
     }
     ...
 ]
```

## Get latest indoor humidity

**GET:** `/api/indoor/humidity`

**Response:**
```
 {
     _id: "5302c65d09838858dffd7922",
     date: "2014-01-28T00:55:28.829Z",
     percent: 12.800000190734863
 }
```

## Add indoor humidity reading

**POST:** `/api/indoor/humidity`

**Payload:**
```
 {
     percent: 12.800000190734863
 }
```

## Add multiple indoor humidity readings

**POST:** `/api/indoor/humidity/bulk`

**Payload:**
```
 {
     humidity_data: [
         {
             percent: 12.800000190734863
         },
         {
             percent: 12.800000190734863
         },
         {
             percent: 12.800000190734863
         }
     ]
 }
```

## Get recent indoor humidity readings

**GET:** `/api/indoor/humidity/recent`

**URL Parameters:**

* numberOfReadings - Optionally control the number of readings returned by this route. If not defined, the default number of records returned is 6.

**Response:**
```
 [
     {
         _id: "5302c65d09838858dffd7922",
         date: "2014-01-28T00:55:28.829Z",
         percent: 12.800000190734863
     },
     {
         _id: "5302c65d09838858dffd7921",
         date: "2014-01-27T03:51:23.173Z",
         percent: 18.899999618530273
     },
     {
         _id: "5302c65d09838858dffd7920",
         date: "2014-01-27T03:46:53.939Z",
         percent: 18.899999618530273
     }
 ]
```

## Get indoor movement events

**GET: ** `/api/indoor/movement`


## Add an indoor movement event

**POST: ** `/api/indoor/movement`


## Add multiple indoor movement events

**POST: ** `/api/indoor/movement/bulk`


## Get latest system temperature

**GET:** `/api/system-temperature-data`


## Get recent indoor movement events

**GET: ** `/api/indoor/movement/recent`


**Response:** 
```
 {
     date: "2014-01-10T23:22:24.150Z",
     celsius: 40,
     fahrenheit: 104,
     _id: "52d080b03a62e79fbf000003",
     __v: 0
 }
```

## Get recent system temperatures
Right now, this returns the last 18 temperature readings. That limit will be moved into a URL parameter for more flexibility very soon.

**GET:** `/api/system/temperature/recent`

**URL Parameters:**

* numberOfReadings - Optionally control the number of readings returned by this route. If not defined, the default number of records returned is 6.

**Response:**
```
 [
     {
         date: "2014-01-10T23:22:24.150Z",
         celsius: 40,
         fahrenheit: 104,
         _id: "52d080b03a62e79fbf000003",
         __v: 0
     },
     {
         date: "2014-01-10T23:20:46.229Z",
         celsius: 47,
         fahrenheit: 116.6,
         _id: "52d0804e3a62e79fbf000002",
         __v: 0
     },
     {
         date: "2014-01-10T23:05:34.437Z",
         celsius: 46,
         fahrenheit: 114.8,
         _id: "52d07cbe3a62e79fbf000001",
         __v: 0
     }
 ]
```

## Get system temperature stats
This returns an object with the current, average, min, and max temperatures.

**GET:** `/api/system/temperature/stats`

**Response:**
```
 {
     average: 
     {
         celsius: 43,
         fahrenheit: 109.39999999999999
     },
     min: 
     {
         celsius: 40,
         fahrenheit: 104
     },
     max: 
     {
         celsius: 47,
         fahrenheit: 116.6
     }
 }
```

## Get latest memory usage

**GET:** `/api/system/memory`

**Response:**
```
 {
     date: "2014-01-14T02:00:06.058Z",
     total: 485,
     used: 170,
     free: 315,
     shared: 0,
     buffers: 15,
     cached: 74,
     _id: "52d49a26163cb90b06000001",
     __v: 0
}
```

## Get latest storage data

**GET:** `/api/system/storage`

**Response:**
```
 {
     date: "2014-01-14T02:00:06.455Z",
     available: 3531,
     used: 2238,
     percent: 39,
     _id: "52d49a26163cb90b06000003",
     __v: 0
 }
```

## Get third party config values

**GET:** `/api/system/third-party/config`

**Response:**
```
 [
     {
         _id: "531b1a0acdde91000db5f817",
         config_value: "alksdjfi4jalkdjf;jd",
         config_key: "BUS_TRACKER_API_KEY"
     },
     {
         _id: "531b1a0acdde91000db5f815",
         config_value: "kpero9a83rjapojdppoj3-1eof",
         config_key: "TWITTER_ACCESS_TOKEN_KEY"
     }
 ]
```

## Add a third party config value

**POST:** `/api/system/third-party/config`

**Payload:**
```
 {
     config_value: "kpero9a83rjapojdppoj3-1eof",
     config_key: "TWITTER_ACCESS_TOKEN_KEY"
 }
```

## Update a third party config value

**PUT:** `/api/system/third-party/config`

**Payload:**
```
 {
     _id: "531b1a0acdde91000db5f815",
     config_value: "kpero9a83rjapojdppoj3-1eof",
     config_key: "TWITTER_ACCESS_TOKEN_KEY"
 }
```

## Remove a third party config value

**DELETE:** `/api/system/third-party/config?id=531b1a0acdde91000db5f815`


## Get news sources

**GET:** `/api/news-source/config`

**Response:**
```
 [
     {
         date: "2014-01-20T00:48:56.373Z",
         url: "http://gigaom.com",
         _id: "52dc72782d0a03f342000001",
         __v: 0
     },
     {
         date: "2014-01-19T18:13:03.705Z",
         url: "http://www.theverge.com/",
         _id: "52dc15afbe18ba0000000001",
         __v: 0
     },
     {
         __v: 0,
         _id: "52db3d87b606877fb2000001",
         category: "technology",
         date: "2014-01-19T02:50:47.621Z",
         url: "http://arstechnica.com/"
     }
 ]
```

## Add a news source

**POST:** `/api/news-source/config`

**Payload:**
```
 {
     url: "http://www.theverge.com"
 }
```

## Update a news source

**PUT:** `/api/news-source/config`

**Payload:**
```
 {
     _id: "52dc15afbe18ba0000000001",
     url: "http://www.theverge.com"
 }
```

## Remove a news source

**DELETE:** `/api/news-source/config?id=52dc15afbe18ba0000000001`


## Get daily news articles

**GET:** `/api/news-articles`

**Respoonse:**
```
 [
     {
         _id: "52dde0d80983886bbae8b4e9",
         title: "Microsoft reportedly paying YouTube personalities to promote Xbox One",
         url: "http://www.theverge.com/2014/1/20/5328766/microsoft-reportedly-paying-youtube-personalities-to-promote-xbox-one",
         summary: "In addition, a copy of the full legal agreement leaked recently, detailing the confidentiality rules partners must abide by when they sign up. Digital marketing campaign clearinghouse Poptent shows listings from January 10th inviting YouTube stars to sign up for the Machinima deal, and reports of the quiet promotion surfaced this past weekend. Poptent also lists $1 per CPM deals from back in November inviting Machinima's stars to promote the Xbox One — suggesting that this new mode of advertising has been going on since at least the console's launch. Microsoft has reportedly partnered with Machinima to quietly pay the YouTube channel's video partners to promote the Xbox One. According to Ars Technica, Machinima's affiliates could get a $3 per CPM (or $3 for every 1,000 views) bonus if they included at least 30 seconds of Xbox One footage and mentioned the console by name in their videos. We've reached out to Microsoft and Machinima for comment.",
         image_url: "http://cdn0.sbnation.com/entry_photo_images/9732109/IMG_5171-1024_large_verge_super_wide.jpg",
         keywords: 
         [
             "paying",
             "partners",
             "personalities",
             "reportedly",
             "rules",
             "machinimas",
             "youtube",
             "inviting",
             "deal",
             "xbox",
             "video",
             "promote",
             "machinima",
             "microsoft",
             "sign"
         ]
     }
 ]
```

## Read an article

**POST:** `/api/news-articles/read`

**Payload:**
```
 {
     _id: "52dde0d80983886bbae8b4e9",
     title: "Microsoft reportedly paying YouTube personalities to promote Xbox One",
     url: "http://www.theverge.com/2014/1/20/5328766/microsoft-reportedly-paying-youtube-personalities-to-promote-xbox-one",
     summary: "In addition, a copy of the full legal agreement leaked recently, detailing the confidentiality rules partners must abide by when they sign up. Digital marketing campaign clearinghouse Poptent shows listings from January 10th inviting YouTube stars to sign up for the Machinima deal, and reports of the quiet promotion surfaced this past weekend. Poptent also lists $1 per CPM deals from back in November inviting Machinima's stars to promote the Xbox One — suggesting that this new mode of advertising has been going on since at least the console's launch. Microsoft has reportedly partnered with Machinima to quietly pay the YouTube channel's video partners to promote the Xbox One. According to Ars Technica, Machinima's affiliates could get a $3 per CPM (or $3 for every 1,000 views) bonus if they included at least 30 seconds of Xbox One footage and mentioned the console by name in their videos. We've reached out to Microsoft and Machinima for comment.",
     image_url: "http://cdn0.sbnation.com/entry_photo_images/9732109/IMG_5171-1024_large_verge_super_wide.jpg",
     keywords: 
     [
         "paying",
         "partners",
         "personalities",
         "reportedly",
         "rules",
         "machinimas",
         "youtube",
         "inviting",
         "deal",
         "xbox",
         "video",
         "promote",
         "machinima",
         "microsoft",
         "sign"
     ]
 }
```

## Ignore an article

**POST:** `/api/news-articles/ignore`

**Payload:**
```
 {
     _id: "52dde0d80983886bbae8b4e9",
     title: "Microsoft reportedly paying YouTube personalities to promote Xbox One",
     url: "http://www.theverge.com/2014/1/20/5328766/microsoft-reportedly-paying-youtube-personalities-to-promote-xbox-one",
     summary: "In addition, a copy of the full legal agreement leaked recently, detailing the confidentiality rules partners must abide by when they sign up. Digital marketing campaign clearinghouse Poptent shows listings from January 10th inviting YouTube stars to sign up for the Machinima deal, and reports of the quiet promotion surfaced this past weekend. Poptent also lists $1 per CPM deals from back in November inviting Machinima's stars to promote the Xbox One — suggesting that this new mode of advertising has been going on since at least the console's launch. Microsoft has reportedly partnered with Machinima to quietly pay the YouTube channel's video partners to promote the Xbox One. According to Ars Technica, Machinima's affiliates could get a $3 per CPM (or $3 for every 1,000 views) bonus if they included at least 30 seconds of Xbox One footage and mentioned the console by name in their videos. We've reached out to Microsoft and Machinima for comment.",
     image_url: "http://cdn0.sbnation.com/entry_photo_images/9732109/IMG_5171-1024_large_verge_super_wide.jpg",
     keywords: 
     [
         "paying",
         "partners",
         "personalities",
         "reportedly",
         "rules",
         "machinimas",
         "youtube",
         "inviting",
         "deal",
         "xbox",
         "video",
         "promote",
         "machinima",
         "microsoft",
         "sign"
     ]
 }
```

## Get article keywords

**GET:** `/api/article-keywords`

**Response:**
```
 [
     {
         word: "service",
         score: 1,
         _id: "52ddfecffc1a6c1a09000011",
         __v: 0
     },
     {
         word: "experience",
         score: 2,
         _id: "52ddfecffc1a6c1a09000012",
         __v: 0
     },
     {
         word: "music",
         score: 3,
         _id: "52ddfecffc1a6c1a09000013",
         __v: 0
     },
     {
         word: "login",
         score: 2,
         _id: "52ddfecffc1a6c1a09000014",
         __v: 0
     },
     {
         word: "available",
         score: 1,
         _id: "52ddfee4fc1a6c1a09000018",
         __v: 0
     }
 ]
```

## Get CTA bus routes

**GET:** `/api/bustracker/routes`

**Response:**
```
 [
     {
         route: "1",
         routeName: "Bronzeville/Union Station"
     },
     {
         route: "2",
         routeName: "Hyde Park Express"
     },
     {
         route: "3",
         routeName: "King Drive"
     },
     {
         route: "4",
         routeName: "Cottage Grove"
     },
     ...
 ]
```

## Get direction of travel a CTA bus route

**GET:** `/api/bustracker/directions?route=<route>`

**Response:**
```
 [
     "Northbound",
     "Southbound"
 ]
```

## Get bus stops for route and direction

**GET:** `/api/bustracker/stops?route=<route>&direction=<direction>`

**Response:**
```
 [
     {
         stopID: "17773",
         stopName: "Desplaines & Fulton/Milwaukee/Kinzie",
         latitude: "41.888009687847",
         longitude: "-87.644301652908"
     },
     {
         stopID: "5520",
         stopName: "Fulton & Desplaines",
         latitude: "41.886835573972",
         longitude: "-87.644060254097"
     },
     {
         stopID: "5518",
         stopName: "Jefferson & Lake",
         latitude: "41.885573577175",
         longitude: "-87.64274597168"
     },
     ...
 ]
```

## Get bus predictions for route and stop

**GET:** `/api/bustracker/predictions`

**Response:**
```
 [
     {
         title: "8 - Southbound",
         predictions: [
             {
                 type: "A",
                 time: "08:56",
                 distanceToStop: "9376",
                 delayed: false
             },
             {
                 type: "A",
                 time: "09:14",
                 distanceToStop: "28635",
                 delayed: false
             }
         ]
     },
     {
         title: "10 - Southbound",
         predictions: [
             {
                 type: "A",
                 time: "08:58",
                 distanceToStop: "1838",
                 delayed: false
             }
         ]
     },
     ...
 ]
```

## Get favorite bus stops

**GET:** `/api/bustracker/favorites`

**Response:**
```
 [
     {
         stopID: "1100",
         route: "10",
         _id: "52fc46b912b1c55b92000001",
         __v: 0
     },
     {
         stopID: "386",
         route: "20",
         _id: "52fc47641d07cc2293000001",
         __v: 0
     },
     {
         stopID: "1115",
         route: "29",
         _id: "52fc472f645abde092000001",
         __v: 0
     },
     ...
 ]
```

## Add a bus stop favorite

**POST:** `/api/bustracker/favorites`

**Payload:**
```
 {
     stopID: "1100",
     route: "10"
 }
```

## Remove a bus stop favorite

**DELETE:** `/api/bustracker/favorites?id=<_id>`
