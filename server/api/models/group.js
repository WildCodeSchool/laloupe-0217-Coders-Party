import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const hashCode = (s) => s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    a & a;
}, 0);

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    members: {
        type: Array,
    }
});

groupSchema.methods.comparePassword = function(pwd, cb) {
    bcrypt.compare(pwd, this.password, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    });
};

let model = mongoose.model('Group', groupSchema);

export default class Group {

    connect(req, res) {
        if (!req.body.email) {
            res.status(400).send('Please enter an email');
        } else if (!req.body.password) {
            res.status(400).send('Please enter a password');
        } else {
            model.findOne({
                email: req.body.email
            }, (err, group) => {
                if (err || !group) {
                    res.sendStatus(403);
                } else {
                    group.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            if (isMatch) {
                                group.password = null;
                                let tk = jsonwebtoken.sign(group, token, {
                                    expiresIn: "24h"
                                });
                                res.json({
                                    success: true,
                                    group: group,
                                    token: tk
                                });
                            } else {
                                res.status(400).send('Incorrect password');
                            }
                        }
                    });
                }
            });
        }
    }

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, groups) => {
            if (err || !groups) {
                res.sendStatus(403);
            } else {
                res.json(groups);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, group) => {
            if (err || !group) {
                res.sendStatus(403);
            } else {
                res.json(group);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, group) => {
                if (err || !group) {
                    res.status(400).send(err.message);
                } else {
                    res.json({
                        success: true,
                        group
                    });
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, group) => {
            if (err || !group) {
                res.status(500).send(err.message);
            } else {
                let tk = jsonwebtoken.sign(group, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    group: group,
                    token: tk
                });
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
