import express, { Router } from 'express';
const router: Router = express.Router();
import emergencyController from '../../controllers/emergency.controller';

// Returns allEmergencies
router.get('/', async (req, res, next) => {
  try {
    const emergencies = await emergencyController.getAllEmergencies();
    console.log('🚀 ~ router.get ~ emergencies ', emergencies);

    res.status(200).send(emergencies);
  } catch (err) { 
    next(err);
  }
});

router.get('/getEmergency', async (req, res, next) => {
  try {
    const { id } = req.body;
    const emergencies = await emergencyController.getEmergency(
      '6013c19812a9031de374c1e0'
    );
    console.log('🚀 ~ router.get ~ emergencies ', emergencies);

    res.status(200).send(emergencies);
  } catch (err) {
    next(err);
  }
});

router.get('/createEmergency', async (req, res, next) => {
  try {
    const newEmergency = await emergencyController.createEmergency();
    console.log('new emergency returned from DB', newEmergency);
    res.status(200).send(newEmergency);
  } catch (err) {
    next(err);
  }
});

// module.exports = router;
export default router;
