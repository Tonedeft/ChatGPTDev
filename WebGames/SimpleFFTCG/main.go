package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Serve the index.html file when a request comes to the root path "/"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "main.html")
	})

	// Start the server on port 8080
	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
