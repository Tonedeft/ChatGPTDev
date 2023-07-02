const camelCaseKeys = require('camelcase-keys')
const express = require('express')
const uuid = require('uuid/v4')
const { mydebug, mytrace } = require('../../mydebug')

// expects a knex client db
function createQueries ({ db }) {
    mytrace()

    function byEmail(email) {
        mytrace()

        // Looks up the email in the user_credentials table
        return db  
            .then(client =>
                client('user_credentials')
                    .where({ email })
                    .limit(1)
            )
            .then(camelCaseKeys)
            .then(rows => rows[0])
    }

    return {
        byEmail
    }
}

function createActions ({ messageStore, queries }) {
    mytrace()

    // This action does a bunch of checking and then writes a Register Command
    // to the messageStore
    function registerUser(traceId, attributes) {
        mytrace()

        const context = { attributes, traceId, messageStore, queries }

        // relys on Promise chains to resolve effects
        // each function is defined in its own 'required' file and takes a
        // single context parameter.
        // each function also returns the context, and may throw errors
        return Bluebird.resolve(context)
            .then(validate)
            .then(loadExistingIdentity)
            .then(ensureThereWasNoExistingIdentity)
            .then(hashPassword)
            .then(writeRegisterCommand)
    }

    return {
        registerUser
    }
}

// createHandlers creates handlers for the webpage
// using PUG templates to generate the HTML served per route
function createHandlers({ actions }) {
    mytrace()

    // Create the handler for the request for "<TODO>"
    // This just _shows_ the registration form (GET /register)
    function handleRegistrationForm(req, res) {
        mytrace()

        // userId is generated before the form is submitted, and
        // included in the form as a hidden field
        const userId = uuid()

        res.render('register-users/templates/register', { userId })
    }

    // Create the handler for the request for "<TODO>"
    // This just _shows_ the registration complete form (GET /registration-complete)
    function handleRegistrationComplete(req, res) {
        mytrace()

        res.render('register-users/templates/registration-complete')
    }


    // called when user submits the registration form (POST /register)
    function handleRegisterUser(req, res, next) {
        mytrace()

        const attributes = {
            id: req.body.id,
            email: req.body.email,
            password: req.body.password
        }

        return actions
            .registerUser(req.context.traceId, attributes)
            .then(() => res.redirect(301, 'register/registration-complete'))
            .catch(ValidationError, err => 
                res
                    .status(400)
                    .render(
                        'register-users/templates/register',
                        { userId: attributes.id, errors: err.errors }
                    )
            )
            .catch(next)
    }

    return {
        handleRegistrationForm,
        handleRegistrationComplete,
        handleRegisterUser
    }
}

module.exports = createHandlers