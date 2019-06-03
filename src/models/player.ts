import mongoose from 'mongoose';

function generateDefaultShots() {

    let defaultShots: [] = [];
    for(let i = 1; i <= 20; i++) {
        defaultShots["S"+i] = 0;
        defaultShots["D"+i] = 0;
        defaultShots["T"+i] = 0;
    }
    defaultShots["S0"] = 0;
    defaultShots["S25"] = 0;
    defaultShots["N25"] = 0;
    defaultShots["D25"] = 0;
    let objectDefaultShots = {};
    Object.assign(objectDefaultShots, defaultShots);
    return objectDefaultShots;
}

const SchemaPlayer = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, unique: true },
    avatar: { type: String, default: null },
    stats: {
        averageTotal: { type: Number, default: 0 },
        highestSingle: { type: Number, default: 0 },
        highestRound: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        tournamentWins: { type: Number, default: 0 },
        amounts: { type: Map, of: String, default: generateDefaultShots() }
    }
});


export default mongoose.model('Player', SchemaPlayer);
export const generateShotsDefault = () => {return generateDefaultShots()};