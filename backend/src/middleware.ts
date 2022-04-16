import {CustomError} from "@shared/errors";
import {NextFunction, Request, Response} from "express";
import logger from "jet-logger";

export const sessionCheck =
    (req: Request, res: Response, next: NextFunction) => {
    logger.info('middleware')
    const sessionId = req.header('Authorization')?.replace('Session ', '');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req["persistentSessionId"] = sessionId;
    console.log({ sessionId });
    next();
};
