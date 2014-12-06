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

This API is currently being redesigned. The previous routes related to charts have been temporarily removed. They will return after some other things are settled.


#### Get current reading from sensors

```
GET: /api/sensor
```

**Response Body**
```json
{
    "date": "2014-07-06T03:52:23.368Z",
    "temp_c": 22,
    "temp_f": 71.6,
    "humidity": 34.99,
    "pressure":984.61,
    "luminosity":61
}
```

#### Get current reading from Raspberry Pi system

```
GET: /api/raspberry-pi
```

**Response Body**
```json
{
    "date": "2014-07-06T03:52:23.368Z",
    "cpu_temp_c": 22,
    "cpu_temp_f": 71.6
}
```

#### Get forecast

```
GET: /api/weather
```

**Response Body:**
See [Forecast.io API documentation](https://developer.forecast.io/docs/v2)
