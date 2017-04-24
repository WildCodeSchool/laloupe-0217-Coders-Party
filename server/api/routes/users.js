import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var user = new User();

    app.post('/login', user.connect);

    router.get('/', Auth.isAdministrator, user.findAll);

    router.get('/:id', Auth.isAdministrator, user.findById);

    router.post('/', user.create);

    router.put('/:id', Auth.isAdministrator, user.update);

    router.delete('/:id', Auth.isAdministrator, user.delete);

    app.use('/users', router);

};
