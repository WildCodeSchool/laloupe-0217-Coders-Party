import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import bcrypt from 'bcrypt';
import token from '../token.js';
import moment from 'moment';
moment.locale('fr');


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
    place_url:  {
        type: String
    }
});

var mailer = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "codersparty@gmail.com",
        pass: "c0d3r5p4rty"
    }
});

var options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: '../server/api/views/email/',
        defaultLayout: 'template',
        partialsDir: '../server/api/views/partials/'
    },
    viewPath: '../server/api/views/email/',
    extName: '.hbs'
};

mailer.use('compile', hbs(options));

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
            })
            .populate('author', 'name')
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
    model.findById(req.params.id, (err, event) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (!event) {
        res.status(404);
      } else {
        event.invitations.forEach((guest) => {

          mailer.sendMail({
            from: "codersparty@gmail.com",
            to: guest.email,
            subject: "Coders Party",
            template: 'email.body',
            context: {
              variable1 : 'Bonjour ' + guest.name + ' !',
              variable2 : 'Tu es invité pour l\'évènement ' + event.name,
              variable3 : 'Description évènement : ' + event.description,
              variable4 : event.place_url,
              variable5 : 'Adresse : ' + event.adresse,
              // variable6 : 'http://localhost:8000/#!/user/event/'
              variable6 : 'L\'évènement aura lieu le ' + moment(event.startDate).format('dddd d MMMM YYYY') + ' à ' + moment(event.startTime).format('HH:mm'),
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
