import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import smtpTransport from 'nodemailer-smtp-transport';
import bcrypt from 'bcrypt';
import token from '../token.js';
import moment from 'moment';
import sendInvitation from '../mailer/sendInvitation.js';
import config from '../mailer/config.js';

import invitationMailer from '../mailer/invitation.js';
import invitationCollaboratifMailer from '../mailer/invitationCollaboratif.js';
import invitationCancelMailer from '../mailer/invitationCancel.js';
import invitationCagnotteMailer from '../mailer/invitationCagnotte.js';

moment.locale('fr');

var mailer = config();
var mailerCollaboratif = config();
var mailerCancel = config();
var mailerCagnotte = config();

const hashCode = (s) => s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    a & a;
}, 0);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    invitations: {
        type: Array,
    },
    participations: {
        type: Array,
    },
    categorie: {
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
    createDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    elements: {
        toBring: {
            type: Array
        },
        partBring: {
            type: Array
        }
    },
    adresse: {
        type: String
    },
    lieu: {
        type: String
    },
    description: {
        type: String
    },
    style: {
        type: String,
        default: ''
    },
    place_url:  {
        type: String
    },
    private:  {
        type: Boolean,
        default: false
    },
    budget: {
        type: Number,
        default: 0
    },
    tresorier: {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        }
    },
    pending: {
        type: Array
    }
});

mailerCagnotte.use('compile', hbs(invitationCagnotteMailer.options));
mailerCollaboratif.use('compile', hbs(invitationCollaboratifMailer.options));
mailerCancel.use('compile', hbs(invitationCancelMailer.options));
mailer.use('compile', hbs(invitationMailer.options));

mailer.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

eventSchema.methods.comparePassword = function(pwd, cb) {
    bcrypt.compare(pwd, this.password, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    });
};

var today = moment().startOf('day');

let model = mongoose.model('Event', eventSchema);

export default class Event {

    findAll(req, res) {
        model.find({
                startDate: {
                    $gte: today.toDate()
                }
            }, {
                password: 0
            }).populate('author', 'name groupe')
            .exec((err, events) => {
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
            })
            .populate({
                path: 'author',
                select: 'name groupe email'
            })
            .exec((err, event) => {
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

    sendInvitation(req, res) {
        model.findById(req.params.id)
            .populate({
                path: 'author',
                select: 'name groupe email'
            })
            .exec((err, event) => {
                if (err) {
                    res.status(500).send(err.message);
                } else if (!event) {
                    res.status(404);
                } else {
                    sendInvitation(event, 0, mailer, invitationMailer.mail);
                    res.json({
                        success: true
                    });
                }
            });
    }

    sendInvitationCollaboratif(req, res) {
        model.findById(req.params.id)
            .populate({
                path: 'author',
                select: 'name groupe email'
            })
            .exec((err, event) => {
                if (err) {
                    res.status(500).send(err.message);
                } else if (!event) {
                    res.status(404);
                } else {
                    sendInvitation(event, 0, mailerCollaboratif, invitationCollaboratifMailer.mail);
                    res.json({
                        success: true
                    });
                }
            });
    }

    sendInvitationCagnotte(req, res) {
        model.findById(req.params.id)
            .populate({
                path: 'author',
                select: 'name groupe email'
            })
            .exec((err, event) => {
                if (err) {
                    res.status(500).send(err.message);
                } else if (!event) {
                    res.status(404);
                } else {
                    sendInvitation(event, 0, mailerCagnotte, invitationCagnotteMailer.mail);
                    res.json({
                        success: true
                    });
                }
            });
    }

    sendAnnulation(req, res) {
        model.findById(req.params.id, (err, event) => {
            if (err) {
                res.status(500).send(err.message);
            } else if (!event) {
                res.status(404);
            } else {
                sendInvitation(event, 0, mailerCancel, invitationCancelMailer.mail);
                res.json({
                    success: true
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
