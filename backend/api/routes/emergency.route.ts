import express, { Router } from 'express';
const router: Router = express.Router();
import emergencyController from '../../controllers/emergency.controller';

// Returns all emergencies
router.get('/', async (req, res, next) => {
  try {
    const emergencies = await emergencyController.getAllEmergencies();
    res.status(200).send(emergencies);
  } catch (err) {
    next(err);
  }
});

// Returning this model to get the _id that is created by mongoose
router.post('/createEmergency', async (req, res, next) => {
  try {
    const newEmergency = await emergencyController.createEmergency(req.body);
    res.status(201).send(newEmergency);
    // res.status(201).send();
  } catch (err) {
    console.log('error creating new emergency ', err);
    next(err);
  }
});

router.get('/getEmergency/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const emergency = await emergencyController.getEmergency(id);
    res.status(200).send(emergency);
  } catch (err) {
    console.log('Server error: Could not get emergency');
    next(err);
  }
});

router.put('/updateEmergency', async (req, res, next) => {
  try {
    console.log('emergency updates', req.body);
    const response = await emergencyController.updateEmergency(req.body);
    console.log('🚀 ~ router.put ~ response', response);
    res.status(201).send();
  } catch (err) {
    console.log('Error updating emergency', err);
    next(err);
  }
});

router.put('/updateSymptoms', async (req, res, next) => {
  try {
    console.log('emergency updates', req.body);
    await emergencyController.updateSymptoms(req.body);
    res.status(201).send();
  } catch (err) {
    console.log('Error updating emergency', err);
    next(err);
  }
});

router.put('/endEmergency', async (req, res, next) => {
  try {
    await emergencyController.endEmergency(req.body.id);
    res.status(201).send();
  } catch (err) {
    console.log('Error when trying to end emergency', err);
    next(err);
  }
});

export default router;
