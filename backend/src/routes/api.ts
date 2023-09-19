import express from 'express';
import { validateSessionMiddleware } from '../middlewares';
import { TrackingController, UsersController } from '../controllers';

const router = express.Router();

router.post('/users', UsersController.createUser);

// MARK: Tracking
router.post('/tracking/users', validateSessionMiddleware, TrackingController.trackUsers);
router.post('/tracking/engagements', validateSessionMiddleware, TrackingController.trackEngagements);
router.get('/tracking/report', validateSessionMiddleware, TrackingController.getReport);

export default router;
