import express, { Router } from 'express';
import emergencyRoute from './routes/emergency.route';
const router: Router = express.Router();

router.get('/', async (req, res, next) => {
  router.use('/emergency', emergencyRoute);
  // router.use('/location', locationRoute);
  // router.use('/medicalHistory', medicalHistoryRoute);
  // router.use('/user', userRoute);

  res.status(400).send('Incorrect route');
});

export default router;
