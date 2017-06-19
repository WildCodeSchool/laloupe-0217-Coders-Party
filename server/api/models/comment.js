import mongoose from 'mongoose';
import User from './user.js';

const commentSchema = new mongoose.Schema({

    eventId: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author_odyssey: {
        type: String,
        default: "ùmlmkm"
    },
    title: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String
    }
});


let model = mongoose.model('Comment', commentSchema);

export default class Comment {

    findAllForEvent(req, res) {
        model.find({
                eventId: req.params.eventId
            })
            .populate('author', 'name')
            .exec(
                (err, comments) => {
                    if (err || !comments) {
                        res.sendStatus(403);
                    } else {
                        res.json(comments);
                    }
                });
    }

    addComment(req, res) {
        model.create(req.body,
            (err, comment) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json({
                        comment: comment
                    });
                }
            });
    }

    delComment(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }

}
