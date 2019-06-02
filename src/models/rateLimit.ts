import mongoose from "mongoose";
import config from '../../config/config.json';

const SchemaRateLimit = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    ipAddress: String,
    expiration: {
        type: Number,
        default: Date.now() + config.rateLimiting.registrationLimit.expiration
    },
    uses: { type: Number, default: 1 }

});

export default mongoose.model('RateLimit', SchemaRateLimit);