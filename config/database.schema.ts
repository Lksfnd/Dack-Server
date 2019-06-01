/*  Notation
*   @unique -> Unique
*   Array<ObjectId>[Collection] -> References the ObjectId from another collection's element
*   ?<value> -> The default value
*/
// for disabling errors
interface ObjectId { }; enum GameMode { x1 = 0, cricket = 1, aroundTheClock = 2 }; enum TournamentMode { KO = 0, League = 1 };

/** A user that logs in */
interface User {
    _id: ObjectId,
    name: string //@unique,
    passwordHash: string,
    players: Array<ObjectId>//[Player],
    tournaments: Array<ObjectId>//[Tournament],
    games: Array<ObjectId>,//[Game]
    email: string,
    registerTimestamp: number
}

/** A player on user's profile */
interface Player {
    _id: ObjectId,
    name: string,
    gameHistory: Array<ObjectId>,//[Game]
    tournamentHistory: Array<ObjectId>,//[Tournament]
    avatar: string,//default=null
    stats: {
        averageTotal: 0,
        highestSingle: 60,
        highestRound: 180,
        wins: 0,
        losses: 0,
        tournamentWins: 0,
        amounts: [] // ex "T20" => 0
    }
}

/** A K.O. tournament */
interface KoTournament {
    gamesPerPlayer: 2,
    title: string,
    description: string,
    timestamp: Number,
    gameType: {
        mode: GameMode,
        sets: 1,
        legs: 1,
        modeSpecifics: Object | null  // e.g. { start: 301, checkIn: 'none', checkOut:'DOUBLE' }
    },
    participants: Array<ObjectId>,//[Player]
    games: Array<ObjectId>,//[Game]
    winner: ObjectId | null
}

/** The ended game */
interface Game {
    _id: ObjectId,
    timestamp: number,//default=CURRENT_TIMESTAMP
    gameType: {
        mode: GameMode,
        sets: 1,
        legs: 1,
        modeSpecifics: Object | null  // e.g. { start: 301, checkIn: 'none', checkOut:'DOUBLE' }, 
        // cricket:{ hits: 3 }
    },
    participants: [
        {
            _id: ObjectId,//[Player],
            order: 0,
            winner: true,
            sets: [
                {
                    index: 0,
                    legs: [
                        [
                            ["0", "1", "2"],
                            ["0", "1", "2"],
                            ["0", "1", "2"]
                        ]
                    ]
                }
            ],
            stats: {
                averageTotal: 0,
                averages: [ 0, 0, 0], // 1st,2nd and 3rd shot,
                highest: 10,
                lowest: 0,
                amounts: {
                    "T20": 10
                }
            }
        },
        {
            _id: ObjectId,//[Player],
            order: 1,
            winner: false,
            sets: [
                {
                    index: 0,
                    legs: [
                        [
                            ["0", "1", "2"],
                            ["0", "1", "2"],
                            ["0", "1", "2"]
                        ]
                    ]
                }
            ],
            stats: {
                averageTotal: 0,
                averages: [ 0, 0, 0], // 1st,2nd and 3rd shot,
                highest: 10,
                lowest: 0,
                amounts: {
                    "T20": 10
                }
            }
        }
        // ...
    ]
}


/** The current game, almost the same as game but with current-game stats  */
interface RunningGame {
    _id: ObjectId,
    instanceTimestamp: number,// the timestamp when this object was last changed
    currentTurn: number, // index on which participant's turn it is
    timestamp: number,//default=CURRENT_TIMESTAMP
    gameType: {
        mode: GameMode,
        sets: 1,
        legs: 1,
        modeSpecifics: Object | null  // e.g. { start: 301, checkIn: 'none', checkOut:'DOUBLE' }, 
        // cricket:{ hits: 3 }
    },
    participants: [
        {
            _id: ObjectId,//[Player],
            order: 0,
            winner: true,
            sets: [
                {
                    index: 0,
                    legs: [
                        [
                            ["0", "1", "2"],
                            ["0", "1", "2"],
                            ["0", "1", "2"]
                        ]
                    ]
                }
            ]
        },
        {
            _id: ObjectId,//[Player],
            order: 1,
            winner: false,
            sets: [
                {
                    index: 0,
                    legs: [
                        [
                            ["0", "1", "2"],
                            ["0", "1", "2"],
                            ["0", "1", "2"]
                        ]
                    ]
                }
            ]
        }
        // ...
    ]
}
