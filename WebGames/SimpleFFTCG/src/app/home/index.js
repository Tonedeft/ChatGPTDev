const camelCaseKeys = require('camelcase-keys')
const express = require('express')
const { mydebug, mytrace } = require('../../mydebug')

// createHandlers creates handlers for the webpage
// using PUG templates to generate the HTML served per route
function createHandlers ({ queries }) {
    mytrace()

    // Create the handler for the request for "home"
    function home (req, res, next) {
        mytrace()
        // My home should show:
        // 1. Table of available "tables" that you can access
        // 2. "Create Table" button

        return queries
            .loadHomePage() // Get the home page data
            .then(homePageData => // Render the home page data
                res.render('home/templates/home', homePageData.pageData)
            )
            .catch(next)
    }

    return {
        home
    }
}

function createQueries ({ db }) {
    mytrace()

    function loadHomePage () {
        mytrace()
        // Get the client connection
        // then access the table named 'videos'
        // then sum the view_counts on that table and call it videosWatched
        // then extract the first row entry
        return db.then(client =>
            client('pages')
                .where({page_name: 'home'})
                .limit(1)
                .then(camelCaseKeys)
                .then(rows => rows[0])
        )
    }

    return {
        loadHomePage
    }
}

// Takes as input a client connection to a database
function createHome ({ db }) {
    mytrace()
    const queries = createQueries({ db })
    const handlers = createHandlers({ queries })
    const router = express.Router()

    router.route('/').get(handlers.home)

    return { handlers, queries, router }
}

module.exports = createHome