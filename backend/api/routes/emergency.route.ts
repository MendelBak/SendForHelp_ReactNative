import express, { Router } from 'express';
const router: Router = express.Router();
import emergencyController from '../../controllers/emergency.controller';

// Returns allEmergencies
router.get('/', async (req, res, next) => {
  try {
    const emergencies = await emergencyController.getAllEmergencies();
    console.log(
      '🚀 ~ router.getAllEmergencies / root route ~ emergencies ',
      emergencies
    );

    res.status(200).send(emergencies);
  } catch (err) {
    next(err);
  }
});

// TODO: Probably should return this model to get the DB _id that is created.
router.post('/createEmergency', async (req, res, next) => {
  try {
    const newEmergency = await emergencyController.createEmergency();
    res.status(200).send(newEmergency);
    // res.status(201).send();
  } catch (err) {
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
    await emergencyController.updateEmergency(req.body);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.put('/endEmergency', async (req, res, next) => {
  try {
    await emergencyController.endEmergency(req.body.id);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

export default router;
