import { Router } from 'express';
import gameRouter from "@routes/game-router";
import sessionRouter from "@routes/session";


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/games', gameRouter);
baseRouter.use('/sessions', sessionRouter);

// Export default.
export default baseRouter;
