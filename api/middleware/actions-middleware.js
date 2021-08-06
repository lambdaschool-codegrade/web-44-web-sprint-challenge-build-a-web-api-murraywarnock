const Actions = require('../actions/actions-model');

function checkActionIdExists(req, res, next) {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
        if (action) {
            req.action = action
            next()
        } else {
            next({ status: "404", message: `Action with id ${id} not found.` })
        }
        })
        .catch(next)
}

function checkValidAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if (!description || !notes || !project_id || completed === undefined) { 
        next({ message: "Notes, description, and project_id are required.", status: 400 })
    } else {
        next()
    }
}

module.exports = { 
    checkActionIdExists, 
    checkValidAction,
};