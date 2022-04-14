import { Router } from 'express';
import gameRouter from "@routes/game-router";


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/games', gameRouter);

// Export default.
export default baseRouter;
