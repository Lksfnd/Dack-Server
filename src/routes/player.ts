import express from 'express';
import mongoose from 'mongoose';
import HTTPStatusCode from '../enums/HttpStatusCode';
import logger from '../helpers/ServerLogger';
const log = logger('DATABASE');

// Import schema
import Player, { generateShotsDefault } from '../models/player';
import player from '../models/player';

const router: express.Router = express.Router();

/**
 * Creates a new user
 */
router.get('/add', (req: any, res, next) => {

    const name: string = req.body.name;
    const avatar: string = req.body.avatar || null;
    const owner: string = req.session._id;

    // check if name is not null (avatar can be)
    if (!name) {
        return res.status(HTTPStatusCode.CERR_BAD_REQUEST).json({ response: 'ERR_BAD_REQUEST' });
    }

    // Create the new Player off the schema
    const player = new Player({
        _id: mongoose.Types.ObjectId(),
        name,
        avatar,
        owner,
        stats: {
            amounts: generateShotsDefault()
        }
    });

    // save
    player.save()
        .then(result => {
            res.status(HTTPStatusCode.SUCC_CREATED)
                .json({
                    player
                });
            log.log(
                'info',
                "Creating new player. user_id=" + req.session._id
                + ";name=" + name
            );
        })
        .catch(error => {
            log.log('error', 'Error creating player', error);
            return res.status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR)
                .json({
                    response: 'ERR_INTERNAL_SERVER_ERROR'
                });

        });

});

/**
 * Deletes a player
 */
router.delete('/delete/:playerid', (req: any, res, next) => {

    if (!req.params.playerid) {
        res .status(HTTPStatusCode.CERR_BAD_REQUEST)
            .json({ response: 'ERR_BAD_REQUEST '});
    }

    let doDelete: boolean = true;

    player.findOne({_id: req.params.userid }).then( doc => {

        if( doc.length === 0) {
            res .status(HTTPStatusCode.SUCC_OK).json({ success: false, response: 'ERR_UNKNOWN_PLAYER '});
            doDelete = false;
            console.log("debug1");
        }

        if( !(doc.owner === req.session._id) ) {
            res .status(HTTPStatusCode.CERR_FORBIDDEN)
                .json({ response: 'ERR_FORBIDDEN' });
                doDelete = false;
                console.log("debug2");
        }

    }).catch( err => {
        res .status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR)
                    .json({ response: 'ERR_INTERNAL_SERVER_ERROR'});    
                    doDelete = false;
        console.log("debug3");
    });

    if( doDelete )  {
        console.log("debug4");
        player.deleteOne({ _id: req.params.userid }, err => {
            res .status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR)
                        .json({ response: 'ERR_INTERNAL_SERVER_ERROR'});
        });
        res .status(HTTPStatusCode.SUCC_OK)
        .json({ success: true });
    }

    

})

/**
 * Lists all players of the current user with all data
 */
router.get('/list', (req: any, res, next) => {

    Player.find({
        owner: req.session._id
    })
        .then(document => {
            res.status(HTTPStatusCode.SUCC_OK)
                .json({ players: document });
        })
        .catch(error => {
            res.status(HTTPStatusCode.SERR_INTERNAL_SERVER_ERROR)
                .json({ response: 'ERR_INTERNAL_SERVER_ERROR' })
        });


});

export default router;