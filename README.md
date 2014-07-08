You can see Holly in action at: [http://holly.projectweekend.net/](http://holly.projectweekend.net/)


## Development Environment

The development environment uses [Docker](http://www.docker.com/) and [Fig](http://orchardup.github.io/fig/). This makes it super easy to get up and running with a configuration that would closely mirror production. A [Vagrant](http://www.vagrantup.com/) config file is included for operating systems that cannot yet run Docker natively.

With Docker/Fig/Vagrant installed, use the following steps to launch for the first time:

* `npm install` from within the project root to locally install all of the web app's Node dependencies.
* `fig up` to start the web app. This will download and provision two containers: one running Mongo and one running Holly. This will take a while, but once it completes subsequent launches will be much faster.
* When `fig up` completes, the app should be accessible at [http://127.0.0.1:3000](http://127.0.0.1:3000). (NOTE: if running commands within the Vagrant VM that is provisioned by the `Vagrantfile` included here, the app can be found at: [http://192.168.13.81:3000](http://192.168.13.81:3000))


## Configuration

There are just a couple of configurations managed as environment variables. In the development environment, these are injected by Fig and managed in the `fig.yml` file.

* `PORT` - Changes the port number for the web app. The default is 3000.
* `JWT_SECRET` - This is a secret string that you make up. It is used to encrypt and verify the authentication token on routes that require authentication.

## API Info

The web app uses a handful of API routes transporting JSON data. There is also a single route for receiving sensor readings. I use one of my Raspberry Pi projects ([Pi-Red-Dwarf](https://github.com/projectweekend/Pi-Red-Dwarf)) to transmit this data, but all you need is something capable of making an HTTP POST request.

#### Add new sensor readings

```
POST: /api/sensor
```

**Request Body**
~~~json
{
    "temp_c": 22,
    "temp_f": 71.6,
    "humidity": 55.4,
    "pressure": 895.3,
    "luminosity": 1003.3
}
~~~

**Response Body**
~~~json
{
    "_id": "53b8c7f74a9a52a629de9121",
    "date": "2014-07-06T13:54:04.358Z",
    "temp_c": 22,
    "temp_f": 71.6,
    "humidity": 55.4,
    "pressure": 895.3,
    "luminosity": 1003.3
}
~~~

**NOTE**
I run Holly publically so this route requires an authentication token. If you plan on doing the same, you should also use SSL to encrypt traffic to this route. The project includes a simple command line tool to help you generate a token for any device that will access this route. The tool takes two parameters. For the first one, use the same string as the `JWT_SECRET` environment variable referenced above in the Configuration section. The second is another string you make up that will go into the body of the token.

```
./get_token JwtTokenSecretHere WhateverYouWant
```

The value returned from this tool must be set in the `Authorization` header to satisfy authentication. Here is an example formatting of the header/value pair:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IkJ1bGxTaGl0RGF0YSIs
```


#### Get latest temperature reading

```
GET: /api/sensor/temperature
```

**Response Body**
```json
{
    "_id": "53b8c7f74a9a52a629de9121",
    "temp_c": 22,
    "temp_f": 71.6,
    "date": "2014-07-06T03:52:23.368Z"
}
```


#### Get sensor readings for temperature chart

```
GET: /api/chart/temperature
```

**Response Body**
```json
[
    {
        "_id": "53b8c7f74a9a52a629de9121",
        "temp_c": 22,
        "temp_f": 71.6,
        "date": "2014-07-06T03:52:23.368Z"
    }
]
```


#### Get latest humdity reading

```
GET: /api/sensor/humidity
```

**Response Body**
```json
{
    "_id": "53b954fcf11151202bd12437",
    "humidity": 55.4,
    "date": "2014-07-06T13:54:04.358Z"
}
```


#### Get sensor readings for humidity chart

```
GET: /api/chart/humidity
```

**Response Body**
```json
[
    {
        "_id": "53b954fcf11151202bd12437",
        "humidity": 55.4,
        "date": "2014-07-06T13:54:04.358Z"
    }
]
```


#### Get latest pressure reading

```
GET:  /api/sensor/pressure
```

**Response Body**
```json
{
    "_id": "53b954fcf11151202bd12437",
    "pressure": 895.3,
    "date": "2014-07-06T13:54:04.358Z"
}
```


#### Get sensor readings for pressure chart

```
GET:  /api/chart/pressure
```

**Response Body**
```json
[
    {
        "_id": "53b954fcf11151202bd12437",
        "pressure": 895.3,
        "date": "2014-07-06T13:54:04.358Z"
    }
]
```
