const Projects = require('../projects/projects-model');

function checkProjectIdExists(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
        if (project) {
            req.project = project
            next()
        } else {
            next({  status: "404", message: `Project with id ${id} not found.` })
        }
    })
        .catch(next)
}

function checkValidProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || completed === undefined) { 
        next({ message: "Name, description and completed columns are required.", status: 400 })
    } else {
        next()
    }
}

module.exports = { 
    checkProjectIdExists, 
    checkValidProject
};