const Projects = require('../projects/projects-model');
const Actions = require('../actions/actions-model');

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url}`
        );
        next();
    }
    
function checkActionIdExists(req, res, next) {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
        if (action) {
            req.action = action
            next()
        } else {
            next({ status: "404", message: `action with id ${id} not found!!!` })
        }
        })
        .catch(next)
}

function checkProjectIdExists(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
        if (project) {
            req.project = project
            next()
        } else {
            next({  status: "404", message: `project with id ${id} not found!!!` })
        }
    })
        .catch(next)
}

function checkValidProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || completed === undefined) { 
        next({ message: "missing required name, description or completed field", status: 400 })
    } else {
        next()
    }
}

function checkValidAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if (!description || !notes || !project_id || completed === undefined) { 
        next({ message: "missing notes, desctiption, or project_id", status: 400 })
    } else {
        next()
    }
}

module.exports = { 
    logger, 
    checkActionIdExists, 
    checkProjectIdExists, 
    checkValidProject,
    checkValidAction
};