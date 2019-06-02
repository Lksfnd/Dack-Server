import express from 'express';
import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import HTTPStatusCode from '../enums/HttpStatusCode';

// Import DB models
import User from '../models/user';

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
 * Checks if username is still available
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



export default router;