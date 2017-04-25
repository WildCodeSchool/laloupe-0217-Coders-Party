import express from 'express';
import Group from '../models/group.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var group = new Group();

    app.post('/login', group.connect);

    router.get('/', group.findAll);

    router.get('/:id', Auth.hasAuthorization, group.findById);

    router.post('/', group.create);

    router.put('/:id', Auth.hasAuthorization, group.update);

    router.delete('/:id', Auth.isAdministrator, group.delete);

    app.use('/groups', router);

};
