import { Schema, model , Document} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IGame extends Document {
    sessionId : string;
    currentPlayerSessionId: string;
    joinedSessionId?: string;
    hasEnded?: boolean;
    winningPlayerSessionId?: string;
    isDraw?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const gameSchema: Schema = new Schema<IGame>({
    sessionId: {
        type: String,
        required: true,
    },
    joinedSessionId: {
        type: String,
    },
    hasEnded:  {
        type: Boolean,
    },
    winningPlayerSessionId: {
        type: String,
    },
    isDraw: {
        type: Boolean,
    },
    currentPlayerSessionId: {
        type: String,
        required: true
    }
});

// 3. Create a Model.
const Game = model<IGame>('User', gameSchema);
export default Game;

