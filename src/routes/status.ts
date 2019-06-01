import express from 'express';

const router = express.Router();

// TODO: implement content of response (ping, uptime etc)
router.get('/', (req, res, next) => {
    res.json({
        status: {
            api: "OK"
        }
    });
});

export default router;