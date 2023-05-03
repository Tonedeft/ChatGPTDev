const camelCaseKeys = require('camelcase-keys')
const express = require('express')
const uuid = require('uuid/v4')
const { mydebug, mytrace } = require('../../mydebug')

// createHandlers creates handlers for the webpage
// using PUG templates to generate the HTML served per route
function createHandlers({ queries }) {
    mytrace()

    // Create the handler for the request for "<TODO>"
    // This just _shows_ the registration form
    function handleRegistrationForm(req, res) {
        mytrace()

        // userId is generated before the form is submitted, and
        // included in the form as a hidden field
        const userId = uuid()

        res.render('register-users/templates/register', { userId })
    }

    // Create the handler for the request for "<TODO>"
    // This just _shows_ the registration complete form
    function handleRegistrationComplete(req, res) {
        mytrace()

        res.render('register-users/templates/registration-complete')
    }

    return {
        handleRegistrationForm,
        handleRegistrationComplete
    }
}

module.exports = createHandlers