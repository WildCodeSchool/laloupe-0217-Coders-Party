import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const hashCode = (s) => s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    a & a;
}, 0);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    liste: {
      type: Array,
    },
    invitations: {
      type: Array,
    },
    image: {
      type: String,
    },
    startDate: {
      type: Date,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    endDate: {
      type: Date,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    createDate: {
      type: Date,
      default: Date.now
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    elements: {
      type: Array
    }
});

eventSchema.methods.comparePassword = function(pwd, cb) {
    bcrypt.compare(pwd, this.password, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    });
};

let model = mongoose.model('Event', eventSchema);

export default class Event {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, events) => {
            if (err || !events) {
                res.sendStatus(403);
            } else {
                res.json(events);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, event) => {
            if (err || !event) {
                res.sendStatus(403);
            } else {
                res.json(event);
            }
        });
    }

    create(req, res) {
        model.create(req.body,
            (err, event) => {
                if (err || !event) {
                    res.status(400).send(err.message);
                } else {
                    res.json({
                        success: true,
                        event: event,
                    });
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, event) => {
            if (err || !event) {
                res.status(500).send(err.message);
            } else {
                let tk = jsonwebtoken.sign(event, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    event: event,
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
