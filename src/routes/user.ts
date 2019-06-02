import express from 'express';
import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import HTTPStatusCode from '../enums/HttpStatusCode';
import config from '../../config/config.json';

// Import DB models
import User from '../models/user';
import RateLimit from '../models/rateLimit';

const router: express.Router = express.Router();

/**
 * Checks if username is still available
 */
router.get('/name-available/:name', (req, res, next) => {

    const name: string = req.params.name;

    // no name passed
    if (!name) {
        res
            .status(HTTPStatusCode.CERR_BAD_REQUEST)
            .json({
                error: 'CERR_BAD_REQUEST'
            });

        // name passed
    } else {

        User.find({ name })
            .then(document => {

                const isAvailable: boolean = document.length === 0;

                res
                    .status(HTTPStatusCode.SUCC_OK)
                    .json({
                        name,
                        isAvailable
                    });

            })
            .catch(error => {

                console.error(error);
                // Internal server error
                res.status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR).json({ error });

            });
    }
});




/**
 * Checks if email adress is still available
 */
router.get('/email-available/:email', (req, res, next) => {

    const email: string = req.params.email;

    // no name passed
    if (!email) {
        res
            .status(HTTPStatusCode.CERR_BAD_REQUEST)
            .json({
                error: 'CERR_BAD_REQUEST'
            });

        // name passed
    } else {

        User.find({ email })
            .then(document => {

                const isAvailable: boolean = document.length === 0;

                res
                    .status(HTTPStatusCode.SUCC_OK)
                    .json({
                        email,
                        isAvailable
                    });

            })
            .catch(error => {

                console.error(error);
                // Internal server error
                res.status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR).json({ error });

            });
    }

});

/**
 * Creates a new user in the database (rate limited to 5 per day max.)
 * //TODO: rate limit cleanup every once in a while or server startup
 */
router.post('/create', (req: any, res, next) => {

    const body = req.body;
    console.log(body);

    // Validate request
    if( !body.name || !body.email || !body.password || body.name.length < 4 || body.email.length < 7 || body.password.length < 6 ) {
        //TODO: validate email better
        return res.status(HTTPStatusCode.CERR_BAD_REQUEST).json({ success: false, response: 'ERR_BAD_REQUEST '});
    }

    // TODO: password to weak

    // find in limitation storage
    RateLimit.findOne({
        ipAddress: req.connection.ipAddress
    })
        .then(document => {

            // user already made an account recently
            if (document) {

                // if max users reached
                if (document.uses > config.rateLimiting.registrationLimit.count) {

                    // if entry is outdated
                    if (document.expiration < Date.now()) {

                        // remove entry
                        RateLimit.remove({ _id: document._id }, error => {
                            if (error) { console.error(error); }
                        });

                        // user reached the maximum already
                    } else {

                        return res.status(HTTPStatusCode.CERR_TOO_MANY_REQUESTS).json({
                            success: false,
                            response: 'ERR_TOO_MANY_REQUESTS'
                        });

                    }

                    // max users not reached yet
                } else {

                    // increase uses
                    document.uses++;
                    // refresh expiration datetime
                    document.expiration = Date.now() + config.rateLimiting.registrationLimit.expiration;
                    // save to db
                    document.save((error, document) => {
                        if (error) { console.error(error); }
                    });

                }

                // no accounts created yet so far
            } else {

                const document = new RateLimit({
                    _id: mongoose.Types.ObjectId(),
                    ipAddress: req.connection.ipAddress
                });

                // save new entry to the db
                document.save((error, document) => {
                    if (error) { console.error(error); }
                });

            }

        // if error, log it 
        }).catch((error) => { if(error){console.error(error);}});


        // If it reaches this point, the client is allowed to create another user
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: body.name,
            email: body.email,
            passwordHash: passwordHash.generate(body.password)
        });

        // save
        user.save()
        // on success
        .then(result => {
            res .status( HTTPStatusCode.SUCC_CREATED )
                .json({ success: true, name: body.name, email: body.email });

        // on fail
        }).catch(error => {
            console.error(error);
            res .status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR)
                .json({ success: false, response: 'ERR_INTERNAL_SERVER_ERROR'});
        });


});

export default router;