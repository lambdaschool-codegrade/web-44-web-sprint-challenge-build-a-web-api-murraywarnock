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

router.get('/', logger, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns an array of actions (or an empty array) as the body of the response.
    try {
        const actions = await Actions.get()
        res.status(201).json(actions);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', logger, checkActionIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns an action with the given id as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    try {
        const action = await Actions.get(req.params.id);
        res.status(201).json(action);
    } catch (error) {
        next(error);
    }
});
router.post('/', logger, checkValidAction, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    // When adding an action make sure the project_id provided belongs to an existing project
    try {
        const action = await Actions.insert(req.body);
        res.status(201).json(action);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', logger, checkActionIdExists, checkValidAction, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns the updated action as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
    try {
        const action = await Actions.update(req.params.id, req.body);
        res.status(201).json(action);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', logger, checkActionIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns no response body.
    // If there is no action with the given id it responds with a status code 404.
    try {
        await Actions.remove(req.params.id);
        res.status(201);
    } catch (error) {
        next(error);
    }
});

module.exports = router;