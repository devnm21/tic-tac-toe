import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import { connect } from 'mongoose';

// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    connect(process.env.DB || 'mongodb://localhost:27017/t3')
        // eslint-disable-next-line no-console
        .then(() =>  logger.info('db connected'))
    logger.info(serverStartMsg + port);
});
