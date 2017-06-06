import express from 'express';
import Comment from '../models/comment.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
      res.sendStatus(200);
  });

  var comment = new Comment();

  router.get('/forEvent/:eventId', comment.findAllForEvent);

  router.get('/forEvent/:eventId', Auth.hasAuthorization, comment.findAllForEvent);

  router.post('/addcomment', Auth.hasAuthorization, comment.addComment);

  // router.put('/delcomment', Auth.hasAuthorization, comment.delComment);

  app.use('/comments', router);
};
