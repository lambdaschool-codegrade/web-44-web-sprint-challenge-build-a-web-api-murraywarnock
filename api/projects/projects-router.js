// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

const { logger, checkProjectIdExists, checkValidProject } = require('../middleware/middleware')

router.get('/', logger, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const result = await Projects.get()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const result = await Projects.get(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
});

router.post('/', logger, checkValidProject, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns the newly created project as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    try {
        await Projects.insert(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', logger, checkProjectIdExists, checkValidProject, async (req, res, next) => {
    // Returns the updated project as the body of the response.
    // If there is no project with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        await Projects.update(req.params.id, req.body);
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
 });
// This endpoint will successfully delete an existing project, but then hangs 
router.delete('/:id', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    const { id } = req.params;
    await Projects.remove(id)
    try {
        await Projects.remove(req.params.id);
        res.status(200).json({message: `Successfully deleted project id ${id}`});
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    // Returns an array of actions (could be empty) belonging to a project with the given id.
    // If there is no project with the given id it responds with a status code 404.
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        res.status(201).json(projectActions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;