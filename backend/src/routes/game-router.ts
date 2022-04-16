import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import logger from "jet-logger";
import gameController from "@controllers/game";
import {sessionCheck} from "../middleware";



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;

// router.post('/', (req: Request, res: Response) => {
//
// });

router.post
('/', sessionCheck, async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(await gameController.create(req["persistentSessionId"])).status(CREATED);
});

router.patch('/:id/join',sessionCheck, async (req: Request, res: Response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        logger.info(req.params.id + ' dd ' + req["persistentSessionId"])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return res.json(await gameController.join(req.params.id, req["persistentSessionId"])).status(CREATED);
    } catch (e) {
        res.status(BAD_REQUEST).send(e.message);
    }
});

export default router;
