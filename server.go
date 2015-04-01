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


func HomeHandler(w http.ResponseWriter, req *http.Request) {

    tmpl, err := template.New("index.html").ParseFiles("templates/index.html")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }

    data := []string{}

    err = tmpl.Execute(w, data)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }

}
