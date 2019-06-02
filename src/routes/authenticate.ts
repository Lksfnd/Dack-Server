import express from 'express';
import User from '../models/user';
import passwordHash from 'password-hash';
import jsonWebToken from 'jsonwebtoken';
import config from '../../config/config.json';
import HTTPStatusCode from '../enums/HttpStatusCode';

const router: express.Router = express.Router();

router.post('/', (req, res, next) => {

    // Read from JSON-Body
    const name: string = req.body.username;
    const password: string = req.body.password;

    // find user
    User.findOne({
        name
    },
        // When found/errorr
        (error, user) => {

            if (error) throw error;

            // User doesn't exist
            if (!user) {
                // return error JSON
                res.status(HTTPStatusCode.SUCC_OK).json({
                    success: false,
                    error: 'ERR_UNKNOWN_USER'
                });

                // user does exist
            } else if (user) {

                // Check if password matches the hashed one
                if (!passwordHash.verify(password, user.passwordHash)) {
                    // does not match
                    res.status(HTTPStatusCode.SUCC_OK).json({
                        success: false,
                        error: 'ERR_PASSWORD_INVALID'
                    });

                    // password is correct    
                } else {

                    // set data stored in session
                    const payload: object = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    };

                    const token: string = jsonWebToken.sign(payload, config.security.authSecret, {
                        expiresIn: '90 days' // 3 month token
                    });

                    // return the token
                    res
                        .status(HTTPStatusCode.SUCC_OK)
                        .json({
                            success: true,
                            token: token
                        });

                }

            }

        });

});

export default router;