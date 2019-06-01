import mongoose from 'mongoose';

const SchemaPlayer = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: { type: String, default: null },
    stats: {
        averageTotal: { type: Number, default: 0 },
        highestSingle: { type: Number, default: 0 },
        highestRound: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        tournamentWins: { type: Number, default: 0 },
        amounts: { type: 0, default: 0 }
    },
    tournamentHistory: { type: [], default: [] },
    gameHistory: { type: [mongoose.Schema.Types.ObjectId], default: [] }
});


export default mongoose.model('Player', SchemaPlayer);