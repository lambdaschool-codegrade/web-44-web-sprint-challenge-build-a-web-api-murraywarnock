// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

function checkProjectIdExists(req, res, next) {
    const { id } = req.params
    Projects.get(id)
      .then(project => {
        if (project) {
          req.project = project
          next()
        } else {
         next({ message: `project with id ${id} not found!!!` })
        }
      })
      .catch(next)
}

// module.exports = {
//     get,
//     insert,
//     update,
//     remove,
//     getProjectActions,
//   };

router.get('/projects', (req, res, next) => {
    // Returns an array of projects as the body of the response.
    // If there are no projects it responds with an empty array.
});

router.get('/projects/:id', checkProjectIdExists, (req, res, next) => {
    // Returns a project with the given id as the body of the response.
    // If there is no project with the given id it responds with a status code 404.
});

router.post('/projects', (req, res, next) => {
    // Returns the newly created project as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
});

router.put('/projects/:id', checkProjectIdExists, (req, res, next) => {
    // Returns the updated project as the body of the response.
    // If there is no project with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
 });
 
router.delete('/projects/:id', checkProjectIdExists, (req, res, next) => {
     // RReturns no response body.
     // If there is no project with the given id it responds with a status code 404.
});

router.get('/projects/:id/actions', checkProjectIdExists, (req, res, next) => {
    // Returns an array of actions (could be empty) belonging to a project with the given id.
    // If there is no project with the given id it responds with a status code 404.
});

module.exports = router;