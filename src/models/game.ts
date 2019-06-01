import mongoose from 'mongoose';

const SchemaGame = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Number, default: Date.now() },
    gameType: {
        mode: Number,
        sets: { type: Number, default: 1 },
        legs: { type: Number, default: 1 },
        modeSpecifics: [] // ex. "start"=>301,etc..
    },
    participants: []
});

export default mongoose.model('Game', SchemaGame);