import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import db from './db';
import User from './models/user.js';

let router = express.Router();

var app = express();
app.server = http.createServer(app);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));

db(() => {
    var user = new User();
    app.post('/', user.create);
    process.on('SIGINT', () => {
        console.log("\nStopping...");
        process.exit();
    });
    app.server.listen(process.env.PORT || 3000);
    console.log(`You can now post to port ${app.server.address().port} to create new users`);
});

export default app;
