const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    user,
    user_token,
    event;

describe('API EVENT', function() {
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

    it('should create an amazing event', function(done) {
        request(app)
            .post('/events/newevent')
            .set('Authorization', user_token)
            .send({
                name: "Viva la Vida"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                event = res.body.event;
                assert.equal(event.name, "Viva la Vida");
                done();
            });
    });

    it('should get All Events', function(done) {
        request(app)
            .get('/events/')
            .expect(200, done);
    });

    it('should get Viva la Vida', function(done) {
        request(app)
            .get('/events/' + event._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });

    it('should update Vida in Espana', function(done) {
        request(app)
            .put('/events/' + event._id)
            .set('Authorization', user_token)
            .send({
                name: "Viva Espana",
            })
            .expect(200, done);
    });

    it('should delete this amazing event', function(done) {
        request(app)
            .delete('/events/' + event._id)
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
