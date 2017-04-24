import jsonwebtoken from 'jsonwebtoken';
import token from '../token.js';

export default {

    hasAuthorization: (req, res, next) => {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, token, (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    next();
                }
            });
        } else {
            return res.sendStatus(403);
        }
    },

    isAdministrator: (req, res, next) => {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, token, (err, decoded) => {
                if (decoded._doc && decoded._doc.isAdmin) {
                    next();
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    }
};
