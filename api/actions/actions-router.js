// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { logger, checkActionIdExists, checkValidAction } = require('../middleware/middleware')


const router = express.Router();

// module.exports = {
//     get,
//     insert,
//     update,
//     remove,
//   };

router.get('/', logger, (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns an array of actions (or an empty array) as the body of the response.
});

router.get('/:id', logger, checkActionIdExists,  (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns an action with the given id as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
});
router.post('/', logger, checkValidAction, (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    // When adding an action make sure the project_id provided belongs to an existing project
});

router.put('/:id', logger, checkActionIdExists, checkValidAction, (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns the updated action as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
});

router.delete('/:id', logger, checkActionIdExists, (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns no response body.
    // If there is no action with the given id it responds with a status code 404.
});

module.exports = router;