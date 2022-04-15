import GameModel, {IGame} from '@models/game';
import { Model } from "mongoose";
import logger from "jet-logger";
class Game {
    private GameModel: Model<IGame>;
    constructor() {
        this.GameModel = GameModel;
    }
    async create(sessionId: string): Promise<IGame> {
        return this.GameModel.create({
            sessionId,
        })
    }

    async join (id: string, joiningSessionId: string) {
        const game: IGame | null = await this.GameModel.findById(id);
        if (!game)
            throw new Error('No game found for the given session');

        // Original Session/invitee trying to join the game
        if (game.sessionId === joiningSessionId || game.joinedSessionId === joiningSessionId)
            return game;

        // No one has joined a session, so add the current requesting session as joiningSession
        else if (!game.joinedSessionId)
            return this.GameModel.findByIdAndUpdate(id, {
                joinedSessionId: joiningSessionId,
            }, {
                new: true,
            });
        else
            throw new Error('Someone already joined the game');
    }
}

export default new Game();
