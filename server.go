package main

import (
    "flag"
    "fmt"
    "github.com/codegangsta/negroni"
    "github.com/gorilla/mux"
    "net/http"
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
        fmt.Fprintf(w, "Don't worry, I'll be back")
}
