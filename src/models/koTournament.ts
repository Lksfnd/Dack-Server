import mongoose from 'mongoose';

const SchemaKoTournament = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: { type: String, default: "" },
    timestamp: { type:Number, default: Date.now() },
    winner: { type: mongoose.Schema.Types.ObjectId, default: null },
    gameType: {
        mode: Number,
        sets: { type: Number, default: 1 },
        legs: { type: Number, default: 1 },
        modeSpecifics: [] // ex. "start"=>301,etc..
    },
    participants: [mongoose.Schema.Types.ObjectId],
    games: [mongoose.Schema.Types.ObjectId]
});

export default mongoose.model('KoTournament', SchemaKoTournament);