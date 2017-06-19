const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    user,
    user_token,
    group;

describe('API GROUP', function() {
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

    it('should create a Pegu Group', function(done) {
        request(app)
            .post('/groups')
            .set('Authorization', user_token)
            .send({
                name: "Les schtroumpfs"
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                group = res.body.group;
                assert.equal(group.name, "Les schtroumpfs");
                done();
            });
    });

    it('should get All Groups', function(done) {
        request(app)
            .get('/groups/')
            .expect(200, done);
    });

    it('should get Les schtroumpfs', function(done) {
        request(app)
            .get('/groups/' + group._id)
            .set('Authorization', user_token)
            .expect(200, done);
    });

    it('should update schtroumpfs in Bisounours', function(done) {
        request(app)
            .put('/groups/' + group._id)
            .set('Authorization', user_token)
            .send({
                name: "Les Bisounours",
            })
            .expect(200, done);
    });

    it('should delete these f*cking Bisounours', function(done) {
        request(app)
            .delete('/groups/' + group._id)
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
