import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from "jet-logger";

const router = Router();
const { OK } = StatusCodes;

router.get('/me', (req: Request, res: Response) => {
   res.status(OK).send({ sessionId: req.session.id });
});

export default router;
