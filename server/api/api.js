import express from 'express';
import fs from 'fs';
import path from 'path';

export default (app) => {

    const apiRouter = express.Router();

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal error');
    });

    fs.readdir('./api/routes', (error, files) => {
        if (error) {
            throw error;
        } else {
            files.forEach((file) => {
                require('./routes/' + file.substr(0, file.lastIndexOf('.')))(apiRouter);
            });
        }
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../', '404.html'));
        });
    });

    return apiRouter;

};
