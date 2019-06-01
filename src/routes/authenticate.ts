import express from 'express';
import User from '../models/user';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

const router = express.Router();

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

        if( error ) throw error;

        // User doesn't exist
        if(!user) {
            // return error JSON
            res.json({
                success: false,
                message: 'ERR_UNKNOWN_USER'
            });

        // user does exist
        } else if(user) {
            
            // Check

        }

    });

});

export default router;