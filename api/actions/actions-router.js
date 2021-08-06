// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { logger, checkActionIdExists, checkValidAction } = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', logger, checkActionIdExists, async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        res.status(200).json(action);
    } catch (error) {
        next(error);
    }
});

router.post('/', logger, checkValidAction, async (req, res, next) => {
    try {
        const action = await Actions.insert(req.body);
        res.status(201).json(action);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', logger, checkActionIdExists, checkValidAction, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const action = await Actions.update(req.params.id, req.body);
        res.status(200).json(action);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', logger, checkActionIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    const { id } = req.params;
    try {
        await Actions.remove(id);
        res.status(200).json({message: `Successfully deleted action id ${id}`});
    } catch (error) {
        next(error);
    }
});

module.exports = router;