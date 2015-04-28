package main


import (
    "os"
    "fmt"
    "net/http"
    "log"
    "io/ioutil"
    "encoding/json"
)


var apiKey string = os.Getenv("FORECAST_API_KEY")
var urlTemplate string = "https://api.forecast.io/forecast/%s/41.8853936,-87.6433909?exclude=minutely,hourly,daily,flags,alerts"


type Forecast struct {
    Currently struct {
        ApparentTemperature  float64 `json:"apparentTemperature"`
        CloudCover           float64 `json:"cloudCover"`
        DewPoint             float64 `json:"dewPoint"`
        Humidity             float64 `json:"humidity"`
        Icon                 string  `json:"icon"`
        NearestStormBearing  float64 `json:"nearestStormBearing"`
        NearestStormDistance float64 `json:"nearestStormDistance"`
        Ozone                float64 `json:"ozone"`
        PrecipIntensity      float64 `json:"precipIntensity"`
        PrecipProbability    float64 `json:"precipProbability"`
        Pressure             float64 `json:"pressure"`
        Summary              string  `json:"summary"`
        Temperature          float64 `json:"temperature"`
        Time                 float64 `json:"time"`
        Visibility           float64 `json:"visibility"`
        WindBearing          float64 `json:"windBearing"`
        WindSpeed            float64 `json:"windSpeed"`
    } `json:"currently"`
    Latitude  float64 `json:"latitude"`
    Longitude float64 `json:"longitude"`
    Offset    float64 `json:"offset"`
    Timezone  string  `json:"timezone"`
}

func forecast() (Forecast, error)  {

    url := fmt.Sprintf(urlTemplate, apiKey)

    r, err := http.Get(url)
    if err != nil {
        log.Fatal(err)
    }

    defer r.Body.Close()
    data, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
    }

    var f Forecast
    err = json.Unmarshal(data, &f)

    return f, err
}
