import request from 'supertest';
import app from '../../main';

describe("GET /user/name-available/:name", ()=>{

    it('respond with available', done => {

        request(app)
            .get('/user/name-available/test6546546541')
            .expect(200)
            .expect({
                name: "test6546546541",
                isAvailable: true
            });

        done();
    });


    it('respond with not-available', done => {

        request(app)
            .get('/user/name-available/test')
            .expect(200)
            .expect({
                name: "test",
                isAvailable: false
            });

        done();
    });

    it('respond with bad request', done => {

        request(app)
            .get('/user/name-available/')
            .expect(400)
            .expect({
                error: 'CERR_BAD_REQUEST'
            });

        done();
    });

});