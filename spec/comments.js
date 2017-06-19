const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    user,
    user_token,
    comment;

describe('API COMMENT', function() {
    it('should create Coco', function(done) {
        request(app)
            .post('/users')
            .send({
                email: "user@mail.com",
                password: "12345",
                name: "Coco l'asticot",
                isAdmin: true
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                user = res.body.user;
                user_token = res.body.token;
                assert.equal(user.email, "user@mail.com");
                assert.equal(user.isAdmin, true);
                done();
            });
    });
    it('should connect Coco', function(done) {
        request(app)
            .post('/login')
            .send({
                email: "user@mail.com",
                password: "12345",
            })
            .expect(200, done);
    });

    it('should create a lovely comment', function(done) {
        request(app)
            .post('/comments/addcomment')
            .set('Authorization', user_token)
            .send({
                body: "I Love you"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                comment = res.body.comment;
                assert.equal(comment.body, "I Love you");
                done();
            });
    });

    it('should get All comments', function(done) {
        request(app)
            .get('/comments/')
            .expect(200, done);
    });

    it('should get I Love You', function(done) {
        request(app)
            .get('/comments/forEvent/' + comment._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });

    it('should delete this comment', function(done) {
        request(app)
            .delete('/comments/delcomment/' + comment._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });

    it('should delete Coco', function(done) {
        request(app)
            .delete('/users/' + user._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });
});
