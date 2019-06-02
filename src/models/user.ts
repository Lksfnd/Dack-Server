import mongoose from 'mongoose';

const SchemaUser = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    passwordHash: String,
    registerTimestamp: { type: Number, default: Date.now() },
    players: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    tournaments: {type: [], default: [] },
    games: { type: [mongoose.Schema.Types.ObjectId], default: [] }
});

export default mongoose.model('User', SchemaUser);