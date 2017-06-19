const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    user,
    user_token;

describe('API USER', function() {
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
    it('should get All Users', function(done) {
        request(app)
            .get('/users/')
            .expect(200, done);
    });

    it('should get Coco l\'asticot', function(done) {
        request(app)
            .get('/users/' + user._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });

    it('should update Coco in Arthur', function(done) {
        request(app)
            .put('/users/' + user._id)
            .set('Authorization', user_token)
            .send({
                name: "Arthur Roi de Bretagne",
            })
            .expect(200, done);
    });

    it('should delete itself', function(done) {
        request(app)
            .delete('/users/' + user._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });
});
