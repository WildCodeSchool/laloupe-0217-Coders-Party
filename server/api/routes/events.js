import express from 'express';
import Event from '../models/event.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var event = new Event();

    router.post('/newevent', Auth.hasAuthorization, event.create);

    router.get('/', Auth.hasAuthorization, event.findAll);

    router.get('/:id', Auth.hasAuthorization, event.findById);

    router.put('/:id', Auth.hasAuthorization, event.update);

    router.delete('/:id', Auth.isAdministrator, event.delete);

    app.use('/events', router);

};
