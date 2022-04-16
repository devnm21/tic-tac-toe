import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import logger from "jet-logger";
import { randomBytes } from "crypto";

const router = Router();
const { OK } = StatusCodes;

router.get('/me', (req: Request, res: Response) => {
   res.status(OK).send({ sessionId: randomBytes(20).toString('hex' )});
});

export default router;
