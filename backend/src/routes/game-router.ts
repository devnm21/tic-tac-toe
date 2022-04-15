import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import logger from "jet-logger";
import gameController from "@controllers/game";



// Constants
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;

// router.post('/', (req: Request, res: Response) => {
//
// });

router.post
('/', async (req: Request, res: Response) => {
    logger.info({
        sessionId: req.session.id,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return res.json(await gameController.create(req.session.id)).status(CREATED);
});

router.patch('/:id/join', async (req: Request, res: Response) => {
    try {
        logger.info(req.params.id + '  dd ' +  req.session.id)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return res.json(await gameController.join(req.params.id, req.session.id)).status(CREATED);
    } catch (e) {
        res.status(BAD_REQUEST).send(e.message);
    }
});

export default router;
