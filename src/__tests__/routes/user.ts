import request from 'supertest';
import app from '../../main';


describe("GET /user/name-available/:name", ()=>{

    it('respond with available', done => {

        request(app)
            .get('/user/name-available/test6546546541')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                name: "test6546546541",
                isAvailable: true
            }, done);
    });


    it('respond with not-available', done => {

        request(app)
            .get('/user/name-available/test')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                name: "test",
                isAvailable: false
            }, done);

    });

    it('respond with bad request', done => {

        request(app)
            .get('/user/name-available/')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect({
                error: 'CERR_BAD_REQUEST'
            }, done);
    });

});


describe("GET /user/email-available/:email", ()=>{

    it('respond with email available', done => {

        request(app)
            .get('/user/email-available/test_available@example.com')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                email: "test_available@example.com",
                isAvailable: true
            }, done);
    });


    it('respond with email not-available', done => {

        request(app)
            .get('/user/email-available/test@example.com')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                email: "test@example.com",
                isAvailable: false
            } , done);
    });

    it('respond with bad request', done => {

        request(app)
            .get('/user/email-available/')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect({
                error: 'CERR_BAD_REQUEST'
            }, done);

    });

});