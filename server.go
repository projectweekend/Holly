package main

import (
    "flag"
    "github.com/codegangsta/negroni"
    "github.com/gorilla/mux"
    "net/http"
    "html/template"
)

func main() {

    port := flag.String("port", ":3000", "HTTP port")

    flag.Parse()

    router := mux.NewRouter()
    router.HandleFunc("/", HomeHandler)

    n := negroni.Classic()
    n.UseHandler(router)
    n.Run(*port)

}


func toPercent(f float64) float64 {
    return f * 100
}


func HomeHandler(w http.ResponseWriter, req *http.Request) {

    funcMap := template.FuncMap{
        "toPercent": toPercent,
    }

    tmpl, err := template.New("index.html").Funcs(funcMap).ParseFiles("templates/index.html")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }

    forecastData, err := forecast()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }

    err = tmpl.Execute(w, forecastData)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }

}
