const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const router = express.Router();

router.use('/actions', actionsRouter);
router.use('/projects', projectsRouter);

module.exports = router;