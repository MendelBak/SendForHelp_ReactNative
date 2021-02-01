import express, { Router } from 'express';
const router: Router = express.Router();
import emergencyLocationController from '../../controllers/emergencyLocation.controller';

router.get('/', async (req, res, next) => {
  try {
    const emergencyLocations = await emergencyLocationController.getAllEmergencyLocations();
    res.status(201).send(emergencyLocations);
  } catch (err) {
    next(err);
  }
});

// Returning the new model to get the _id that is created by mongoose
router.post('/createEmergencyLocation', async (req, res, next) => {
  try {
    const newEmergencyLocation = await emergencyLocationController.createEmergencyLocation();
    res.status(201).send(newEmergencyLocation);
  } catch (err) {
    next(err);
  }
});

router.get('/getEmergencyLocation/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const emergencyLocation = await emergencyLocationController.getEmergencyLocation(
      id
    );
    res.status(200).send(emergencyLocation);
  } catch (err) {
    console.log('Server error: Could not get emergency location');
    next(err);
  }
});

router.put('/updateEmergencyLocation', async (req, res, next) => {
  try {
    await emergencyLocationController.updateEmergencyLocation(req.body);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

export default router;
